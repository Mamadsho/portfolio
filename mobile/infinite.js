
function infinitize(){
    document.querySelectorAll(".project").forEach((p)=>{
        setupX(p);
    })
    setupY(document.querySelector('.slider'));

    document.querySelectorAll(".project").forEach((p)=>{
        p.addEventListener('touchend',repositionLoopX);
    })
    document.querySelector('.slider').addEventListener('touchend',repositionLoopY);
}

function setupX(pr){
    let clone=pr.querySelector('.pack');
    let cont=document.querySelector('.container');
    pr.dataset.packSize=Math.ceil(Math.max(cont.offsetHeight,cont.offsetWidth)/clone.offsetWidth);//Math.max is used for orientation compatibility
    pr.dataset.packWidth=pr.dataset.packSize*clone.offsetWidth;
    clone.style.width = pr.dataset.packWidth*4;
    // clonePack(clone,pr,pr.dataset.packSize-1);
    // clonePack(clone,pr,pr.dataset.packSize*3);

    // pr.style.transform=`translateX(${-(pr.dataset.packWidth)}px)`; The GOOD WAY
    pr.style.left = -pr.dataset.packWidth;
}

function setupY(slider){
    let clone=document.querySelector('.projectPack');
    let cont=document.querySelector('.container');
    let packSize=Math.ceil(Math.max(cont.offsetHeight,cont.offsetWidth)/clone.offsetHeight);//Math.max is used for orientation compatibility
    let packHeight=packSize*clone.offsetHeight;
    slider.dataset.packHeight=packHeight;
    slider.dataset.packSize=packSize;
    clonePack(clone,slider,packSize-1);
    clonePack(clone,slider,packSize*3);
    // slider.style.transform=`translateY(${-packHeight}px)`; The GOOD WAY
    slider.style.top = -packHeight;
}

function clonePack(pack,pr,n){
    for (let index = 0; index < n; index++) {
        let dummy=pack.cloneNode(true);
        dummy.classList.add('dummy');
        pr.appendChild(dummy);    
    }
}


//  Maybe these should be part of physics.js ?

function repositionLoopX(tevt){
    
    // TIMEOUT is set for making it universal for click physics and drag physics
    // it should process AFTER positioning
    setTimeout(()=>{
        const index = [...document.querySelector('.slider').querySelectorAll('.project')].indexOf(this);
        const yLoop=document.querySelector('.slider').dataset.packSize*document.querySelector('.projectPack').querySelectorAll('.project').length;
        const i=index%yLoop;
        const comrades=[pByN(i),pByN(i+yLoop),pByN(i+2*yLoop),pByN(i+3*yLoop)];
        comrades.forEach(function(cmr){
            let w=parseInt(cmr.dataset.packWidth) ;
            // let l=-getTranslateX(cmr);
            // cmr.style.transform=`translateX(${-(w+l%w)}px)`; The GOOD WAY
            let l = -parseInt(cmr.style.left)
            cmr.style.left = -(w+l%w);
        });
    },transitionDurationHC) //HARDCODE
    
    
}
function repositionLoopY(tevt){

    // TIMEOUT is set for making it universal for click physics and drag physics
    setTimeout(()=>{
        let h=parseInt(this.dataset.packHeight) ;
        // let t=-getTranslateY(this);
        // this.style.transform=`translateY(${-(h+t%h)}px)`; The GOOD WAY
        let t = - parseInt(this.style.top)
        this.style.top = -(h+t%h);
    },transitionDurationHC) //HARDCODE
}