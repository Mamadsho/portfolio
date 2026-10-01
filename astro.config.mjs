// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import mdx from "@astrojs/mdx";

/**
 * Оборачивает каждую таблицу в <div class="table-scroll">.
 *
 * У <pre> прокрутка по горизонтали есть из коробки (@tailwindcss/typography),
 * а у <table> её нет: широкая таблица растягивает не себя, а всю страницу.
 * Обёртка даёт ей собственную полосу прокрутки, поэтому ширина полосы набора
 * перестаёт зависеть от содержимого ячеек.
 *
 * @returns {(tree: any) => void}
 */
function rehypeWrapTables() {
  return (tree) => {
    const walk = (node) => {
      if (!Array.isArray(node.children)) return;

      node.children.forEach((child, index) => {
        if (child.type === "element" && child.tagName === "table") {
          node.children[index] = {
            type: "element",
            tagName: "div",
            properties: { className: ["table-scroll"] },
            children: [child],
          };
          return; // вложенных таблиц в заметках нет, внутрь не идём
        }
        walk(child);
      });
    };

    walk(tree);
  };
}

/**
 * Расставляет <wbr> внутри строчного кода на границах идентификаторов.
 *
 * Без этого длинное имя вроде `SceneViewController` либо задаёт минимальную
 * ширину колонки, либо (с word-break) рвётся посреди слога: «SceneViewCon /
 * troller». <wbr> — это кандидат на перенос, а не перенос: браузер встаёт на
 * него только если строка иначе не влезает, и в буфер обмена символ не
 * попадает, поэтому имя копируется целиком.
 *
 * Трогается только строчный код: внутри <pre> листинги должны оставаться
 * побайтово теми же.
 *
 * @returns {(tree: any) => void}
 */
function rehypeBreakIdentifiers() {
  const MIN_LENGTH = 12; // короткие имена и так помещаются
  const BREAK_AFTER = /[_./<>,]/;

  /** Режет строку на куски, между которыми допустим перенос. */
  const split = (text) => {
    const parts = [];
    let current = "";

    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      const prev = text[i - 1];
      const next = text[i + 1];

      // camelCase: ...tS... → ...t | S...
      const camel = prev && /[a-z0-9]/.test(prev) && /[A-Z]/.test(ch);
      // конец аббревиатуры: HTMLParser → HTML | Parser.
      // Нужны минимум две заглавные перед, иначе CMakeLists рвётся как C|Make.
      const acronym =
        prev &&
        /[A-Z]/.test(prev) &&
        /[A-Z]/.test(text[i - 2] || "") &&
        /[A-Z]/.test(ch) &&
        next &&
        /[a-z]/.test(next);

      if (current && (camel || acronym)) {
        parts.push(current);
        current = "";
      }

      current += ch;

      // после разделителя: Selection | Manager:: | signal...
      if (BREAK_AFTER.test(ch) || (ch === ":" && prev === ":")) {
        parts.push(current);
        current = "";
      }
    }

    if (current) parts.push(current);
    return parts;
  };

  /** Текстовый узел → [текст, <wbr>, текст, ...]. */
  const withBreaks = (node) => {
    if (node.type !== "text" || node.value.length < MIN_LENGTH) return [node];

    const parts = split(node.value);
    if (parts.length < 2) return [node];

    return parts.flatMap((part, index) =>
      index === 0
        ? [{ type: "text", value: part }]
        : [
            { type: "element", tagName: "wbr", properties: {}, children: [] },
            { type: "text", value: part },
          ],
    );
  };

  return (tree) => {
    const walk = (node, insidePre) => {
      if (!Array.isArray(node.children)) return;

      if (node.type === "element" && node.tagName === "code" && !insidePre) {
        node.children = node.children.flatMap(withBreaks);
        return;
      }

      const pre = insidePre || (node.type === "element" && node.tagName === "pre");
      node.children.forEach((child) => walk(child, pre));
    };

    walk(tree, false);
  };
}

// https://astro.build/config
export default defineConfig({
  markdown: {
    rehypePlugins: [rehypeWrapTables, rehypeBreakIdentifiers],
    shikiConfig: {
      themes: {
        light: "vitesse-light",
        dark: "vitesse-dark",
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [mdx()],
});
