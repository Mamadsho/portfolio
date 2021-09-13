data='';

document.addEventListener('DOMContentLoaded',()=>{
    const req= new XMLHttpRequest();
    req.open('GET','data.json',false);
    req.onreadystatechange=()=>{
        data=JSON.parse(req.responseText);

        // HERE THE ACTION HAPPENS
        // 

        var slider=document.querySelector('.slider');
        var projectPack=document.createElement('div');
        projectPack.classList.add('projectPack');

        for (pr in data){
            console.log(pr);

            let project=document.createElement('div');
            project.classList.add('project');


            let pack=document.createElement('div');
            pack.classList.add('pack');

            pack.style.webkitMaskImage = 'url(' + pr + '.png';
            pack.style.maskImage = 'url(' + pr + '.png)';

            pack.style.width = data[pr].length * 50; //HARDCODE
            pack.style.height = 50; //HARDCODE


            //naming
            project.dataset.name=pr
            project.appendChild(pack);
            projectPack.appendChild(project);
        }
        slider.appendChild(projectPack);
    };
    req.send();
})