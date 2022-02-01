function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener('DOMContentLoaded',()=>{
    //Global Variables
    active_pages = document.querySelector('#projects_pages');

    lets_go();
    setTimeout(()=>{

    },2000)// Time for loading and More
})

// activates all elements of the page
function lets_go(){
    activate_headers();
    activate_pages();
    activate_dots();
    activate_keys();
    activate_contacts_toggle();
    activate_lang_toggle();
}

// set up click eventListeners
function activate_headers(){
    document.querySelectorAll('.header_item').forEach((header)=>{
        header.addEventListener('click',open_pages_header)
    });
    document.querySelectorAll('#header .cross').forEach((cross)=>{
        cross.addEventListener('click',close_project)
    })
}

// open pages via header
function open_pages_header (e) {
    header = this;
    let pages = document.querySelector(header.dataset.relatedPages);
    open_pages(pages, header);
}

// open pages via pages viewport
function open_pages_pages (e){
    if (!e.target.classList.contains('active_pages')&&e.target.classList.contains('pages')){;
        let pages = this;
        let header = document.querySelector(pages.dataset.relatedHeader);
        open_pages(pages, header);
    }
}

// open pages main function
function open_pages(pages,header){
    document.querySelectorAll('.header_item').forEach((h)=>{
        h.classList.remove('active_header')
    })
    header.classList.add('active_header')
    document.querySelector('.vp').style.left=header.dataset.position;
      //header contains position as dataset

    document.querySelectorAll('.pages').forEach((h)=>{
        h.classList.remove('active_pages')
    })
    pages.classList.add('active_pages');
    active_pages = pages;
}

function activate_pages(){
    document.querySelectorAll('.pages').forEach((pages_cont)=>{
        pages_cont.addEventListener('click', open_pages_pages);
        pages_cont.addEventListener('wheel', wheel_listener);
        pages_cont.addEventListener('click', click_listener);
    });
    document.addEventListener('keydown',enter_project);// not necessarily here, but...
};
function enter_project(e){
    this.removeEventListener('keydown',enter_project);
    if (e.code == 'Enter' | e.code =="NumpadEnter"){
        open_project(active_pages.querySelector('.active.page_z'));
    };
    setTimeout(()=>{
        this.addEventListener('keydown',enter_project);
    },175);
}
function click_listener(e){
    this.removeEventListener('click',click_listener);
    if (e.target.classList.contains('active')){
        open_project(e.target);
    }else if (e.target.classList.contains('right1')){
        prev_page(this);
    }else if (e.target.classList.contains('left1')){
        next_page(this);
    }else if (e.target.classList.contains('right2')){
        prev_page(this);
        setTimeout(()=>{
            prev_page(this);
        },125);
    }else if (e.target.classList.contains('left2')){
        next_page(this);
        setTimeout(()=>{
            next_page(this);
        },125);
    }
    setTimeout(()=>{
        this.addEventListener('click',click_listener);
    },175);
}

function wheel_listener(e){
    if (!this.classList.contains('active_pages')) return false; // remove scroll of inactive pages
    this.removeEventListener('wheel',wheel_listener);
    if(e.deltaY>0){
        next_page(this);
        // next_dot(this);
    }else{
        prev_page(this);
        // prev_dot(this);
    }

    setTimeout(()=>{
        this.addEventListener('wheel',wheel_listener);
    },175);
}

function activate_dots(){
    document.querySelectorAll('.dot').forEach(function (dot){
        dot.addEventListener('click',move_page_by_dot)
    })
}

function activate_keys(){
    document.addEventListener('keydown',move_by_arrows)
}

function move_by_arrows(e){
    this.removeEventListener('keydown',move_by_arrows);
    if(e.code=='ArrowLeft'){
        prev_page(active_pages);
    }else if(e.code=='ArrowRight'){
        next_page(active_pages);
    };
    setTimeout(()=>{
        this.addEventListener('keydown',move_by_arrows);
    },175);
}

