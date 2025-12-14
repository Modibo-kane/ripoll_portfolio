document.addEventListener('DOMContentLoaded', ()=>{
    const form = document.getElementById('contactForm');
    const whatsappLink = document.getElementById('whatsappLink')
    
    const WHATSAPP_NUMBER = '221706425477';

    form.addEventListener("submit", (e)=>{
        e.preventDefault();


        const nom = document.getElementById('name').value.trim()
        const message = document.getElementById('message').value.trim()
        
        // let fullMessage = `Nom: ${nom}\n Message: ${message}`
        let fullMessage = 
        `Nom:  ${nom}\n` +  // Double saut de ligne ici (\n\n) est plus fiable
        `Message: \n ${message}`;

        const encodedMessage = encodeURIComponent(fullMessage)

        const finalLink = `http://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`


        whatsappLink.href = finalLink;
        let lien = whatsappLink.href

        window.open(lien, '_blank')
        // whatsappLink.textContent= `Message pour ${nom} près à être envoyé, Cliquez ici.`
        
    })
})