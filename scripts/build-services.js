const fs = require('fs');
const path = require('path');

const servicesDir = path.join(__dirname, '..', '_data', 'services');
const outputFile = path.join(__dirname, '..', '_data', 'services-combined.json');

console.log('Starting services build...');

try {
    // Lire tous les noms de fichiers dans le dossier _data/services
    const serviceFiles = fs.readdirSync(servicesDir).filter(file => file.endsWith('.json'));

    const combinedServices = [];

    // Lire chaque fichier, parser le JSON et l'ajouter au tableau
    serviceFiles.forEach(file => {
        const filePath = path.join(servicesDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        combinedServices.push(JSON.parse(fileContent));
    });

    // Écrire le tableau combiné dans un nouveau fichier JSON
    fs.writeFileSync(outputFile, JSON.stringify(combinedServices, null, 2));

    console.log(`✅ Successfully combined ${combinedServices.length} services into ${outputFile}`);
} catch (error) {
    console.error('❌ Error during services build:', error);
    process.exit(1); // Quitte le script avec un code d'erreur
}