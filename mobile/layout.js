// basically this script creates the viewport

// document.addEventListener('DOMContentLoaded',drawVp,false);
function drawVp(){
    
    // let samplePageStyle=window.getComputedStyle(document.querySelector('.page'),null);

    let w= 50; //HARDCODE
    let h= 50; //HARDCODE
    let container=document.querySelector('.container');
    
    let cw=Math.floor(window.innerWidth/w)*w;
    container.style.width=cw;
    let ch=Math.floor(window.innerHeight/h)*h;
    container.style.height=ch;

    container.style.top=(window.innerHeight-ch)/2;
    if(document.querySelector('#vp')){
        var vp=document.querySelector('#vp');
    }else{
        var vp=document.createElement('div');
        vp.id='vp';
    }

    //LOADING CSV VPSIZE
    vpSizez={};
    vpsOut='';
    let vps=new XMLHttpRequest();
    vps.open('GET','vpSizes.csv',false);
    vps.onreadystatechange=(evt)=>{
        vpsOut=vps.responseText;
        vpSizez=CSVToArray(vpsOut);
    };
    vps.send();

    let miny,maxy;
    let l,t,r,b; //left top right bottom

    [miny,maxy]=[Math.min(ch/h,cw/w),Math.max(ch/h,cw/w)];

    try{
        [l,t,r,b]=vpSizez[miny][maxy].match(/(.*),(.*),(.*),(.*)/).slice(1,5);
        if(cw>ch){
            [l,t,r,b]=[t,l,b,r];
        };
    }catch{
        [l,t,r,b]=[2,2,2,2]
    }
    //GIVEN ContW,ContH, ltrb

    console.log([l,t,r,b])
    if(document.querySelector('.vp_border')){
        var vp_border = document.querySelector('.vp_border');
    }else{
        var vp_border = document.createElement('div');
        vp_border.classList.add('vp_border');
    }

    vp_border.style.width=cw-(parseInt(l)+parseInt(r))*w;
    vp_border.style.height=ch-(parseInt(t)+parseInt(b))*h;
    vp_border.style.marginLeft=w*parseInt(l);
    vp_border.style.marginTop=h*parseInt(t);


    
    
    container.insertBefore(vp_border,container.firstChild);
    vp_border.insertBefore(vp,vp_border.firstChild)

}