data='';

document.addEventListener('DOMContentLoaded',()=>{
    const req= new XMLHttpRequest();
    req.open('GET','data.json',false);
    req.onreadystatechange=()=>{
        data=JSON.parse(req.responseText);

        
        document.querySelectorAll('.pages').forEach((pages)=>{    
            if (pages.id != 'profile_pages'){
                place_pages(pages);
                place_dots(pages);
                activate_dots(pages);
            };
        });
    };
    req.send();
})
function place_dots(pages){
        for (pr in data[pages.dataset.relatedData]){
            let dots = pages.querySelector('.dots');
            let dot = document.createElement('div');
            dot.classList.add('dot');
            dot.dataset.index = f(data[pages.dataset.relatedData].length-pr,data[pages.dataset.relatedData].length);
            dots.appendChild(dot);
        }
        pages.querySelector('.dot').classList.add('active_dot');
};

function place_pages(pages){

    let r3= pages.querySelector('.right3');
    let bg = r3.querySelector('.placeholder_background');
    r3.dataset.index = f(3, data[pages.dataset.relatedData].length);
    r3.dataset.p_index = 1;
    bg.style.backgroundImage =`url(${data[pages.dataset.relatedData][f(3, data[pages.dataset.relatedData].length)][1]['low_res']})`;

    let r2= pages.querySelector('.right2');
    bg = r2.querySelector('.placeholder_background');
    r2.dataset.index = f(2, data[pages.dataset.relatedData].length);
    r2.dataset.p_index = 1;
    bg.style.backgroundImage =`url(${data[pages.dataset.relatedData][f(2, data[pages.dataset.relatedData].length)][1]['low_res']})`;

    let r1= pages.querySelector('.right1');
    bg = r1.querySelector('.placeholder_background');
    r1.dataset.index = f(1, data[pages.dataset.relatedData].length);
    r1.dataset.p_index = 1;
    bg.style.backgroundImage =`url(${data[pages.dataset.relatedData][f(1, data[pages.dataset.relatedData].length)][1]['low_res']})`;

    let a = pages.querySelector('.active');
    bg = a.querySelector('.placeholder_background');
    a.dataset.index = 0;
    a.dataset.p_index = 1;
    bg.style.backgroundImage =`url(${data[pages.dataset.relatedData][0][1]['low_res']})`;

    let l1 = pages.querySelector('.left1');
    bg = l1.querySelector('.placeholder_background');
    l1.dataset.index = f(-1, data[pages.dataset.relatedData].length);
    l1.dataset.p_index = 1;
    bg.style.backgroundImage =`url(${data[pages.dataset.relatedData][f(-1, data[pages.dataset.relatedData].length)][1]['low_res']})`;

    let l2 = pages.querySelector('.left2');
    bg = l2.querySelector('.placeholder_background');
    l2.dataset.index = f(-2, data[pages.dataset.relatedData].length);
    l2.dataset.p_index = 1;
    bg.style.backgroundImage =`url(${data[pages.dataset.relatedData][f(-2, data[pages.dataset.relatedData].length)][1]['low_res']})`;

    let l3 = pages.querySelector('.left3');
    bg = l3.querySelector('.placeholder_background');
    l3.dataset.index = f(-3, data[pages.dataset.relatedData].length);
    l3.dataset.p_index = 1;
    bg.style.backgroundImage =`url(${data[pages.dataset.relatedData][f(-3, data[pages.dataset.relatedData].length)][1]['low_res']})`;

    var bgImg = new Image();
    bgImg.onload = function(){
        bg = a.querySelector('.placeholder_background');
        bg.classList.add('loaded');
        bg.style.backgroundImage = 'url(' + bgImg.src + ')';
    };
    bgImg.src = data[pages.dataset.relatedData][0][1]['high_res'];

}
function f (x, l) {return x-Math.floor(x/l)*l}
function fill_page(page, lang){
    let source = data[page.closest('.pages').dataset.relatedData][page.dataset.index][page.dataset.p_index]
    if (source.type == 'image'){
        page.classList.add('image_page')

        let bg = page.querySelector('.placeholder_background');
        bg.style.backgroundImage =`url(${source.low_res})`;
        bg.parentElement.classList.add('no-comment');

        let desc = document.createElement('div');
        desc.classList.add('desc');
        desc.innerHTML = source.desc;

        let chevron_l = document.createElement('div');
        chevron_l.id = 'ch_l';
        chevron_l.classList.add('chevron');
        chevron_l.onclick = ()=>{bg.parentElement.classList.toggle('no-comment')};
        desc.appendChild(chevron_l);

        let chevron_r = document.createElement('div');
        chevron_r.id = 'ch_r';
        chevron_r.classList.add('chevron');
        chevron_r.onclick = ()=>{bg.parentElement.classList.toggle('no-comment')};
        bg.parentElement.appendChild(chevron_r);

        page.querySelector('.page').insertBefore(desc,bg.parentElement);

    }else if (source.type == 'title'){
        let bg = page.querySelector('.placeholder_background');
        bg.style.backgroundImage =`url(${source.low_res})`;
    }else if (source.type == 'html'){
        page.classList.add('html_page')
        let bg = page.querySelector('.bg_border');
        page.querySelector('.page').innerHTML = source.inner
        bg.remove();
    }else if (source.type == 'video'){

        page.classList.add('image_page', 'video_page')

        let vid=document.createElement('iframe');
        vid.setAttribute('src',source.src+"?h=8739182c4b&autoplay=1&loop=1");//as if it means autoplay, remove vimeo and more
        vid.setAttribute('allow','autoplay; fullscreen');
        vid.setAttribute('allowfullscreen','');
        vid.classList.add('video_viewer');

        let bg = page.querySelector('.bg_border');
        bg.querySelector('.placeholder_background').remove();
        bg.querySelector('.loading').remove();
        bg.appendChild(vid);
        bg.classList.add('no-comment');

        let desc = document.createElement('div');
        desc.classList.add('desc');
        desc.innerHTML = source.desc;

        let chevron_l = document.createElement('div');
        chevron_l.id = 'ch_l';
        chevron_l.classList.add('chevron');
        chevron_l.onclick = ()=>{bg.classList.toggle('no-comment')};
        desc.appendChild(chevron_l);

        let chevron_r = document.createElement('div');
        chevron_r.id = 'ch_r';
        chevron_r.classList.add('chevron');
        chevron_r.onclick = ()=>{bg.classList.toggle('no-comment')};
        bg.appendChild(chevron_r);

        page.querySelector('.page').insertBefore(desc,bg);

    }else{
        console.log('type unknown')
    }
    // console.log(source);
}
function full_res_page(page){
    let source = data[active_pages.dataset.relatedData][page.dataset.index][page.dataset.p_index]
    if (source.type == 'image' | source.type =='title'){
        var bgImg = new Image();
        bgImg.onload = function(){
            let bg = page.querySelector('.placeholder_background');
            bg.classList.add('loaded');
            bg.style.backgroundImage = 'url(' + bgImg.src + ')';
        };
        try {
            bgImg.src = data[active_pages.dataset.relatedData][page.dataset.index][page.dataset.p_index]['high_res'];    
        } catch {
            console.log('hello, error!')
        }
    }
}