function run_animation(){
    document.querySelector('#logo').style.animationPlayState='running';
    setTimeout(function(){
        document.querySelector('#logo').style.zIndex=-1;

        document.querySelector('.modal').style.animationPlayState='running';
        setTimeout(function(){
            document.querySelector('.modal').style.zIndex=-2;
            //document.querySelector('.modal').remove();
        },1000*99/100);
        
    },3000*.99)//<=This number should be change to loading time plus little in future.
}