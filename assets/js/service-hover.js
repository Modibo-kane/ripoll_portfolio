// On encapsule la logique dans une fonction pour pouvoir l'appeler quand on veut
function initializeServiceHoverEffects() {
    // On sélectionne les boîtes de service, qui ont été ajoutées dynamiquement
    const serviceBoxes = document.querySelectorAll('.serviceBox');

    // Détecte si l'appareil est tactile
    const isTouchDevice = () => {
        return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    }

    if (isTouchDevice()) {
        // Logique pour les appareils tactiles (téléphones, tablettes)
        serviceBoxes.forEach(box => {
            box.addEventListener('click', function () {
                // Si on clique sur une boîte déjà active, on la désactive
                // Sinon, on désactive les autres et on active celle-ci
                const wasActive = this.classList.contains('active');

                // Désactive toutes les autres boîtes actives dans la même grille
                this.parentElement.querySelectorAll('.serviceBox.active').forEach(sb => sb.classList.remove('active'));
                if (!wasActive) {
                    this.classList.add('active');
                }
            });
        });
    } else {
        // Logique pour les ordinateurs de bureau (souris)
        serviceBoxes.forEach(box => {
            box.addEventListener('mouseover', () => box.classList.add('active'));
            box.addEventListener('mouseout', () => box.classList.remove('active'));
        });
    }
}


document.addEventListener("DOMContentLoaded", initializeServiceHoverEffects)