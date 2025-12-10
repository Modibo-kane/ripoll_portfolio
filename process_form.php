<?php
// 1. CONFIGURATION
// ----------------------------------------------------
$recipient = "[L'EMAIL DE VOTRE AMI ICI]"; // Par exemple : contact@smm-manager.com
$redirect_to = "contact.php?status=success"; // Page de redirection après succès
$redirect_to_error = "contact.php?status=error"; // Page de redirection après erreur
// ----------------------------------------------------

// ----------------------------------------------------
// 2. VÉRIFICATION DE LA MÉTHODE ET DES DONNÉES
// ----------------------------------------------------
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    // Redirige si la requête n'est pas un POST (accès direct au script)
    header("Location: $redirect_to_error");
    exit;
}

// ----------------------------------------------------
// 3. NETTOYAGE DES DONNÉES (Sécurité et Validation de Base)
// ----------------------------------------------------
$name    = htmlspecialchars(trim($_POST['name'] ?? ''));
$email   = htmlspecialchars(trim($_POST['email'] ?? ''));
$subject = htmlspecialchars(trim($_POST['subject'] ?? ''));
$message = htmlspecialchars(trim($_POST['message'] ?? ''));

// Validation : S'assurer que tous les champs requis sont remplis
if (empty($name) || empty($email) || empty($subject) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header("Location: $redirect_to_error");
    exit;
}

// ----------------------------------------------------
// 4. CONSTRUCTION ET ENVOI DE L'EMAIL
// ----------------------------------------------------

// Le sujet que recevra Ripoll
$email_subject = "NOUVEAU MESSAGE PORTFOLIO : $subject";

// Le contenu de l'email
$email_content = "Nom: $name\n";
$email_content .= "Email: $email\n\n";
$email_content .= "Message:\n$message\n";

// Les Headers (Pour s'assurer que l'email arrive bien et indiquer l'expéditeur)
$email_headers = "From: $name <$email>\r\n";
$email_headers .= "Reply-To: $email\r\n";
$email_headers .= "MIME-Version: 1.0\r\n";
$email_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";


// Fonction PHP pour l'envoi
if (mail($recipient, $email_subject, $email_content, $email_headers)) {
    // Succès
    header("Location: $redirect_to");
    exit;
} else {
    // Échec de l'envoi par le serveur
    header("Location: $redirect_to_error");
    exit;
}
?>