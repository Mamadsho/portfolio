function toggleElement(el,n){
    let activeButton=el.querySelector('.toggle_button_active');
    activeButton.classList.remove('toggle_button_active');
    el.children[n].classList.add('toggle_button_active');
}
function toggle_lang(evt){
    this.parentElement.querySelectorAll('.option').forEach((o)=>{
        console.log(o);
        o.classList.remove('active_option');
    })
    this.classList.add('active_option');
    lang = this.querySelector('.lang').id;
    setTimeout(()=>{
        reloadPage();
    },1000)  
}

function toggle_fs(evt){
    this.parentElement.querySelectorAll('.option').forEach((o)=>{
        console.log(o);
        o.classList.remove('active_option');
    })
    if (this.querySelector('.lang').id=='on'){
        this.classList.add('active_option');
    }else{
        this.classList.add('active_option');
    }
    setTimeout(()=>{
        if (this.querySelector('.lang').id=='on'){
            document.body.requestFullscreen();
        }else{
            if(document.fullscreen) document.exitFullscreen();
        }
        setTimeout(reloadPage, 100);
    },1000)
}

function letsGo(){
    infinitize();
    applyPhysics();
    applyPositioning();
    drawVp();
    placeAP();
    lazyLoad('Home',0);
    document.querySelector('.starter').classList.add('starterGo');
    setTimeout(()=>{
        document.querySelector('.vp_border').style.backgroundPosition='100% 100%';
        document.querySelector('.starter').remove();
        document.querySelector('#sliderHolder').classList.add('slide-in');
        setTimeout(()=>{
            document.querySelector('#vp').classList.add('showUp');
            document.querySelector('.activePage').style.visibility='visible';
            
        },1000)//HARDCODE
    },800)
}
document.addEventListener('DOMContentLoaded',()=>{
    setTimeout(()=>{
        if(document.querySelector('.starter')) letsGo();
        document.body.addEventListener('touchend', remove_hints)
    },2000)
})
function remove_hints(){
    //document.querySelector('#hints').remove();
    // This code now does nothing.
    // Write here what you want for hints before first interface touch
    document.body.removeEventListener('touchend',remove_hints);
}