<div class=" accueil">
    <div class="enfant w-1/2 ">
        <div class="imgContenaire">
            <img src="../../assets/image/mannequinRemovebg.png" alt="Darcia Ripoll">
        </div>
    </div>
    <div class="enfant2 w-1/2">
            <div class="about">
                About Me
            </div>
            <div class="description">
                Get a Web Service that will make a 
                lasting impression on your audience!!!
            </div>
            <div class="rectangleInfos">
                <div class="info">
                    <span class="label">Name:</span> <br> <span class="value"> Darcia Ripoll</span>
                </div>
                <div class="info">
                    <span class="label">Email:</span> <br> <span class="value">darcia@example.com</span>
                </div>
                <div class="info">
                    <span class="label">Phone:</span> <br> <span class="value">+242 00 000 00 00</span>
                </div>
                <div class="info">
                    <span class="label">Location:</span> <br> <span class="value">Brazzaville, Congo</span>
                </div>
            </div>
            <div class="btnCont">
                <a href="index.php?page=contact" class="btnContact">Contact Me</a>
                <a href="../../assets/docs/Darcia_Ripoll_CV.pdf" class="btnDownload" download>Download CV</a>
            </div>
    </div>
</div>
<?php if ($active_section === 'skills'): ?>
    <section id="skills" class="skills min-h-screen w-full">
        <?php include 'views/includes/skills.php'; ?>
    </section>
<?php endif; ?>

<?php if ($active_section === 'services'): ?>
    <section id="services" class="services min-h-screen w-full" >
        <?php include 'views/includes/services.php'; ?>
    </section>
<?php endif; ?>

<?php if ($active_section === 'projects'): ?>
    <section id="projects" class="projects min-h-screen w-full">
        <?php include 'views/includes/projects.php'; ?>
    </section>
<?php endif; ?>