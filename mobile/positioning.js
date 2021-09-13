function applyPositioning(){
    document.querySelectorAll('.project').forEach((pr)=>{
        pr.addEventListener('touchend',(tevt)=>{
            // let l= getTranslateX(pr); //The GOOD Way!
            let l = parseInt(pr.style.left)

            // let samplePageStyle=window.getComputedStyle(pr.querySelector('.page'),null);
            //let w= parseInt(samplePageStyle.width)+2*parseInt(samplePageStyle.marginLeft);

            let w = 50 //HARDCODE
        
            const index = [...document.querySelector('.slider').querySelectorAll('.project')].indexOf(pr);
            const yLoop=document.querySelector('.slider').dataset.packSize*document.querySelector('.projectPack').querySelectorAll('.project').length;
            const i=index%yLoop;
            const comrades=[pByN(i),pByN(i+yLoop),pByN(i+2*yLoop),pByN(i+3*yLoop)];

            comrades.forEach(function (cmr){
                cmr.classList.add('moving');

                //--------MAIN POINT----------
                if(trajectoryLength<10){
                    // let page=tevt.target.closest('.page');
                    // let pageLeft=page.offsetLeft;
                    // cmr.style.transform=`translateX(${Math.round(-pageLeft/w)*w}px)`;

                    let pack = tevt.target.closest('.pack');
                    let packLeft = pack.offsetLeft;
                    //let packLeft = pack.style.left;
                    let tLeft = curTouch.clientX;
                    let packAbsX = pack.getBoundingClientRect().left;
                    let d = tLeft - packAbsX;
                    console.log(d)
                    // cmr.style.transform=`translateX(${Math.ceil(-(packLeft+d)/w)*w}px)`
                    cmr.style.left = Math.ceil(-(packLeft+d)/w)*w;

                }else{
                    // cmr.style.transform=`translateX(${Math.round(l/w)*w}px)`;
                    cmr.style.left = Math.round(l/w)*w;
                };
                //---------END OF MAIN POINT-------  

                setTimeout(() => {
                    cmr.classList.remove('moving');
                }, parseFloat(window.getComputedStyle(pr,null).transitionDuration)*1000);
            })
        })
    })
    document.querySelector('.slider').addEventListener('touchend',function(tevt){
        
        // let t= getTranslateY(this); // The GOOD WAY
        let t = parseInt(this.style.top)

        // let samplePageStyle=window.getComputedStyle(this.querySelector('.page'),null);
        // let h= parseInt(samplePageStyle.height)+2*parseInt(samplePageStyle.marginTop);

        let h = 50; //HARDCODE
        
        this.classList.add('moving');

        //---------MAIN POINT-------------
        if(trajectoryLength<10){
            let project=tevt.target.closest('.project');
            let projectTop=project.offsetTop;
            // this.style.transform=`translateY(${Math.round(-projectTop/h)*h}px)`; 
            this.style.top = Math.round(-projectTop/h)*h;
        }else{
            // this.style.transform=`translateY(${Math.round(t/h)*h}px)`;
            this.style.top = Math.round(t/h)*h;
        };
        //---------END OF MAIN POINT-------    

        setTimeout(() => {
            this.classList.remove('moving');
            trajectoryLength=0;
        }, parseFloat(window.getComputedStyle(this,null).transitionDuration)*1000);
    })
}