async function move_page_by_dot(e){
    const pages = this.closest('.pages');
    dots = pages.querySelector('.dots_container>.dots');
    for (el of dots.children){
        el.removeEventListener('click', move_page_by_dot)
    }
    const active_dot = dots.querySelector('.active_dot');
    const n = [...dots.children].indexOf(this);
    const a = [...dots.children].indexOf(active_dot);
    for (let step = 0; step < Math.abs(n-a); step++) {
        if(n-a>0){

            next_page(pages);
            await new Promise(r => setTimeout(r,150));
            // next_dot(pages); moved inside next_page
        }else{
            prev_page(pages);
            await new Promise(r => setTimeout(r, 150));
            // prev_dot(pages); moved inside prev_page
        }

    }
    for (el of dots.children){
        el.addEventListener('click', move_page_by_dot)
    }
}
async function move_p_page_by_dot(e){
    const pages = this.closest('.pages');
    const dots = this.closest('.dots .active_dot');
    dots.querySelectorAll('.active_dot .dot').forEach((dot)=>{
        dot.removeEventListener('click',move_p_page_by_dot);
    })
    const active_dot = dots.querySelector('.active_dot .active_dot');
    const n = [...dots.children].indexOf(this);
    const a = [...dots.children].indexOf(active_dot);
    for (let step = 0; step < Math.abs(n-a); step++) {
        if(n-a>0){

            next_p_page(pages);
            await new Promise(r => setTimeout(r,150));
            // next_dot(pages); moved inside next_page
        }else{
            prev_p_page(pages);
            await new Promise(r => setTimeout(r, 150));
            // prev_dot(pages); moved inside prev_page
        }

    }
    dots.querySelectorAll('.active_dot .dot').forEach((dot)=>{
        dot.addEventListener('click',move_p_page_by_dot);
    })
}

async function move_to_first_p_page(callback){
    const pages = active_pages;
    const dots = active_pages.querySelector('.dots .active_dot');

    // removing listeners that might interfere with the f move_to_first_p_page animation
    dots.querySelectorAll('.active_dot .dot').forEach((dot)=>{
        dot.removeEventListener('click',move_p_page_by_dot);
    })
    document.querySelectorAll('.pages').forEach((pages_cont)=>{
        pages_cont.removeEventListener('wheel', wheel_listener);
    })
    document.removeEventListener('keydown',move_by_arrows)

    const active_dot = dots.querySelector('.active_dot .active_dot');
    const n = 0;
    const a = [...dots.children].indexOf(active_dot);
    for (let step = 0; step < Math.abs(n-a); step++) {
        if(n-a>0){

            next_p_page(pages);
            await new Promise(r => setTimeout(r,150));
            // next_dot(pages); moved inside next_page
        }else{
            prev_p_page(pages);
            await new Promise(r => setTimeout(r, 150));
            // prev_dot(pages); moved inside prev_page
        }

    }

    // bringing back listeners that were remove earliar in function
    dots.querySelectorAll('.active_dot .dot').forEach((dot)=>{
        dot.addEventListener('click',move_p_page_by_dot);
    })
    setTimeout(()=>{
        document.querySelectorAll('.pages').forEach((pages_cont)=>{
            pages_cont.addEventListener('wheel', wheel_listener);
            pages_cont.addEventListener('click', click_listener);

        });
        document.addEventListener('keydown',move_by_arrows);
    },350)
    callback();
}

function activate_contacts_toggle(){
    document.querySelectorAll('#contactbox .option').forEach((x)=>{
        x.addEventListener('dblclick',toggle_contact);
    })
    if (active_contact_type && document.querySelector('#contactbox #'+active_contact_type)){
        document.querySelector('#contactbox #'+active_contact_type).closest('.option').classList.add('active_option');
    }
}

function activate_lang_toggle(){
    document.querySelectorAll('.langbox .option').forEach((x)=>{
        x.addEventListener('click',toggle_lang);
    })
    document.querySelectorAll('.langbox').forEach((lngbox)=>{
        lngbox.querySelector('#'+lang).closest('.option').classList.add('active_option');
    });
}

