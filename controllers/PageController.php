<?php
// controllers/PageController.php

// 1. DÉFINITION DU ROUTAGE
$uri = $_GET['page'] ?? 'accueil'; 
$viewFile = '';
$page_title = '';

switch ($uri) {
    case 'accueil':
        $viewFile = 'accueil.view.php';
        $page_title = 'Accueil';
        break;
    
    case '':
        $viewFile = 'accueil.view.php';
        $page_title = 'Accueil';
        break;
        
    case 'a_propos':
        $viewFile = 'a_propos.view.php';
        $page_title = 'À Propos';
        break;
        
    // ... (Ajoutez les autres cas comme certificats, contact, etc.)
        
    default:
        http_response_code(404);
        $viewFile = 'file404.view.php';
        $page_title = '404';
        break;
}

// 2. LOGIQUE D'AFFICHAGE (LE TEMPLATING)

// $page_title sera utilisée dans views/partials/header.php

// a) Inclure le header
include ROOT_PATH . 'views/includes/header.php';

// b) Inclure la vue spécifique (le contenu central)
include  ROOT_PATH . 'views/pages/'. $viewFile;

// c) Inclure le footer
include ROOT_PATH . 'views/includes/footer.php';
?>