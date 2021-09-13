window.addEventListener('resize',redrawLayout)
function redrawLayout(){
    setTimeout(()=>{
        drawVp();
        placeAP();
        lazyLoad(Object.keys(data)[selectedProjectN],selectedPageN);
    },450)
}