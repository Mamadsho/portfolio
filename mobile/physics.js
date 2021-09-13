var trajectoryLength=0;
var comrades=[];
var slider=document.querySelector('.slider');
var running=false;

function applyPhysics(){
    document.querySelectorAll(".project").forEach(applyProjectListeners);
}
function redraw(){
    if(running){
        
        comrades.forEach(function (cmr){
            // cmr.style.transform=`translate(${touchStartL+touchShiftL}px,0px)`; 
            cmr.style.left = touchStartL+touchShiftL;
        });
        // slider.style.transform=`translate(0,${touchStartT+touchShiftT}px)`;
        slider.style.top = touchStartT+touchShiftT;

        // X AXIS
        var changedX=curTouch.clientX-prevTouch.clientX;
        touchShiftL+=changedX;


        // Y AXIS
        var changedY=curTouch.clientY-prevTouch.clientY;
        touchShiftT+=changedY;
        

        trajectoryLength+=Math.abs(changedX)+Math.abs(changedY);//first time there's no prevTouch
        //VARIABLES REASSIGNMENT
        prevTouch=curTouch;
        
    }
    requestAnimationFrame(redraw);
}
redraw();
function applyProjectListeners(el){
    el.addEventListener('touchstart',tstartX)
    el.addEventListener('touchmove',tmoveX);
    el.addEventListener('touchend',tendX);
}
function tstartX(tevt){
    const index = [...document.querySelector('.slider').querySelectorAll('.project')].indexOf(this);
    const yLoop=document.querySelector('.slider').dataset.packSize*document.querySelector('.projectPack').querySelectorAll('.project').length;
    const i=index%yLoop;
    comrades=[pByN(i),pByN(i+yLoop),pByN(i+2*yLoop),pByN(i+3*yLoop)];
    // touchStartL=getTranslateX(this);
    touchStartL = parseInt(this.style.left)
    touchShiftL=0.0;
    // touchStartT=getTranslateY(slider);
    touchStartT = parseInt(slider.style.top)
    touchShiftT=0.0;
    running=true;
    curTouch=tevt.touches[0];
    prevTouch=tevt.touches[0];
}
function tmoveX(tevt){
    curTouch=tevt.touches[0];
}

function pByN(n){
    return document.querySelector('.slider').querySelectorAll('.project')[n]
}
function getTranslateX(pr){
    var style=window.getComputedStyle(pr);
    var matrix=new WebKitCSSMatrix(style.transform);
    return(matrix.m41);
}
function getTranslateY(slider){
    var style=window.getComputedStyle(slider);
    var matrix=new WebKitCSSMatrix(style.transform);
    return(matrix.m42);
}

function tendX(tevt){
    //NULLING VARS
    //trajectoryLength=0; is nulled in positioning.js for click physX
    prevTouch={};
    comrades=[];
    running=false;
}

// GLOBAL VARIABLES:
var curTouch={};
var prevTouch={};
var touchStartL=0;
var touchShiftL=0;
var touchStartT=0;
var touchShiftT=0;