function open_project(project){



    //header assignment
    let header = document.querySelector('#header');
    if (header.classList.contains('open')){return null};
    header.classList.add('open');

    // animation: Project Name to Header
    let active_header = header.querySelector('.active_header');
    let project_name = data[active_pages.dataset.relatedData][parseInt(project.dataset.index)][0][lang];
    let h_proj_name = active_header.querySelector('.project_name');
    h_proj_name.innerHTML = project_name;
    h_proj_name.style.width = project_name.length*18;
    for (language in data[active_pages.dataset.relatedData][parseInt(project.dataset.index)][0]){
        h_proj_name.dataset[language] = data[active_pages.dataset.relatedData][parseInt(project.dataset.index)][0][language];
    }
    h_proj_name.classList.add('langy');

    active_header.querySelector('.project_name').style.transition = null;
    active_header.querySelectorAll('.bar').forEach((bar)=>{
        bar.style.transition = null;
    })

    document.addEventListener('keydown', esc); //close project

    document.addEventListener('keydown', space) // show description

    document.querySelectorAll('.pages').forEach((p)=>{
        p.addEventListener('click',mouse_out)
        p.removeEventListener('click',open_pages_pages)
    })

    //centering active_dot
    let active_dot = active_pages.querySelector('.active_dot');
    let i = [...active_dot.parentElement.children].indexOf(active_dot);
    let l = [...active_dot.parentElement.children].length;
    let w = 22; //HARDCODE
    let x = w*(l-1-2*i)/2;
    active_dot.style.left = x;

    //creating subdots
    let n_pr_pages = data[active_pages.dataset.relatedData][parseInt(project.dataset.index)].length-1;
    active_dot.style.width = n_pr_pages*8; //HARDCODE
    for (let index = 0; index < n_pr_pages; index++) {  //got lil bit lucky here

        //geopardy because of wrong order of pages
        ind = pages_geopardy(index+1, n_pr_pages);

        let pg_type = data[active_pages.dataset.relatedData][parseInt(project.dataset.index)][ind].type;
        // console.log(pg_type);
        let dot = document.createElement('div');
        dot.classList.add('dot');
        active_dot.appendChild(dot);
        if (pg_type == 'image'){
            dot.classList.add('image_dot')
        }else if (pg_type == 'video'){
            dot.classList.add('video_dot')
        }else if (pg_type == 'title'){
            dot.classList.add('title_dot')
        }else if (pg_type == 'html'){
            dot.classList.add('html_dot')
        }
    };

    let dots = active_pages.querySelector('.dots');
    setTimeout(()=>{
        active_pages.classList.add('open');
        dots.classList.add('open');
    },10);

    //make first subdot active
    setTimeout(()=>{
        if(active_dot.parentElement.classList.contains('open')){ //project could be closed before timeout of 600
            active_dot.children[0].classList.add('active_dot'); // so, no children will be left by then.
        }
    }, 600)

    create_p_pages(project);

    dots.querySelectorAll('.active_dot .dot').forEach((dot)=>{
        dot.addEventListener('click',move_p_page_by_dot)
    })

}

function pages_geopardy(i, n){
    if (i==1) return 1;
    return n-i+2;
}

function esc (e){
    if(e.code=='Escape') close_project();
}
function mouse_out(e){
    tmp = e.target;
    if(!e.target.closest('.page_z, .dots')) close_project();
}
function space(e){
    if(e.code=='Space'&&active_pages.querySelector('.active .desc')){
        active_pages.querySelector('.active .bg_border').classList.toggle('no-comment');
    }
}
function close_project(){
    let header = document.querySelector('#header');
    header.classList.remove('open');

    move_to_first_p_page(()=>{

        active_pages.classList.remove('open');

        let dots = active_pages.querySelector('.dots');
        dots.classList.remove('open');

        document.removeEventListener('keydown', esc);

        document.removeEventListener('keydown', space);

        setTimeout(()=>{
            document.querySelectorAll('.pages').forEach((p)=>{
                p.removeEventListener('click',mouse_out);
                p.addEventListener('click',open_pages_pages);
            })
        },350)


        let active_header = header.querySelector('.active_header');
        active_header.querySelector('.project_name').style = null;
        active_header.querySelector('.project_name').style.transition = 'width .5s';
        active_header.querySelectorAll('.bar').forEach((bar)=>{
            bar.style.transition = 'width 0.1s .7s, margin 0.2s .6s';
        })


        let active_dot =active_pages.querySelector('.active_dot');
        let removees = [...active_dot.children];
        for (dot of removees){
            dot.remove();
        }

        active_dot.style.left = 0;
        active_dot.style.width = null;

        remove_p_pages();
    })

}

