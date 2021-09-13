document.addEventListener('DOMContentLoaded',()=>{
    let logo = document.querySelector('#starter_logo');
    let container = document.querySelector('.container');

    container.style.transform = 'scale(1)';
    logo.style.transform = 'translateY(-120%)';
    setTimeout(()=>{
        logo.remove()
    }, 3000)
})