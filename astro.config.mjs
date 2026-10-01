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

// https://astro.build/config
export default defineConfig({
  markdown: {
    rehypePlugins: [rehypeWrapTables],
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
