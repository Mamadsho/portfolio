function lazyLoad(pr,pg){ //   pr -> Project;   pg -> Page
    let vp=document.querySelector('#vp');
    page=data[pr][pg]
    if(page['type']=='html'){
        let container=document.createElement('div');
        container.classList.add('html_container');
        container.innerHTML=page['inner'][lang];
        vp.innerHTML='';
        vp.style.backgroundImage='';
        vp.appendChild(container);
        if (document.querySelector('#lang_toggle')){
            document.querySelectorAll('#lang_toggle .value .option').forEach((x)=>{
                x.addEventListener('click',toggle_lang)
            })
            document.querySelector('#lang_toggle #'+lang).closest('.option').classList.add('active_option')
        }
        if (document.querySelector('#fs_toggle')){
            document.querySelectorAll('#fs_toggle .value .option').forEach((x)=>{
                x.addEventListener('click',toggle_fs)
            })
            if (document.fullscreen || document.webkitIsFullscreen){
                document.querySelector('#fs_toggle #on').closest('.option').classList.add('active_option');
                document.querySelector('#fs_toggle #on').style.backgroundColor='#15d323';
            }else{
                document.querySelector('#fs_toggle #off').closest('.option').classList.add('active_option');
            }
        }
    };
    if(page['type']=='settings'){
        let container=document.createElement('div');
        container.classList.add('html_container');
        container.innerHTML=`<h1>${(lang=='ru')?'Настройки':'Settings'}</h1><div class='itemlist'><div style='padding-bottom: 0;padding-top: 0;'><div class='itemkey'>${(lang=='ru')?'Язык':'Language'}</div><div class='itemvalue' style='background-color: inherit;padding: 0;'><div class='toggle_container' id='lang' onclick='toggle_lang()'><div class='toggle_button ${(lang=='ru')?'toggle_button_active':''}' style='background-image: url(\"ru.svg\")'></div><div class='toggle_button ${(lang=='en')?'toggle_button_active':''}' style='background-image: url(\"uk.svg\");'></div></div></div></div><div style='padding-bottom: 0;padding-top: 0;'><div class='itemkey'>${(lang=='ru')?'Полноэкранный режим':'Fullscreen'}</div><div class='itemvalue' style='background-color: inherit;padding: 0;'><div class='toggle_container' id='fs' onclick='toggle_fs()'><div class='toggle_button ${(fs)?'':'toggle_button_active'}' style='background-image: url(\"fs_off.svg\")'></div><div class='toggle_button ${(fs)?'toggle_button_active':''}' style='background-image: url(\"fs_on.svg\");'></div></div></div></div></div>`;
        vp.innerHTML='';
        vp.style.backgroundImage='';
        vp.appendChild(container);
    };
    if(page['type']=='image'){
        vp.innerHTML='';

        //The Image LR
        let img_cont=document.createElement('div');
        img_cont.id='img_cont';
        img_cont.classList.add('blurred','grown')
        let img=document.createElement('img');
        img.setAttribute('src',page['image_lr']);
        img.classList.add('image_viewer');
        img_cont.appendChild(img);
        vp.appendChild(img_cont);
        
        //Loading
        let loading = document.createElement('div');
        loading.classList.add('loading');
        vp.appendChild(loading);

        //More Button
        let more_cont=document.createElement('div');
        more_cont.id='more_cont';
        let more=document.createElement('div');
        more.id='more';
        more_cont.appendChild(more);
        more_cont.onclick=function(){toggle_desc()};
        vp.appendChild(more_cont);

        //Description
        let desc_cont=document.createElement('div');
        desc_cont.id='desc_cont';
        let desc=document.createElement('div');
        desc.id='desc';
        desc.innerHTML=page['desc'][lang];
        desc_cont.appendChild(desc);
        vp.appendChild(desc_cont);



        //Image HighRes
        img_hr = new Image();

        //low res onload
        img.onload=function(){
            rv=vp.offsetWidth/vp.offsetHeight;
            ri=img.offsetWidth/img.offsetHeight;
            // ri=1.4367816091954022;
            if((rv-1)*(ri-1)>=0){
                if(rv>ri){
                    img.style.width=vp.offsetWidth-4;//HARDCODE
                }else{
                    img.style.height=vp.offsetHeight-4;//HARDCODE
                };
            }else{
                img.classList.add('imgv_rotate');
                if(rv<(1/ri)){
                    img.style.width=vp.offsetHeight-4;//HARDCODE
                }else{
                    img.style.height=vp.offsetWidth-4;//HARDCODE
                }
            };
            img_cont.scrollTop=(img_cont.scrollHeight-img_cont.offsetHeight)/2; //center by Y
            img_cont.scrollLeft=(img_cont.scrollWidth-img_cont.offsetWidth)/2; //center by X
            // console.log('hello recursion')
            img_hr.src=page['image_hr']
        }

        //HighRes onload
        img_hr.onload=function(){
            
            //Make it look like img - the Low res
            img_hr.style.width = img.style.width;
            img_hr.style.height = img.style.height;
            for (cls of img.classList){
                img_hr.classList.add(cls);
            };

            img.remove();
            img_cont.appendChild(img_hr);
            img_cont.classList.remove('blurred','grown');
            loading.remove();
        };
        
    }
    if(page['type']=='video'){
        vp.innerHTML='';

        // <iframe src="https://player.vimeo.com/video/597929589?h=8739182c4b"
        //      width="333" height="196" frameborder="0" 
        //      allow="autoplay; fullscreen; picture-in-picture" allowfullscreen="">
        // </iframe>

        //The Vimeo Element
        let vid_cont=document.createElement('div');
        vid_cont.id='vid_cont';
        let vid=document.createElement('iframe');
        vid.setAttribute('src',page['src']+'?h=8739182c4b&autoplay=1&loop=1');
        vid.setAttribute('allow','autoplay; fullscreen');
        vid.setAttribute('allowfullscreen','');
        vid.classList.add('video_viewer');

        let vp_orientation = (vp.offsetWidth/vp.offsetHeight > 1)? 'h' : 'v';
        if (vp_orientation == page['orientation']){
            vid_cont.style.width=vp.offsetWidth-4; //HARDCODE
            vid_cont.style.height=vp.offsetHeight-4; //HARDCODE
            vid.setAttribute('width',vp.offsetWidth-4); //HARDCODE
            vid.setAttribute('height',vp.offsetHeight-4); //HARDCODE
        } else {
            vid_cont.style.height=vp.offsetWidth-4; //HARDCODE
            vid_cont.style.width=vp.offsetHeight-4; //HARDCODE
            vid.setAttribute('height',vp.offsetWidth-4); //HARDCODE
            vid.setAttribute('width',vp.offsetHeight-4); //HARDCODE
            vid_cont.classList.add('imgv_rotate')
        }

        vid_cont.appendChild(vid);
        vp.appendChild(vid_cont);

        //More Button
        let more_cont=document.createElement('div');
        more_cont.id='more_cont';
        let more=document.createElement('div');
        more.id='more';
        more_cont.appendChild(more);
        more_cont.onclick=function(){toggle_desc()};
        vp.appendChild(more_cont);

        //Description
        let desc_cont=document.createElement('div');
        desc_cont.id='desc_cont';
        let desc=document.createElement('div');
        desc.id='desc';
        desc.innerHTML=page['desc'][lang];
        desc_cont.appendChild(desc);
        vp.appendChild(desc_cont);
        
    }

}

function toggle_desc(){
    let desc_cont=document.querySelector('#desc_cont');
    let more_butt = document.querySelector('#more');
    if (window.getComputedStyle(desc_cont).transform=='matrix(1, 0, 0, 1, 0, 0)'){
        desc_cont.style.transform='translateY(100%)';
        more_butt.classList.remove('more_open');
    }else{
        desc_cont.style.transform='translateY(0%)';
        more_butt.classList.add('more_open');
    }
}
function reloadPage(){
    lazyLoad(Object.keys(data)[selectedProjectN],selectedPageN);
}