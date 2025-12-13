document.addEventListener('DOMContentLoaded', function () {
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
                projetBoxes.forEach(pb => pb.classList.remove('active'));
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
});