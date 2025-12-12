window.addEventListener("load", ()=>{
    const faBar = document.getElementById('faBar');
    const mobileMenu = document.getElementById('mobile-menu');
    const sortir= document.getElementById('out')
    faBar.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
    });
    sortir.addEventListener('click', ()=>{
        mobileMenu.classList.toggle('open');
    })
})