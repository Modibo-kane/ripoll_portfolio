document.addEventListener("DOMContentLoaded", ()=>{
    const faBar = document.getElementById('faBar');
    const mobileMenu = document.getElementById('mobile-menu');
    const sortir= document.getElementById('out')
    const liens = document.querySelectorAll('.px-4')

    faBar.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
    });
    
    liens.forEach(lien => {
          lien.addEventListener('click', ()=>{
            mobileMenu.classList.toggle('open');
            
        })
    });

    sortir.addEventListener('click', ()=>{
        mobileMenu.classList.toggle('open');
        
    })


    // pour le contacte
    const contactCont= document.getElementById("contactCont") // element à faire apparaître et element2 pour sortir
    const sortirContact = document.getElementById('fermeContact') // element1 pour sortir
    const talks = document.querySelectorAll('.talk') // déclencheurs

    const body = document.body;

    talks.forEach(talk => {
      talk.addEventListener('click', (e) => {
        e.stopPropagation();
        body.classList.add("no-scroll");
        contactCont.classList.add("open")
      });
      
    });

    sortirContact.addEventListener('click', () => {
      mobileMenu.classList.remove('open')
      contactCont.classList.remove("open")
      body.classList.add("no-scroll");
    });

  })