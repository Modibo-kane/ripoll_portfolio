document.addEventListener("DOMContentLoaded", ()=>{
    const faBar = document.getElementById('faBar');
    const mobileMenu = document.getElementById('mobile-menu');
    const sortir= document.getElementById('out')
    faBar.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
    });
    sortir.addEventListener('click', ()=>{
        mobileMenu.classList.toggle('open');
    })


    // pour le contacte
    const contactCont= document.getElementById("contactCont") // element à faire apparaître et element2 pour sortir
    const sortirContact = document.getElementById('fermeContact') // element1 pour sortir
    const talks = document.querySelectorAll('.talk') // déclencheurs

    talks.forEach(talk => {
      talk.addEventListener('click', () => contactCont.classList.add("open"));
    });

    sortirContact.addEventListener('click', () => contactCont.classList.remove("open"));

  })