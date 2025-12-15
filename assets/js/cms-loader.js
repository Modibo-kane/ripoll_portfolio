// URL vers le fichier JSON créé par Netlify CMS
const DATA_URL = '_data/homepage.json'; 

document.addEventListener('DOMContentLoaded', () => {
    // 1. Récupérer le fichier JSON
    fetch(DATA_URL)
        .then(response => {
            // Si le fichier n'existe pas encore (première visite sans contenu CMS), 
            // ou s'il y a une erreur, le statut ne sera pas OK (ex: 404).
            if (!response.ok) {
                console.warn('Fichier de données CMS non trouvé. Affichage du contenu HTML par défaut.');
                return null;
            }
            return response.json();
        })
        .then(data => {
            // Si les données ont été chargées avec succès
            if (data) {
                console.log('Données CMS chargées avec succès :', data);

                // Fonction utilitaire pour mettre à jour le contenu d'un élément
                const updateContent = (id, content, isHtml = false) => {
                    const element = document.getElementById(id);
                    if (element && content) {
                        if (isHtml) {
                            element.innerHTML = content;
                        } else {
                            element.textContent = content;
                        }
                    }
                };

                // Fonction utilitaire pour mettre à jour un attribut (src, href)
                const updateAttribute = (id, attribute, value) => {
                    const element = document.getElementById(id);
                    if (element && value) {
                        element[attribute] = value;
                    }
                };

                // --- Injection des données ---

                // Header
                updateContent('brand-name-desktop', data.brand_name);
                updateContent('brand-name-mobile', data.brand_name);

                // Section Accueil
                updateAttribute('profile-image', 'src', data.profile_image);
                updateContent('accueilTitrePrincipale', data.main_title);
                updateContent('tagline', data.tagline);
                updateContent('accueilDescription', data.home_description);
                updateContent('labelNom', data.full_name);
                updateContent('labelEmail', data.email);
                updateContent('labelNumrero', data.phone);
                updateContent('labelRegion', data.region);
                updateAttribute('downloadPDF', 'href', data.cv_pdf);
                updateAttribute('downloadJPG', 'href', data.cv_jpg);

                // Section Projets
                updateContent('projetTitrePrincipal', data.project_title);
                updateContent('span-projets', data.project_subtitle);
                updateContent('projetDescription', data.project_description, true);
                updateContent('projetTitreSecondaire1', data.client1_title);
                updateContent('projetTitreSecondaireMarchand', data.client2_title);
                updateContent('projetTitreSecondaireDfa', data.client3_title);

                // Sections Services & Skills
                updateContent('serviceTitrePrincipale', data.service_title);
                updateContent('span-service', data.service_subtitle);
                updateContent('skill-title', data.skill_title);
                updateContent('span-skills', data.skill_subtitle);
                updateContent('skill-description', data.skill_description, true);

                // Footer & Liens Sociaux
                updateAttribute('social-icon-twitter-footer', 'href', data.twitter_link);
                updateAttribute('social-icon-linkedin-footer', 'href', data.linkedin_link);
                updateAttribute('social-icon-linkedin', 'href', data.linkedin_link);
                updateAttribute('social-icon-twitter', 'href', data.twitter_link);
                updateAttribute('social-icon-email', 'href', data.footer_email);
                updateContent('footer-brand-title', data.footer_title);
                updateContent('footer-tagline', data.footer_tagline);
                updateContent('footer-copyright', data.copyright, true);

                // Page Contact
                updateContent('whatsapp-heading', data.whatsapp_title);
                updateContent('whatsapp-p', data.whatsapp_description);
                updateContent('reseaux-h1', data.contact_title);
                updateContent('reseaux-p', data.contact_description, true);
            }
        })
        .catch(error => console.error('Erreur lors du traitement des données JSON :', error));
});