// On encapsule la logique dans une fonction pour pouvoir l'appeler quand on veut
function initializeProjectHoverEffects() {
    // On sélectionne à nouveau les boîtes de projet, au cas où elles auraient été ajoutées dynamiquement
    const projetBoxes = document.querySelectorAll('.projetBox'); 

    // Détecte si l'appareil est tactile
    const isTouchDevice = () => {
        return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    }

     if (isTouchDevice()) {
         // Logique pour les appareils tactiles (téléphones, tablettes)
         projetBoxes.forEach(box => {
             box.addEventListener('click', function () {
                 // Si on clique sur une boîte déjà active, on la désactive
                 // Sinon, on désactive les autres et on active celle-ci
                 const wasActive = this.classList.contains('active');
                 // Important : on ne désactive que les boîtes de la même grille
                 this.closest('.projetsGrid').querySelectorAll('.projetBox').forEach(pb => pb.classList.remove('active'));
                 if (!wasActive) {
                     this.classList.add('active');
                 }
             });
         });
     } else {
         // Logique pour les ordinateurs de bureau (souris)
         projetBoxes.forEach(box => {
             box.addEventListener('mouseover', () => box.classList.add('active'));
             box.addEventListener('mouseout', () => box.classList.remove('active'));
         });
     }
}

// On exécute une première fois au cas où il y aurait du contenu statique
document.addEventListener('DOMContentLoaded', initializeProjectHoverEffects);