function create_p_pages(project){
    let pr_length = data[active_pages.dataset.relatedData][parseInt(project.dataset.index)].length-1;

    let l2 = active_pages.insertBefore(new_page(), project);
    l2.dataset.p_index = f(-2, pr_length)+1;
    l2.classList.add('left2','z2','p_page');


    let l1 = active_pages.insertBefore(new_page(), project);
    l1.dataset.p_index = f(-1, pr_length)+1;
    l1.classList.add('left1','z3', 'p_page');


    project.classList.add('p_page')


    let r1 = active_pages.insertBefore(new_page(),project.nextElementSibling);
    r1.dataset.p_index = f(1, pr_length)+1;
    r1.classList.add('right1','z3','p_page');


    let r2 = active_pages.insertBefore(new_page(),project.nextElementSibling);
    r2.dataset.p_index = f(2, pr_length)+1;
    r2.classList.add('right2','z2','p_page');


    for (el of [l2,l1,r1,r2]){
        let tmp = el;
        el.style.left='50%';
        el.style.right='50%';
        el.dataset.index = project.dataset.index;
        setTimeout(()=>{
            tmp.style.left = null;
            tmp.style.right = null;

        }, 100)

    }
    for (el of [l2,l1,r1,r2]){
        fill_page(el);
        page_lang(el, lang);
    }

}
function remove_p_pages(){
    active_pages.querySelectorAll('.p_page').forEach((p_page)=>{
        if (!p_page.classList.contains('active')){
            p_page.style.left='50%';
            p_page.style.right='50%';
            setTimeout(()=>{p_page.remove();},100)
        }else{
            p_page.classList.remove('p_page');
        }
    })
}

function next_page(pages){
    if (pages.classList.contains('open')){
        next_p_page(pages);
    }else{
        next_file(pages);
    }
}
function next_file(pages){
    let r3= pages.querySelector('.right3');
    r3.remove();

    let r2= pages.querySelector('.right2');
    r2.classList.remove('right2','z2');
    r2.classList.add('right3','z1');

    let r1= pages.querySelector('.right1');
    r1.classList.remove('right1','z3');
    r1.classList.add('right2','z2');

    let a = pages.querySelector('.active');
    a.classList.remove('active','z4','bigger');
    a.classList.add('right1', 'z3');

    let l1 = pages.querySelector('.left1');
    l1.classList.remove('left1', 'z3');
    l1.classList.add('active', 'z4');

    let l2 = pages.querySelector('.left2');
    l2.classList.remove('left2', 'z2');
    l2.classList.add('left1', 'z3');

    let l3 = pages.querySelector('.left3');
    l3.classList.remove('left3', 'z1');
    l3.classList.add('left2', 'z2');

    let l4 = pages.insertBefore(new_page(), pages.children[0]);
    l4.dataset.p_index = 1;
    l4.classList.add('left3','z1');

    //Loads low res for leftmost (hidden) page
    let bg = l4.querySelector('.placeholder_background');
    l4.dataset.index = f(parseInt(l3.dataset.index)-1, data[active_pages.dataset.relatedData].length);// index of the new
    bg.style.backgroundImage =`url(${data[active_pages.dataset.relatedData][l4.dataset.index][1]['low_res']})`;

    //Load high res for (new) active page
    var bgImg = new Image();
    bgImg.onload = ()=>{
        bg = l1.querySelector('.placeholder_background');
        bg.classList.add('loaded');
        bg.style.backgroundImage = 'url(' + bgImg.src + ')';
    };
    bgImg.src = data[active_pages.dataset.relatedData][l1.dataset.index][1]['high_res'];

    next_dot(pages);

    setTimeout(()=>{
        if (l1.classList.contains('active')){
            l1.classList.add('bigger');
        }
    },450)
}

