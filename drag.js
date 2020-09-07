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
res=''
req=new XMLHttpRequest();
req.open('GET','data.json',false);
req.onreadystatechange=()=>{
    res=JSON.parse(req.responseText);
}
req.send(null);
function htmlise(type,data){
    if (type=='icon'){
        return `<img src="${data}" class="icon">`;
    };
    if (type=='image'){
        return `<p>${data[0]}</p><div class='placeholder' data-url="${data[1]}"><img src='graphics/load.svg' width='40px'></div>`;
    };
    if (type=='title'){
        return `<h2>${data}</h2>`;
    };
    if (type=='text'){
        let text='';
        for (el in data){
            text+=`<p>${data[el]}</p>`;
            console.log(text);
        };
        return text;
    };
};
function f1(x){
    return ((1-4*x*x)*2*x+x);
}
function create_project_circles(){
    for (c in res){
        subcircles='';
        for (sc in res[c]['subcircles']){
            scdata='<div class="modal2"></div><img width="40px" class="resize invisible" src="graphics/resize.svg">';
            for (el in res[c]['subcircles'][sc]){
                scdata+=htmlise(el,res[c]['subcircles'][sc][el]);
            };
            let r=Math.round(Math.random()*256);
            let g=Math.round(Math.random()*256);
            if (r>150&&g>150){
                var b=Math.round(Math.random()*120);
            }else{
                var b=Math.round(Math.random()*256);
            }
            a=2*Math.PI*Math.random();
            r=10+2.5*Math.random();
            subcircles+=`<div class='circle' data-loaded="0" style="left: ${Math.cos(a)*r}vw; top:${Math.sin(a)*r}vh;">
            <div class="ovh" style=" background-color: rgb(${r}, ${g}, ${b});">
            ${scdata}
            </div>
            </div>`;
        };
        circles=`<div class="circle" data-loaded="1" data-zi="10" style="left: ${Math.random()*93}vw; top: ${Math.random()*90}vh;">
        <div class='ovv invisible'>
            <div class="subcircles">
            ${subcircles}
            </div>
        </div>
        <div class="ovh" style="background-color: rgb(${Math.round(Math.random()*256)}, ${Math.round(Math.random()*256)}, ${Math.round(Math.random()*256)});">
            <div class="modal2"></div>
            <img src="${res[c]["icon"]}" class="icon">
            <h2>${res[c]["title"]}</h2>
            ${htmlise('text',res[c]['text'])}
            <svg class="chevron" width="30px" transform="rotate(-90)" aria-hidden="true" focusable="false" viewBox="0 0 512 512"><path fill="white" d="M504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zM273 369.9l135.5-135.5c9.4-9.4 9.4-24.6 0-33.9l-17-17c-9.4-9.4-24.6-9.4-33.9 0L256 285.1 154.4 183.5c-9.4-9.4-24.6-9.4-33.9 0l-17 17c-9.4 9.4-9.4 24.6 0 33.9L239 369.9c9.4 9.4 24.6 9.4 34 0z"></path></svg>
        </div>
        </div>`;
        console.log(circles);
        document.querySelector('#container').innerHTML+=circles;
        
    }
};

function load_images(c){
    c.querySelectorAll('.placeholder').forEach(el=>{
        let image = document.createElement('img');
        image.classList.toggle('invisible');
        image.classList.toggle('pht');
        image.src = el.dataset.url;
        // assign and onload event handler
        image.addEventListener('load', (event) => {
            el.remove();
            image.classList.toggle('invisible');
            console.log('The image has been loaded');
        });
        // add logo to the document
        el.parentNode.insertBefore(image, el.nextSibling);
    })
};


