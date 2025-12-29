document.addEventListener('DOMContentLoaded', () => {
    const loadJsonData = async (url, callback) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Erreur de chargement du fichier ${url}: ${response.statusText}`);
            }
            const data = await response.json();
            callback(data);
        } catch (error) {
            console.error(error);
        }
    };

    const updateTextContent = (elementId, text) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = text;
        }
    };

    const updateHtmlContent = (elementId, html) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = html;
        }
    };

    const updateImageSrc = (elementId, src) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.src = src;
        }
    };

    const updateLinkHref = (elementId, href) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.href = href;
        }
    };

    loadJsonData('_data/home.json', data => {
        updateTextContent('brand-name-desktop', data.brand_name);
        updateTextContent('brand-name-mobile', data.brand_name);

        // Mise à jour de la section Accueil
        updateTextContent('accueilTitrePrincipale', data.main_title);
        updateTextContent('tagline', data.tagline);
        updateHtmlContent('accueilDescription', data.home_description);
        updateTextContent('labelNom', data.full_name);
        updateTextContent('labelEmail', data.email);
        updateTextContent('labelNumrero', data.phone);
        updateTextContent('labelRegion', data.region);
        updateImageSrc('profile-image', data.profile_image);
        updateLinkHref('downloadPDF', data.cv_pdf);
        updateLinkHref('downloadJPG', data.cv_jpg);
    });

    loadJsonData('_data/navigation.json', data => {
        const navLinksDesktop = document.getElementById('nav-links-desktop');
        const navLinksMobile = document.getElementById('nav-links-responsive-inner');

        if (data.links && navLinksDesktop && navLinksMobile) {
            data.links.forEach(link => {
                // Création des liens pour le bureau
                const aDesktop = document.createElement('a');
                aDesktop.className = 'px-4';
                aDesktop.href = link.url;
                aDesktop.textContent = link.text;
                navLinksDesktop.appendChild(aDesktop);

                // Création des liens pour le mobile
                const aMobile = document.createElement('a');
                aMobile.className = 'px-4 block py-2 text-lg'; // Ajout des classes pour le style et la fermeture
                aMobile.href = link.url;
                aMobile.innerHTML = `${link.text} <i class="fa-solid fa-angle-right"></i>`;
                // Insérer avant le dernier élément (le div .nav-action)
                navLinksMobile.insertBefore(aMobile, navLinksMobile.lastElementChild);
            });
        }

        updateTextContent('btn-contact-desktop', data.contact_text);
    });

    loadJsonData('_data/projects.json', data => {
        updateTextContent('projetTitrePrincipal', data.project_title);
        updateTextContent('project_subtitle', data.project_subtitle);
        updateHtmlContent('projetDescription', data.project_description);

        const projectContainer = document.getElementById('project');
        const projectButtonContainer = document.getElementById('btn-container-projet');

        if (data.project_categories && projectContainer && projectButtonContainer) {
            data.project_categories.forEach(category => {
                // Créer le titre de la catégorie
                const categoryTitle = document.createElement('h3');
                categoryTitle.className = 'projetBoxTitre';
                categoryTitle.textContent = category.title;

                // Créer le conteneur pour la grille d'images
                const scrollContainer = document.createElement('div');
                scrollContainer.className = 'mobile-scroll-container';
                const projectsGrid = document.createElement('div');
                projectsGrid.className = 'projetsGrid scroll-wrapper';

                // Remplir la grille avec les images du projet
                category.images.forEach(project => {
                    const projectBox = document.createElement('div');
                    projectBox.className = 'projetBox';
                    projectBox.innerHTML = `
                        <img src="${project.image}" alt="Image pour ${project.name}">
                        <div class="projetHoverContent">
                            <h4 class="projetName">${project.name}</h4>
                            <span class="projetButton talk">${project.button_text}</span>
                        </div>`;
                    projectsGrid.appendChild(projectBox);
                });

                scrollContainer.appendChild(projectsGrid);
                projectContainer.insertBefore(categoryTitle, projectButtonContainer);
                projectContainer.insertBefore(scrollContainer, projectButtonContainer);
            });

            // Une fois que tous les projets sont ajoutés au DOM,
            // on appelle la fonction qui attache les effets de survol.
            if (typeof initializeProjectHoverEffects === 'function') {
                initializeProjectHoverEffects();
            } 
        }
    });

    // Charge les services depuis le fichier JSON combiné
    loadJsonData('_data/services-combined.json', services => {
        const coreGrid = document.getElementById('core-services-grid');
        const partnerDigitalGrid = document.getElementById('partner-digital-grid');
        const partnerOtherGrid = document.getElementById('partner-other-grid');

        if (services) {
            // Fonction pour créer une carte de service
            const createServiceCard = (service) => {
                const serviceBox = document.createElement('div');
                serviceBox.className = 'serviceBox';
                serviceBox.innerHTML = `
                    <img src="${service.image}" alt="Image pour ${service.title}">
                    <div class="serviceHoverContent">
                        <h3 class="serviceName">${service.title}</h3>
                        <span class="serviceButton talk">${service.button_text || 'Demander ce service'}</span>
                    </div>`;
                return serviceBox;
            };

            services.forEach(service => {
                // Logique de tri basée sur la nouvelle configuration
                let category = service.category ? service.category.toLowerCase() : 'expertise';
                let subCategory = service.sub_category ? service.sub_category.toLowerCase() : '';

                // Compatibilité avec l'ancienne configuration (au cas où)
                if (category === 'partenaire_numerique') { category = 'partenaire'; subCategory = 'numérique'; }
                if (category === 'partenaire_autre') { category = 'partenaire'; subCategory = 'autre'; }
                
                if (category === 'partenaire') {
                    if (subCategory === 'autre' && partnerOtherGrid) {
                        partnerOtherGrid.appendChild(createServiceCard(service));
                    } else if (partnerDigitalGrid) {
                        partnerDigitalGrid.appendChild(createServiceCard(service));
                    }
                } else if (coreGrid) {
                    // Fallback: si c'est 'expertise' ou l'ancien tag 'partenaire' (au cas où), on met dans core ou on adapte
                    // Ici on assume que 'expertise' va dans core.
                    coreGrid.appendChild(createServiceCard(service));
                }
            });

            // Initialiser les effets de survol une fois tout chargé
            if (typeof initializeServiceHoverEffects === 'function') {
                initializeServiceHoverEffects();
            }
        }
    });

    loadJsonData('_data/service_section.json', data => {
        updateTextContent('serviceTitrePrincipale', data.service_title);
        updateTextContent('span-service', data.service_subtitle);
        updateHtmlContent('service-description', data.service_description);
        updateTextContent('core-services-desc', data.core_desc);
        
        updateTextContent('partner-main-title', data.partner_main_title);
        updateTextContent('partner-main-subtitle', data.partner_main_subtitle);
        updateHtmlContent('partner-main-desc', data.partner_main_desc);
        
        updateTextContent('partner-digital-title', data.partner_digital_title);
        updateTextContent('partner-digital-desc', data.partner_digital_desc);
        updateTextContent('partner-other-title', data.partner_other_title);
        updateTextContent('partner-other-desc', data.partner_other_desc);
    });

    loadJsonData('_data/skills.json', data => {
        const skillsGrid = document.getElementById('skills-grid');
        if (data.skills && skillsGrid) {
            data.skills.forEach(skill => {
                const skillBox = document.createElement('div');
                skillBox.className = 'skillBox';

                skillBox.innerHTML = `
                    <img src="${skill.image}" class="xd animate-fade-in-icon" alt="${skill.name}">
                    <h3 class="skillName">${skill.name}</h3>
                    <div class="progressBare">${skill.progress}</div>
                `;

                skillsGrid.appendChild(skillBox);
            });
        }

        updateTextContent('skill-title', data.skill_title);
        updateTextContent('span-skills', data.skill_subtitle);
        updateHtmlContent('skill-description', data.skill_description);
    });

    loadJsonData('_data/footer_contact.json', data => {
        updateTextContent('footer-brand-title', data.footer_title);
        updateTextContent('footer-tagline', data.footer_tagline);
        updateTextContent('footer-heading-social', data.social_title);
        updateTextContent('footer-heading-newsletter', data.newsletter_title);
        updateHtmlContent('footer-copyright', data.copyright);

        const newsletterInput = document.getElementById('newsletter-input');
        updateTextContent('made-with-love-link', data.made_with_text);
        updateLinkHref('made-with-love-link', data.made_with_url);

        if (newsletterInput) {
            newsletterInput.placeholder = data.newsletter_placeholder;
        }

        updateLinkHref('social-icon-twitter-footer', data.twitter_link);
        updateLinkHref('social-icon-linkedin-footer', data.linkedin_link);

        const footerLinksNav = document.getElementById('footer-links-nav');
        if (data.footer_links && footerLinksNav) {
            footerLinksNav.innerHTML = `<h4 class="footer-heading" id="footer-heading-nav">${data.nav_title}</h4>`;
            data.footer_links.forEach(link => {
                const a = document.createElement('a');
                a.href = link.url;
                a.className = 'footer-link';
                a.textContent = link.text;
                footerLinksNav.appendChild(a);
            });
        }
    });
});