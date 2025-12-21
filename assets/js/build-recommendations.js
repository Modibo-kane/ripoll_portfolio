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

    loadJsonData('_data/recommendations.json', recommendations => {
        const recommendationsGrid = document.getElementById('recommendations-grid');
        if (recommendations && recommendationsGrid) {
            recommendations.forEach(rec => {
                const linkWrapper = document.createElement('a');
                linkWrapper.href = rec.affiliateUrl;
                linkWrapper.target = '_blank';
                linkWrapper.rel = 'noopener noreferrer';
                linkWrapper.className = 'recommendation-card-link';
                linkWrapper.style.textDecoration = 'none'; 

                const recommendationBox = document.createElement('div');
                recommendationBox.className = 'skillBox';

                recommendationBox.innerHTML = `
                    <img src="${rec.imageUrl}" class="xd" alt="Logo ${rec.name}">
                    <h3 class="skillName">${rec.name}</h3>
                    <p class="recommendation-description">${rec.description}</p>
                    <span class="recommendation-button talk">Voir l'outil <i class="fa-solid fa-angle-right"></i></span>
                `;
                
                linkWrapper.appendChild(recommendationBox);
                recommendationsGrid.appendChild(linkWrapper);
            });
        }
    });
});
