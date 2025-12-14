 

document.addEventListener("DOMContentLoaded", () => {
    
    const downloadTrigger = document.getElementById('downloadTrigger'); // declencheur de l'apparition du menu
    const downloadMenu = document.getElementById('downloadMenu'); // la menu
    const downloadSortir = document.getElementById('downloadSortir')  // sortir 

    const body = document.body;

    // 1. Fonction pour ouvrir/fermer le menu
    downloadTrigger.addEventListener('click', (e) => {
        // Empêche le clic de se propager au document
        e.stopPropagation();
    
        // Bascule (toggle) la classe 'show'
        downloadMenu.classList.toggle('show');
        body.classList.add("no-scroll");
    });

    // 2. Fonction pour fermer le menu si l'utilisateur clique n'importe où ailleurs
    downloadSortir.addEventListener('click', (e) => {
        // Vérifie si le menu est visible et si le clic n'est pas sur le menu lui-même ni sur le bouton
            downloadMenu.classList.remove('show');
            body.classList.add("no-scroll");
        
    });

    // --- NOUVEAU : Logique pour forcer le téléchargement ---

    function setupDownloadLinks() {
          // Sélectionnez tous les liens de téléchargement par leur classe
          const downloadOptions = document.querySelectorAll('.download-option');

          downloadOptions.forEach(link => {
              link.addEventListener('click', function(e) {
                  // Empêche le comportement par défaut du lien (ouvrir dans un nouvel onglet)
                  e.preventDefault(); 
                  
                  // On récupère le chemin du fichier depuis l'attribut href du lien cliqué
                  const fileUrl = this.getAttribute('href'); 
                  
                  // On détermine le nom de fichier suggéré pour le téléchargement
                  let fileName = '';
                  
                  // Si c'est un PDF
                  if (fileUrl.endsWith('.pdf')) {
                      fileName = 'Ripoll_Darcia_CV_PDF.pdf';
                  // Si c'est un JPG
                  } else if (fileUrl.endsWith('.jpg')) {
                      fileName = 'Ripoll_Darcia_CV_Image.jpg';
                  // Si c'est un DOCX
                  } else if (fileUrl.endsWith('.docx')) {
                      fileName = 'Ripoll_Darcia_CV_Word.docx';
                  } else {
                      // Nom de secours
                      fileName = 'download.file';
                  }
                  
                  // --- Cœur de la méthode de téléchargement forcé ---
                  
                  // 1. Créer un nouvel élément <a> temporaire
                  const tempLink = document.createElement('a');
                  
                  // 2. Définir le chemin du fichier
                  tempLink.href = fileUrl; 
                  
                  // 3. Ajouter l'attribut download avec le nom désiré
                  // C'est cette création dynamique qui est souvent plus efficace que dans le HTML statique
                  tempLink.setAttribute('download', fileName); 
                  
                  // 4. Cacher le lien temporaire et l'ajouter au corps du document
                  tempLink.style.display = 'none';
                  document.body.appendChild(tempLink);
                  
                  // 5. Simuler un clic sur ce lien
                  tempLink.click();
                  
                  // 6. Nettoyage : supprimer le lien temporaire
                  document.body.removeChild(tempLink);
                  
                  // Optionnel : Fermer le menu après le clic
                  document.getElementById('downloadMenu').classList.remove('show');
              });
          });
      }

      setupDownloadLinks();
});