function next_p_page(pages){
    if (!pages.querySelector('.dots.open > .active_dot > .active_dot')){return null} //while unloaded no next-prev actions

    let r2 = pages.querySelector('.right2.p_page');
    r2.remove();

    let r1 = pages.querySelector('.right1.p_page');
    r1.classList.remove('right1','z3');
    r1.classList.add('right2','z2');

    let a = pages.querySelector('.active.p_page');
    a.classList.remove('active','z4','bigger');
    a.classList.add('right1','z3');

    let l1 = pages.querySelector('.left1.p_page');
    l1.classList.remove('left1', 'z3');
    l1.classList.add('active', 'z4');

    let l2 = pages.querySelector('.left2.p_page');
    l2.classList.remove('left2', 'z2');
    l2.classList.add('left1', 'z3');

    let l3 = pages.insertBefore(new_page(),l2);
    l3.classList.add('left2','z2','p_page');

    let project = pages.querySelector('.active'); // POSSIBLE ERROR ! THIS IS NOT THE HEAD(TITLE) PAGE !
    let pr_length = data[active_pages.dataset.relatedData][parseInt(project.dataset.index)].length-1;
    l3.dataset.p_index = f(parseInt(l2.dataset.p_index)-1-1, pr_length)+1; //p_index of the new
    l3.dataset.index = project.dataset.index;
    fill_page(l3);
    page_lang(l3, lang);

    full_res_page(l1);

    next_p_dot(pages);
}


function prev_page(pages){
    if (pages.classList.contains('open')){
        prev_p_page(pages);
    }else{
        prev_file(pages);
    }
}
function prev_file(pages){
    let l3= pages.querySelector('.left3');
    l3.remove();

    let l2= pages.querySelector('.left2');
    l2.classList.remove('left2','z2');
    l2.classList.add('left3','z1');

    let l1= pages.querySelector('.left1');
    l1.classList.remove('left1','z3');
    l1.classList.add('left2','z2');

    let a = pages.querySelector('.active');
    a.classList.remove('active','z4','bigger');
    a.classList.add('left1', 'z3');

    let r1 = pages.querySelector('.right1');
    r1.classList.remove('right1', 'z3');
    r1.classList.add('active', 'z4');

    let r2 = pages.querySelector('.right2');
    r2.classList.remove('right2', 'z2');
    r2.classList.add('right1', 'z3');

    let r3 = pages.querySelector('.right3');
    r3.classList.remove('right3', 'z1');
    r3.classList.add('right2', 'z2');

    let r4 = pages.appendChild(new_page());
    r4.dataset.p_index = 1;
    r4.classList.add('right3','z1');

    //Loads low-res for rightmost (hidden) page
    let bg = r4.querySelector('.placeholder_background');
    r4.dataset.index = f(parseInt(r3.dataset.index)+1, data[active_pages.dataset.relatedData].length);
    bg.style.backgroundImage =`url(${data[active_pages.dataset.relatedData][r4.dataset.index][1]['low_res']})`;

    //Load high-res for (new) active page
    var bgImg = new Image();
    bgImg.onload = function(){
        let bg = r1.querySelector('.placeholder_background');
        bg.classList.add('loaded');
        bg.style.backgroundImage = 'url(' + bgImg.src + ')';
    };
    try {
        bgImg.src = data[active_pages.dataset.relatedData][r1.dataset.index][1]['high_res'];
    } catch {
        console.log('hello, error!')
    }


    prev_dot(pages);

    setTimeout(()=>{
        if (r1.classList.contains('active')){
            r1.classList.add('bigger');
        }
    },450)
}

