document.addEventListener('DOMContentLoaded', () => {
    // URLs vers les fichiers JSON créés par Decap CMS
    const DATA_URLS = {
        home: '_data/home.json',
        projects: '_data/projects.json',
        services_skills: '_data/services_skills.json',
        footer_contact: '_data/footer_contact.json'
    };

    // Fonction pour récupérer un fichier JSON
    const fetchData = (url) => fetch(url).then(response => {
        if (!response.ok) {
            console.warn(`Fichier de données CMS non trouvé à ${url}.`);
            return {}; // Retourne un objet vide en cas d'erreur pour ne pas bloquer Promise.all
        }
        return response.json();
    }).catch(error => {
        console.error(`Erreur lors du chargement de ${url}:`, error);
        return {};
    });

    // Récupérer toutes les données en parallèle
    Promise.all([
        fetchData(DATA_URLS.home),
        fetchData(DATA_URLS.projects),
        fetchData(DATA_URLS.services_skills),
        fetchData(DATA_URLS.footer_contact)
    ]).then(([homeData, projectsData, servicesSkillsData, footerContactData]) => {
        // Fusionner toutes les données en un seul objet
        const data = { ...homeData, ...projectsData, ...servicesSkillsData, ...footerContactData };

        // Si on a au moins quelques données, on met à jour la page
        if (Object.keys(data).length > 0) {
            console.log('Données CMS combinées chargées avec succès :', data);
            injectData(data);
        }
    });

    // Fonction principale pour injecter les données dans le DOM
    function injectData(data) {
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
        updateContent('project_subtitle', data.project_subtitle);
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
});