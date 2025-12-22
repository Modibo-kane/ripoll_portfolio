const fs = require('fs').promises;
const path = require('path');

const servicesDir = path.join(__dirname, '..', '_data', 'services');
const outputFile = path.join(__dirname, '..', '_data', 'services-combined.json');

// console.log('Starting services build...');

(async () => {
    try {
        // Lire tous les noms de fichiers dans le dossier _data/services
        const files = await fs.readdir(servicesDir);
        const serviceFiles = files.filter(file => file.endsWith('.json'));

        // Lire chaque fichier, parser le JSON et l'ajouter au tableau
        const combinedServices = await Promise.all(serviceFiles.map(async file => {
            const filePath = path.join(servicesDir, file);
            const fileContent = await fs.readFile(filePath, 'utf8');
            return JSON.parse(fileContent);
        }));

        // Trier les services en fonction du champ "order"
        combinedServices.sort((a, b) => (a.order || 999) - (b.order || 999));

        // Écrire le tableau combiné dans un nouveau fichier JSON
        await fs.writeFile(outputFile, JSON.stringify(combinedServices, null, 2));

        console.log(`Successfully combined ${combinedServices.length} services into ${outputFile}`);
    } catch (error) {
        console.error('Error during services build:', error);
        process.exit(1); // Quitte le script avec un code d'erreur
    }
})();