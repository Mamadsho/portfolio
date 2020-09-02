function undress(e){
    c=this.parentElement.parentElement;
    console.log(this);
    chev=c.querySelector('.chevron');
    if (chev.getAttribute('transform')=='rotate(-90)'){
        chev.setAttribute('transform','rotate(90)');
        c.querySelector('.coor_orig').classList.toggle('invisible')
    }else{
        chev.setAttribute('transform','rotate(-90)');
        c.querySelector('.coor_orig').classList.toggle('invisible')
    }
    e.stopPropagation();
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
    //c= document.querySelectorAll('.circle')[0];
    c={};
    is_active=false;
    init_x=null;
    shift_x=null;
    init_y=null;
    shift_y=null;
    traj_length=0;


    function md (e){
        if (e.type==='touchstart'){
            dbg(`c: ${c}; touchstart`)
            //c.style.zIndex='initial'
            c=this;
            c.style.zIndex='10';
            init_x=e.touches[0].clientX;
            init_y=e.touches[0].clientY;
        }else{
            dbg(`c: ${c}; mousedown`)
            c=this;
            c.style.zIndex='10';
            init_x=e.clientX;
            init_y=e.clientY;
        }

        is_active=true;
        e.stopPropagation();
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

            r_left=100 * (c.offsetLeft + shift_x) / window.innerWidth;
            r_top=100 * (c.offsetTop + shift_y) / window.innerHeight;

            var v = c.getBoundingClientRect();
            // these are relative to the viewport, i.e. the window
            var top = 100*(v.top+shift_y)/window.innerHeight;
            var left = 100*(v.left+shift_x)/window.innerWidth;

            if (valid(top,100*c.offsetHeight/window.innerHeight)){c.style.top=`${(r_top)}vh`;};
            if(valid(left,100*c.offsetWidth/window.innerWidth)){c.style.left=`${(r_left)}vw`;};
            
            

            traj_length+=Math.abs(shift_x)+Math.abs(shift_y);
        }
        dbg(`touchmove init: [${init_x}, ${init_y}], shift[${shift_x}, ${shift_y}], mc[${e.clientX}, ${e.clientY}]  c: ${e.target.id}; active=${is_active}; traj-length:${traj_length}`);
        e.stopPropagation();
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
        e.stopPropagation();
    }

    

    //ADDING PROJECT ELEMENTS:
    function add_project(stl){
        const pr=document.createElement('div');
        pr.className='circle';
        pr.style=stl;
        pr.innerHTML='<div class="modal2"></div><img src="gesture-24px.svg" style="width:35px; position:relative; left:15px; top:15px"> <h2 style="position: relative; color:white; left: 20px; top:5px;">ProjectTitle</h2><p style="position: relative; color:white; left: 10px">Project Definition</p></div>    <svg id="chevron" onclick="undress(c)" width="30px" transform="rotate(90)" style="z-index:99; position:absolute; left:160px; top:160px;" aria-hidden="true" focusable="false" viewBox="0 0 512 512"><path fill="white" d="M504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zM273 369.9l135.5-135.5c9.4-9.4 9.4-24.6 0-33.9l-17-17c-9.4-9.4-24.6-9.4-33.9 0L256 285.1 154.4 183.5c-9.4-9.4-24.6-9.4-33.9 0l-17 17c-9.4 9.4-9.4 24.6 0 33.9L239 369.9c9.4 9.4 24.6 9.4 34 0z"></path></svg>'
        document.querySelector('#container').append(pr);

    }
 
    // add_project("background-color: blue; left: 80px; top: 80px;");
    // add_project('');
    // add_project("background-color: greenyellow; left: 180px; top: 60px;")

    document.querySelectorAll('.chevron').forEach(function(rot){
        rot.addEventListener('click',undress);
        rot.addEventListener('mouseup',(e)=>{
            e.stopPropagation();
        });
        rot.addEventListener('mousedown',(e)=>{
            e.stopPropagation();
        });
        rot.addEventListener('mousemove',(e)=>{
            e.stopPropagation();
        });
    })

    document.querySelectorAll('.circle').forEach(function(dragElement){
        //dragElement.onmouseover=mo;
        //dragElement.onmouseout=mout;
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
