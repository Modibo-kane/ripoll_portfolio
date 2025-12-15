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
                aMobile.className = 'px-4';
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
                            <a href="${project.button_link}" class="projetButton">${project.button_text}</a>
                        </div>`;
                    projectsGrid.appendChild(projectBox);
                });

                scrollContainer.appendChild(projectsGrid);
                projectContainer.insertBefore(categoryTitle, projectButtonContainer);
                projectContainer.insertBefore(scrollContainer, projectButtonContainer);
            });
        }
    });

    loadJsonData('_data/services_skills.json', data => {
        const serviceGrid = document.getElementById('service-grid');
        if (data.services && serviceGrid) {
            data.services.forEach(service => {
                const serviceBox = document.createElement('div');
                serviceBox.className = 'serviceBox';

                serviceBox.innerHTML = `
                    <div class="serviceImage">
                        <img src="${service.image}" alt="Image pour ${service.title}">
                    </div>
                    <div class="serviceLeft">
                        <h3 class="serviceName"><span>${service.title}</span></h3>
                    </div>
                `;

                serviceGrid.appendChild(serviceBox);
            });
        }

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

        updateTextContent('serviceTitrePrincipale', data.service_title);
        updateTextContent('span-service', data.service_subtitle);
        updateTextContent('skill-title', data.skill_title);
        updateTextContent('span-skills', data.skill_subtitle);
        updateHtmlContent('skill-description', data.skill_description);
    });
});