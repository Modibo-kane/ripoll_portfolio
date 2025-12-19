const handleSubmit = (event) => {
  event.preventDefault(); // Empêche le rechargement de la page

  const myForm = event.target;
  const formData = new FormData(myForm);

  // Ajout du nom du formulaire aux données envoyées, c'est la clé pour Netlify !
  const formName = myForm.getAttribute("name");
  formData.append("form-name", formName);

  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString(),
  })
    .then(() => {
      const successMessage = document.getElementById("success-message");
      const formContainer = document.querySelector(".newsletter-form");

      // On affiche le message de succès
      if (successMessage) successMessage.classList.add("show");
      // On cache le champ de saisie du formulaire
      if (formContainer) formContainer.style.display = "none";

      // On fait disparaître le message après 5 secondes
      setTimeout(() => {
        if (successMessage) successMessage.classList.remove("show");
      }, 5000);
    })
    .catch((error) => alert("Erreur lors de la soumission : " + error));
};

document.getElementById("newsletter-form").addEventListener("submit", handleSubmit);