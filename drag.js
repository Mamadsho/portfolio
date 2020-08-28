document.addEventListener('DOMContentLoaded',()=>{

    setTimeout(function(){
        document.querySelector('.modal').remove();
        document.querySelector('#logo').style.zIndex=-1;
        document.querySelector('#logo').style.animationPlayState='running';
        console.log('modal removed')
    },3000)

    c={};
    c.is_active=false;
    init_x=null;
    shift_x=null;
    init_y=null;
    shift_y=null;
    
    function mo (e){
        c=this;
        c.style.zIndex='10';
    };

    function mout (e){
        c.style.zIndex='initial';
    }

    function md (e){
        this.is_active=true;
        init_x=e.clientX;
        init_y=e.clientY;
        //console.log('c activated.',c.is_active,init_x,init_y)
    }
    
    document.onmousemove=function(e){
        if (c.is_active){
            shift_x=e.clientX-init_x;
            shift_y=e.clientY-init_y;
            
            c.style.left=(c.offsetLeft+shift_x)+'px';
            c.style.top=(c.offsetTop+shift_y)+'px';

            init_x=e.clientX;
            init_y=e.clientY;
        }
        //console.log(c.is_active,shift_x,shift_y,(c.offsetLeft+shift_x)+'px',(c.offsetTop+shift_y)+'px')
    }
    
    function mu (e){
        this.is_active=false;
        
        //console.log('c deactivated', c.is_active)
    }

    //ADDING PROJECT ELEMENTS:
    function add_project(stl){
        const pr=document.createElement('div');
        pr.className='circle';
        pr.style=stl;
        pr.innerHTML='<img src="gesture-24px.svg" style="width:35px; position:relative; left:15px; top:15px"> <h2 style="position: relative; color:white; left: 20px; top:5px;">ProjectTitle</h2><p style="position: relative; color:white; left: 10px">Project Definition</p>'
        document.querySelector('.container').append(pr);

    }

    add_project("background-color: blue; left: 80px; top: 80px;");
    add_project('');
    add_project("background-color: greenyellow; left: 180px; top: 60px;")


        document.querySelectorAll('.circle').forEach(function(dragElement){
        dragElement.onmouseover=mo;
        dragElement.onmouseout=mout;
        dragElement.onmousedown=md;
        dragElement.onmouseup=mu;
    });
})