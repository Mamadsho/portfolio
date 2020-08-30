document.addEventListener('DOMContentLoaded',()=>{
    function toggle_open(circle){
        console.log('toggle called on:',circle)
        if (circle.style.width=='200px'){
            console.log('1');
            circle.style.width=``;
            circle.style.height=``;
        }else{
            console.log('2');
            circle.style.width='200px';
            circle.style.height='320px';
        }
        console.log(circle.style.width);
        console.log(circle.style.height);
        
    }

    function dbg(str){
        document.querySelector('#debug').innerHTML=str;
    }
    document.querySelector('#logo').style.animationPlayState='running';
    setTimeout(function(){
        document.querySelector('#logo').style.zIndex=-1;
        
        document.querySelector('.modal').style.animationPlayState='running';
        setTimeout(function(){
            document.querySelector('.modal').remove();
        },1000);
        
    },3000*.99)//<=This number should be change to loading time plus little in future.
    console.log('#5');
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
            toggle_open(c);
        }
        traj_length=0;
        if (e.type==='touchend'){

            c.style.zIndex='initial';
        }
        //console.log('c deactivated', is_active)
    }

    //ADDING PROJECT ELEMENTS:
    function add_project(stl){
        const pr=document.createElement('div');
        pr.className='circle';
        pr.style=stl;
        pr.innerHTML='<div class="modal2"></div><img src="gesture-24px.svg" style="width:35px; position:relative; left:15px; top:15px"> <h2 style="position: relative; color:white; left: 20px; top:5px;">ProjectTitle</h2><p style="position: relative; color:white; left: 10px">Project Definition</p>'
        document.querySelector('#container').append(pr);

    }
    console.log('#6');
    add_project("background-color: blue; left: 80px; top: 80px;");
    add_project('');
    add_project("background-color: greenyellow; left: 180px; top: 60px;")
    
    console.log('#7');
    document.querySelectorAll('.circle').forEach(function(dragElement){
        dragElement.onmouseover=mo;
        dragElement.onmouseout=mout;
        dragElement.onmousedown=md;
        

        dragElement.ontouchstart=md;
        dragElement.ontouchend=mu;
    });
    document.querySelector('#container').addEventListener('mouseleave',()=>{
        console.log('! mouseleave')
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
