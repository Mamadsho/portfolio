selectedProjectN=0;
selectedPageN=0;

document.addEventListener('DOMContentLoaded',()=>{
    document.querySelector('.slider').addEventListener('touchend',()=>{
        setTimeout(()=>{ //Load after positioning
            // DEFINITION OF ACTIVE PROJECT
            // let t=getTranslateY(document.querySelector('.slider'));
            t = parseInt(document.querySelector('.slider').style.top)

            // let samplePageStyle=window.getComputedStyle(document.querySelector('.page'),null)
            // let h=parseInt(samplePageStyle.height)+2*parseInt(samplePageStyle.marginTop)

            let h = 50; //HARDCODE

            let NoPr=Object.keys(data).length; // GET JSON DATA LENGTH

            //GIVEN top(slider), height(cirlce), NumberOfProjects(data)&=>NumberOfPages
            selectedProjectN=-Math.round(t/h)%NoPr; //PROJECT N

            let NoPg=data[Object.keys(data)[selectedProjectN]].length
            let selectedProject=document.querySelectorAll('.project')[-Math.round(t/h)]
            // let l=getTranslateX(selectedProject);
            l = parseInt(selectedProject.style.left)

            //GIVEN MORE nOfPages(project),left(project)
            selectedPageN=-Math.round(l/h)%NoPg; //PAGE N

            // console.log('Selection: ',selectedProjectN,selectedPageN);

            //LAZY LOADING
            lazyLoad(Object.keys(data)[selectedProjectN],selectedPageN);
        },transitionDurationHC);//HARDCODE
    })
})