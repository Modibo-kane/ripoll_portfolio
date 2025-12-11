<?php
// controllers/PageController.php

// 1. DÉFINITION DU ROUTAGE
$uri = $_GET['page'] ?? 'accueil'; 
$viewFile = '';
$page_title = '';
$active_section = null; // Nouvelle variable pour la section active sur la page d'accueil

switch ($uri) {
    case 'skills':
    case 'projects':
    case 'services':
        // Si l'URI est une section, on charge la page d'accueil
        $viewFile = 'accueil.view.php';
        $page_title = 'Accueil';
        // On définit la section active pour l'affichage conditionnel
        $active_section = $uri; 
        break;

    case 'accueil':
    case '':
        $viewFile = 'accueil.view.php';
        $page_title = 'Accueil';
        // Par défaut, aucune section active (ou vous pouvez mettre 'skills' si vous voulez qu'elle soit affichée par défaut)
        $active_section = null; 
        break;
        
    case 'a_propos':
        $viewFile = 'a_propos.view.php';
        $page_title = 'À Propos';
        break;
        
    // ... (Ajoutez les autres cas comme certificats, contact, etc.)
        
    case 'contact':
        $viewFile = 'contact.view.php'; // Assurez-vous d'avoir ce fichier de vue
        $page_title = 'Contact';
        break;

    default:
        http_response_code(404);
        $viewFile = 'file404.view.php';
        $page_title = '404';
        break;
}

// 2. LOGIQUE D'AFFICHAGE (LE TEMPLATING)

// a) Inclure le header
include ROOT_PATH . 'views/includes/header.php';

// b) Inclure la vue spécifique (le contenu central)
// On n'utilise plus $finalView = $viewFile ? $viewFile : $sectionView;
// On utilise simplement $viewFile qui est toujours défini
include ROOT_PATH . 'views/pages/'. $viewFile;

// c) Inclure le footer
include ROOT_PATH . 'views/includes/footer.php';
?>