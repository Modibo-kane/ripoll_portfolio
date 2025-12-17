document.addEventListener("DOMContentLoaded", ()=>{
    const faBar = document.getElementById('faBar');
    const mobileMenu = document.getElementById('mobile-menu');
    const sortir= document.getElementById('out')

    faBar.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
    });
    
    // Utilisation de la délégation d'événements pour gérer les clics sur les liens dynamiques
    mobileMenu.addEventListener('click', (e) => {
      // On vérifie si l'élément cliqué (e.target) a la classe 'px-4'
      if (e.target.classList.contains('px-4')) {
        mobileMenu.classList.remove('open');
      }
    });

    sortir.addEventListener('click', ()=>{
        mobileMenu.classList.toggle('open');
        
    })


    // pour le contacte
    const contactCont= document.getElementById("contactCont") // element à faire apparaître et element2 pour sortir
    const sortirContact = document.getElementById('fermeContact') // element1 pour sortir
    const messageTextarea = document.getElementById('message'); // Le textarea du formulaire
    const body = document.body;

    // Utilisation de la délégation d'événements pour tous les boutons .talk
    body.addEventListener('click', (e) => {
      const clickedElement = e.target;

      // On vérifie si l'élément cliqué a la classe 'talk'
      if (clickedElement.classList.contains('talk')) {
        e.preventDefault(); // Empêche le comportement par défaut (ex: navigation)
        e.stopPropagation(); // Empêche le clic de se propager

        const serviceCard = clickedElement.closest('.serviceBox');
        const projectCard = clickedElement.closest('.projetBox');
        let prefilledMessage = "";

        if (serviceCard) {
          const serviceName = serviceCard.querySelector('.serviceName').textContent;
          prefilledMessage = `Bonjour, je suis intéressé(e) par votre service "${serviceName}" et j'aimerais en savoir plus.`;
        } else if (projectCard) {
          const projectName = projectCard.querySelector('.projetName').textContent;
          prefilledMessage = `Bonjour, j'ai beaucoup aimé votre projet "${projectName}" et j'aimerais discuter d'un projet similaire.`;
        }

        // Remplir le textarea et ouvrir la modale
        if(messageTextarea) messageTextarea.value = prefilledMessage;
        body.classList.add("no-scroll");
        contactCont.classList.add("open");
      }
    });

    sortirContact.addEventListener('click', () => {
      contactCont.classList.remove("open");
      body.classList.remove("no-scroll");
    });

  })