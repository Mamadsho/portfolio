function header_lang(lang){

    let header = document.querySelector('#header');
    header.querySelectorAll('.langy').forEach((text)=>{
        text.innerHTML = text.dataset[lang];
    })

    //Redefine the width of project name in header;
    //only if the project is open
    if (active_pages.classList.contains('open')){
        let active_header = header.querySelector('.active_header');
        let h_proj_name = active_header.querySelector('.project_name');
        project_name =h_proj_name.innerHTML;
        h_proj_name.style.width = project_name.length*18;
    }
}
function page_lang(page, lang){
    page.querySelectorAll('.langy').forEach((text)=>{
        text.innerHTML = text.dataset[lang];
    })
}