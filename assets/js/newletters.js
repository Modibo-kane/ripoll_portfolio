const handleSubmit = (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    const myForm = event.target;
    const formData = new FormData(myForm);
    
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        // 1. On cache les champs du formulaire
        myForm.querySelector('.form-group').style.display = 'none';
        // 2. On affiche le message de succès
        document.getElementById('success-message').style.display = 'block';
      })
      .catch((error) => alert("Erreur : " + error));
  };

  document.getElementById("newsletter-form").addEventListener("submit", handleSubmit);