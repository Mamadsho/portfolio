function undress(e){
    c=this.parentElement.parentElement;
    chev=c.querySelector('.chevron');
    if (chev.getAttribute('transform')=='rotate(-90)'){
        chev.setAttribute('transform','rotate(90)');
        c.querySelector('.ovv').classList.toggle('invisible');
        document.querySelector(`#g-${c.dataset.n}`).classList.toggle('invisible');
    }else{
        chev.setAttribute('transform','rotate(-90)');
        c.querySelector('.ovv').classList.toggle('invisible');
        document.querySelector(`#g-${c.dataset.n}`).classList.toggle('invisible');
    }
    e.stopPropagation();
};

document.addEventListener('DOMContentLoaded',()=>{

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

    run_animation();

    //DRAW THE SVG's

    //POINT TO START 
    //document.querySelectorAll('#container>.circle')[1].querySelectorAll('.ovv>.subcircles>.circle')[0].offsetLeft/window.innerWidth


    function draw_line(p,el1,el2){
        try {
            let gr=document.querySelector(`#g-${p.dataset.n}`)
            l1=100*el1.offsetLeft/window.innerWidth;
            t1=100*el1.offsetTop/window.innerHeight;
            l2=100*el2.offsetLeft/window.innerWidth;
            t2=100*el2.offsetTop/window.innerHeight;

            let par=p.dataset.n;
            if (!isNaN(el1.dataset.n)){
                e1=el1.dataset.n;
            }else{
                console.log(el1.dataset.n);
                e1=0;
            };
            if (!isNaN(el2.dataset.n)){
                e2=el2.dataset.n;
            }else{
                console.log(el2.dataset.n);
                e2=0;
            };
            svg=`<line id='l${par}-${e1}-${e2}' x1='${l1}' y1='${t1}' x2='${l2}' y2='${t2}'/>`;
            gr.innerHTML+=svg;
        } catch (error) {
            console.log(error);
        }
    };

    var ider=0;
    gl=document.querySelector('#gl');
    document.querySelectorAll('#container>.circle').forEach(par=>{
        ider++;
        par.setAttribute('id',`p${ider}`);
        par.dataset.n=ider;
        cl=100*par.offsetLeft/window.innerWidth;
        ct=100*par.offsetTop/window.innerHeight;
        gl.innerHTML+=`<g id='g-${par.dataset.n}' transform='translate(${cl},${ct})' class='invisible'></g>`;
        sider=0;
        cur=par.querySelector('.modal2');
        par.querySelectorAll('.ovv>.subcircles>.circle').forEach(scir=>{
            sider++;
            scir.setAttribute('id',`c${par.dataset.n}-${sider}`);
            scir.dataset.p=par.dataset.n;
            scir.dataset.n=sider;
            if(sider==1){
                scir.dataset.before=0;
                par.dataset.after=sider;
            }else{
                scir.dataset.before=cur.dataset.n;
                cur.dataset.after=sider;};
            
            draw_line(par,cur,scir);
            cur=scir;            
        })
        try{cur.dataset.after=0;}catch{console.log('notink')};
        draw_line(par,cur,par.querySelector('.modal2'));
    });





    function dbg(str){
        document.querySelector('#debug').innerHTML=str;
    }
    c= document.querySelectorAll('.circle')[0];
    //c={};
    is_active=false;
    init_x=null;
    shift_x=null;
    init_y=null;
    shift_y=null;
    traj_length=0;

    child_move=false;
    b_line={};
    a_line={};
    g_obj={};


    function md (e){
        if (e.type==='touchstart'){
            dbg(`c: ${c}; touchstart`)
            c.style.zIndex='initial'
            c=this;
            c.style.zIndex='10';
            init_x=e.touches[0].clientX;
            init_y=e.touches[0].clientY;
        }else{
            dbg(`c: ${c}; mousedown`)
            c.style.zIndex='initial'
            c=this;
            c.style.zIndex='10';
            init_x=e.clientX;
            init_y=e.clientY;
        }

        is_active=true;

        if (c.id[0]=='c'){ //if CHILD NODE
            console.log('is child');
            child_move=true;
            b_line=document.querySelector(`#l${c.dataset.p}-${c.dataset.before}-${c.dataset.n}`);
            a_line=document.querySelector(`#l${c.dataset.p}-${c.dataset.n}-${c.dataset.after}`);

        }else{ //PARENT NODE
            console.log('is parent');
            child_move=false;
            g_obj=document.querySelector(`#g-${c.dataset.n}`);
        };
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

            if (valid(top,100*c.offsetHeight/window.innerHeight, shift_y)){c.style.top=`${(r_top)}vh`;};
            if(valid(left,100*c.offsetWidth/window.innerWidth,shift_x)){c.style.left=`${(r_left)}vw`;};
            

            if (child_move){
                b_line.setAttribute('x2',100*c.offsetLeft/window.innerWidth);
                b_line.setAttribute('y2',100*c.offsetTop/window.innerHeight);

                a_line.setAttribute('x1',100*c.offsetLeft/window.innerWidth);
                a_line.setAttribute('y1',100*c.offsetTop/window.innerHeight);
                
            }else{
                g_obj.setAttribute('transform',`translate(${100*c.offsetLeft/window.innerWidth},${100*c.offsetTop/window.innerHeight})`);
            };
            

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
            c.style.zIndex='initial';
        }
        traj_length=0;
        if (e.type==='touchend'){
            c.style.zIndex='initial';
        }
        e.stopPropagation();
    }



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
