function undress(circle){
    if (circle.querySelector('svg').getAttribute('transform')=='rotate(-90)'){
        circle.querySelector('svg').setAttribute('transform','rotate(90)');    
    }else{
        circle.querySelector('svg').setAttribute('transform','rotate(-90)');
    }
};

document.addEventListener('DOMContentLoaded',()=>{

    function dbg(str){
        document.querySelector('#debug').innerHTML=str;
    }
    document.querySelector('#logo').style.animationPlayState='running';
    setTimeout(function(){
        document.querySelector('#logo').style.zIndex=-1;

        document.querySelector('.modal').style.animationPlayState='running';
        setTimeout(function(){
            document.querySelector('.modal').style.zIndex=-2;
            //document.querySelector('.modal').remove();
        },1000*99/100);
        
    },3000*.99)//<=This number should be change to loading time plus little in future.
    c={};
    is_active=false;
    init_x=null;
    shift_x=null;
    init_y=null;
    shift_y=null;
    traj_length=0;

    function mo (e){
        c=this;
        c.style.zIndex='10';
    };
    
    function mout (e){
        c.style.zIndex='initial';
        //is_active=false;
        //c={};
    }

    function md (e){
        if (e.type==='touchstart'){
            dbg(`c: ${c}; touchstart`)
            c=this;
            c.style.zIndex='10';
            init_x=e.touches[0].clientX;
            init_y=e.touches[0].clientY;
        }else{
            dbg(`c: ${c}; mousedown`)


            init_x=e.clientX;
            init_y=e.clientY;
        }

        is_active=true;
    }
    function move(e){
        if (is_active){
            if (e.type==='touchmove'){
                shift_x=e.touches[0].clientX-init_x;
                shift_y=e.touches[0].clientY-init_y;
                init_x=e.touches[0].clientX;
                init_y=e.touches[0].clientY;
            }else{
                shift_x=e.clientX-init_x;
                shift_y=e.clientY-init_y;
                init_x=e.clientX;
                init_y=e.clientY;            
            }

            r_left=100 * (c.offsetLeft + shift_x) / c.parentElement.offsetWidth;
            r_top=100 * (c.offsetTop + shift_y) / c.parentElement.offsetHeight;

            c.style.left=`${validate_h(r_left)}%`;
            c.style.top=`${validate_v(r_top)}%`;

            traj_length+=Math.abs(shift_x)+Math.abs(shift_y);
        }
        dbg(`touchmove init: [${init_x}, ${init_y}], shift[${shift_x}, ${shift_y}], mc[${e.clientX}, ${e.clientY}]  c: ${e.target.id}; active=${is_active}; traj-length:${traj_length}`)
    }



    document.onmousemove=move;
    document.ontouchmove=move;
    
    document.onmouseup=mu;

    
    function mu (e){
        is_active=false;
        if (traj_length<15){
            c.classList.toggle('open');
        }
        traj_length=0;
        if (e.type==='touchend'){

            c.style.zIndex='initial';
        }
    }

    

    //ADDING PROJECT ELEMENTS:
    function add_project(stl){
        const pr=document.createElement('div');
        pr.className='circle';
        pr.style=stl;
        pr.innerHTML='<div class="modal2"></div><img src="gesture-24px.svg" style="width:35px; position:relative; left:15px; top:15px"> <h2 style="position: relative; color:white; left: 20px; top:5px;">ProjectTitle</h2><p style="position: relative; color:white; left: 10px">Project Definition</p></div>    <svg id="chevron" onclick="undress(c)" width="30px" transform="rotate(90)" style="z-index:99; position:absolute; left:160px; top:160px;" aria-hidden="true" focusable="false" viewBox="0 0 512 512"><path fill="white" d="M504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zM273 369.9l135.5-135.5c9.4-9.4 9.4-24.6 0-33.9l-17-17c-9.4-9.4-24.6-9.4-33.9 0L256 285.1 154.4 183.5c-9.4-9.4-24.6-9.4-33.9 0l-17 17c-9.4 9.4-9.4 24.6 0 33.9L239 369.9c9.4 9.4 24.6 9.4 34 0z"></path></svg>'
        document.querySelector('#container').append(pr);

    }
 
    add_project("background-color: blue; left: 80px; top: 80px;");
    add_project('');
    add_project("background-color: greenyellow; left: 180px; top: 60px;")

    document.querySelectorAll('.circle').forEach(function(dragElement){
        dragElement.onmouseover=mo;
        dragElement.onmouseout=mout;
        dragElement.onmousedown=md;
        

        dragElement.ontouchstart=md;
        dragElement.ontouchend=mu;
    });
    document.querySelector('#container').addEventListener('mouseleave',()=>{

        is_active=false;
        traj_length=0;
    })
    document.querySelectorAll('*').forEach(function(Element){
        Element.ondragstart=()=>{
            return false;
        };
        Element.ondrop=()=>{
            return false;
        };
    })
})