function prev_p_page(pages){
    if (!pages.querySelector('.dots.open > .active_dot > .active_dot')){return null} //while unloaded no next-prev actions

    let l2 = pages.querySelector('.left2.p_page');
    l2.remove();

    let l1 = pages.querySelector('.left1.p_page');
    l1.classList.remove('left1','z3');
    l1.classList.add('left2','z2');

    let a = pages.querySelector('.active.p_page');
    a.classList.remove('active','z4','bigger');
    a.classList.add('left1','z3');

    let r1 = pages.querySelector('.right1.p_page');
    r1.classList.remove('right1', 'z3');
    r1.classList.add('active', 'z4');

    let r2 = pages.querySelector('.right2.p_page');
    r2.classList.remove('right2', 'z2');
    r2.classList.add('right1', 'z3');

    let r3 = pages.insertBefore(new_page(),r2);
    r3.classList.add('right2','z2','p_page');

    let project = pages.querySelector('.active'); // POSSIBLE ERROR ! THIS IS NOT THE HEAD(TITLE) PAGE !
    let pr_length = data[active_pages.dataset.relatedData][parseInt(project.dataset.index)].length-1;
    r3.dataset.p_index = f(parseInt(r2.dataset.p_index)-1+1, pr_length)+1; //p_index of the new
    r3.dataset.index = project.dataset.index;
    fill_page(r3);
    page_lang(r3, lang);

    full_res_page(r1)

    prev_p_dot(pages);
}

function next_dot(pages){
    let active_dot = pages.querySelector('.active_dot');
    active_dot.classList.remove('active_dot');
    if(active_dot.nextElementSibling){
        active_dot.nextElementSibling.classList.add('active_dot');
    }else{
        active_dot.parentElement.firstElementChild.classList.add('active_dot');
    }
}
function prev_dot(pages){
    let active_dot = pages.querySelector('.active_dot');
    active_dot.classList.remove('active_dot');
    if(active_dot.previousElementSibling){
        active_dot.previousElementSibling.classList.add('active_dot');
    }else{
        active_dot.parentElement.lastElementChild.classList.add('active_dot');
    }
}
function next_p_dot(pages){
    if (!pages.querySelector('.dots.open > .active_dot > .active_dot')){return null} // NOT SOLUTION
    let active_dot = pages.querySelector('.dots.open > .active_dot > .active_dot');
    active_dot.classList.remove('active_dot');
    if(active_dot.nextElementSibling){
        active_dot.nextElementSibling.classList.add('active_dot');
    }else{
        active_dot.parentElement.firstElementChild.classList.add('active_dot');
    }
}
function prev_p_dot(pages){
    if (!pages.querySelector('.dots.open > .active_dot > .active_dot')){return null} //NOT SOLUTION
    let active_dot = pages.querySelector('.dots.open > .active_dot > .active_dot');
    active_dot.classList.remove('active_dot');
    if(active_dot.previousElementSibling){
        active_dot.previousElementSibling.classList.add('active_dot');
    }else{
        active_dot.parentElement.lastElementChild.classList.add('active_dot');
    }
}

function new_page(){

    var page_z = document.createElement('div');
    page_z.classList.add('page_z');
    page_z.innerHTML = '<div class="page_border"><div class="page"><div class="bg_border"><div class="placeholder_background"></div><div class="loading"><div></div></div></div>';

    return page_z;
}

function toggle_contact(){
    this.parentElement.querySelectorAll('.option').forEach((o)=>{
        o.classList.remove('active_option');
    })
    this.classList.add('active_option');
}

function toggle_lang(e){
    e.preventDefault();
    let langboxes = document.querySelectorAll('.langbox')
    lang = this.dataset.lang;
    for (langbox of langboxes){
        langbox.querySelectorAll('.option').forEach((o)=>{
            o.classList.remove('active_option');
        });
        langbox.querySelector('#'+lang).parentElement.classList.add('active_option');

    }

    setTimeout(()=>{
        header_lang(lang);
        document.querySelectorAll('.p_page').forEach((page)=>{
            page_lang(page, lang);
        })
        page_lang(document.querySelector('#profile_page'), lang);
    },600)

}