document.addEventListener('DOMContentLoaded',()=>{
    create_project_circles();
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
    document.querySelectorAll('.resize').forEach(function(resz){
        resz.addEventListener('mouseup',(e)=>{
            resize_mode=false;
            console.log('resize mode: false')
            is_active=false;
            //c.style.zIndex='initial';
            e.stopPropagation();
        });
        resz.addEventListener('mousedown',(e)=>{
            resize_mode=true;
            md(e);
            e.stopPropagation();
        });
        resz.addEventListener('mousemove',(e)=>{
            e.stopPropagation();
        });
    })

    run_animation();

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
    resize_mode=false;
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
            //c.style.zIndex='initial'
            if(resize_mode){
                c=e.target.parentElement.parentElement;
                console.log('c remains same')
            }else{
                c=this;
            }
            //c.style.zIndex='10';
            init_x=e.touches[0].clientX;
            init_y=e.touches[0].clientY;
        }else{
            dbg(`c: ${c}; mousedown`)
            //c.style.zIndex='initial'
            if(resize_mode){
                c=e.target.parentElement.parentElement;
                console.log('c remains same')
            }else{
                c=this;
            }
            //c.style.zIndex='10';
            init_x=e.clientX;
            init_y=e.clientY;
        }

        is_active=true;
        
        

        if (c.id[0]=='c'){ //if CHILD NODE
            c.parentElement.parentElement.parentElement.dataset.zi++;
            c.style.zIndex=c.parentElement.parentElement.parentElement.dataset.zi;
            child_move=true;
            b_line=document.querySelector(`#l${c.dataset.p}-${c.dataset.before}-${c.dataset.n}`);
            a_line=document.querySelector(`#l${c.dataset.p}-${c.dataset.n}-${c.dataset.after}`);

        }else{ //PARENT NODE
            c.dataset.zi++;
            c.style.zIndex=c.dataset.zi;
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

            

            if(resize_mode){
                c.style.width=`${c.offsetWidth-8+shift_x}px`;
                c.style.height=`${c.offsetHeight-8+shift_y}px`;
            }else{
                r_left=100 * (c.offsetLeft + shift_x) / window.innerWidth;
                r_top=100 * (c.offsetTop + shift_y) / window.innerHeight;

                var v = c.getBoundingClientRect();
                // these are relative to the viewport, i.e. the window
                var top = 100*(v.top+shift_y)/window.innerHeight;
                var left = 100*(v.left+shift_x)/window.innerWidth;
                if (valid(top,100*c.offsetHeight/window.innerHeight, shift_y)){c.style.top=`${(r_top)}vh`;};
                if(valid(left,100*c.offsetWidth/window.innerWidth,shift_x)){c.style.left=`${(r_left)}vw`;};
            }
            

            if (child_move){
                if(!resize_mode){
                b_line.setAttribute('x2',100*c.offsetLeft/window.innerWidth);
                b_line.setAttribute('y2',100*c.offsetTop/window.innerHeight);

                a_line.setAttribute('x1',100*c.offsetLeft/window.innerWidth);
                a_line.setAttribute('y1',100*c.offsetTop/window.innerHeight);}
                
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
        resize_mode=false;
        console.log('resize mode false from outside')
        if (traj_length<15){
            
            
            if (c.dataset.loaded=='0'){
                load_images(c);
                c.dataset.loaded='1';
            }
            if(child_move){
                if(c.classList.contains('open')){
                    c.dataset.def_w=c.offsetWidth;
                    c.dataset.def_h=c.offsetHeight;
                    c.style.width='';
                    c.style.height=''; 
                }else{
                    c.style.height=c.dataset.def_h;
                    c.style.width=c.dataset.def_w;
                };
                c.querySelector('.resize').classList.toggle('invisible');};
            //c.style.zIndex='initial';
            c.classList.toggle('open');
        }
        traj_length=0;
        if (e.type==='touchend'){
            //c.style.zIndex='initial';
        }
        e.stopPropagation();
    }



    //MAKING ELEMENTS DRAGGABLE
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

    //DISABLING DRAG & DROP
    document.querySelectorAll('*').forEach(function(Element){
        Element.ondragstart=()=>{
            return false;
        };
        Element.ondrop=()=>{
            return false;
        };
    })
})
