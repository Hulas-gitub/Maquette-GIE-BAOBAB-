 // Configuration des services par filiale
        const servicesParFiliale = {
            'CEVEB GABON': [
                'Entretien d\'espaces verts',
                'Aménagement paysager',
                'Élagage et abattage',
                'Systèmes d\'arrosage',
                'Traitements phytosanitaires'
            ],
            'SCI TRIOMPHAL': [
                'Achat et Vente',
                'Location et Gérance',
                'Promotion immobilière',
                'Conseil en investissement',
                'Gestion de syndic'
            ],
            'CA-SERVICE': [
                'Location de véhicules',
                'Vente de véhicules neufs/occasion',
                'Lavage auto professionnel',
                'Entretien rapide',
                'Gestion de flotte'
            ],
            'AVA PRODUCTION': [
                'Sonorisation et Éclairage',
                'Location de tentes/chapiteaux',
                'Service Traiteur',
                'Décoration événementielle',
                'Organisation complète'
            ],
            'FEA ALIMENTATION': [
                'Production avicole',
                'Agriculture maraîchère',
                'Élevage porcin',
                'Distribution en gros',
                'Vente directe'
            ]
        };

        // Slider automatique
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');
        
        function showSlide(index) {
            slides.forEach(slide => {
                slide.classList.remove('active');
                slide.style.display = 'none';
            });
            slides[index].style.display = 'block';
            slides[index].classList.add('active');
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        
        // Initialiser le slider
        showSlide(0);
        setInterval(nextSlide, 5000);

        // Ouvrir le modal depuis la navigation
        function openDevisModal() {
            document.getElementById('devisModal').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        // Ouvrir le modal depuis la bannière avec pré-sélection
        function openDevisModalFromBanner(filiale) {
            openDevisModal();
            const filialeSelect = document.getElementById('filialeSelect');
            filialeSelect.value = filiale;
            updateServices();
        }

        // Fermer le modal
        function closeDevisModal() {
            document.getElementById('devisModal').classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        // Mettre à jour les services selon la filiale
        function updateServices() {
            const filialeSelect = document.getElementById('filialeSelect');
            const serviceSelect = document.getElementById('serviceSelect');
            const serviceSection = document.getElementById('serviceSection');
            const modalSubtitle = document.getElementById('modalSubtitle');
            
            const filiale = filialeSelect.value;
            
            if (filiale) {
                serviceSection.style.display = 'block';
                serviceSelect.innerHTML = '<option value="">Sélectionner un service</option>';
                
                const services = servicesParFiliale[filiale];
                services.forEach(service => {
                    const option = document.createElement('option');
                    option.value = service;
                    option.textContent = service;
                    serviceSelect.appendChild(option);
                });
                
                modalSubtitle.textContent = `${filiale} - Remplissez ce formulaire pour recevoir une estimation gratuite sous 24h.`;
            } else {
                serviceSection.style.display = 'none';
                modalSubtitle.textContent = 'Remplissez ce formulaire pour recevoir une estimation gratuite sous 24h.';
            }
        }

        // Gestion du formulaire
        document.getElementById('devisForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(e.target);
            const filiale = formData.get('filiale');
            const service = formData.get('service');
            const prenom = formData.get('prenom');
            
            // Générer une référence unique
            const reference = 'DEV-' + new Date().getFullYear() + '-' + Math.floor(Math.random() * 1000);
            
            // Messages personnalisés par filiale
            const messages = {
                'CEVEB GABON': `Votre demande de devis pour ${service} a bien été reçue. Notre équipe d'experts en espaces verts vous contactera sous 24h.`,
                'SCI TRIOMPHAL': `Votre demande concernant ${service} a bien été enregistrée. Un conseiller immobilier vous recontactera rapidement.`,
                'CA-SERVICE': `Votre demande pour ${service} a été transmise. Notre équipe automobile vous répondra dans les plus brefs délais.`,
                'AVA PRODUCTION': `Votre demande pour ${service} a bien été reçue. Nos spécialistes événementiels vous contacteront sous 24h.`,
                'FEA ALIMENTATION': `Votre demande concernant ${service} a été enregistrée. Notre équipe agro-alimentaire vous recontactera prochainement.`
            };
            
            // Fermer le modal
            closeDevisModal();
            
            // Afficher le toast de succès
            setTimeout(() => {
                showSuccessToast(messages[filiale], reference);
            }, 300);
            
            // Réinitialiser le formulaire
            e.target.reset();
            document.getElementById('serviceSection').style.display = 'none';
        });

        // Afficher le toast de succès
        function showSuccessToast(message, reference) {
            const toast = document.getElementById('successToast');
            document.getElementById('toastMessage').textContent = message;
            document.getElementById('toastReference').textContent = `Référence: ${reference}`;
            
            toast.classList.add('show');
            
            setTimeout(() => {
                closeToast();
            }, 8000);
        }

        // Fermer le toast
        function closeToast() {
            document.getElementById('successToast').classList.remove('show');
        }

        // Fermer le modal en cliquant en dehors
        document.getElementById('devisModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeDevisModal();
            }
        });

//navigation mobile
function toggleDropdown(event) {
	// Empêcher la navigation uniquement sur mobile
	if (window.innerWidth <= 768) {
		event.preventDefault();
		const parentLi = event.currentTarget.closest('.has-dropdown');
		parentLi.classList.toggle('dropdown-open');
	}
}

// Ouvrir automatiquement le dropdown en mobile au chargement
document.addEventListener('DOMContentLoaded', function() {
	if (window.innerWidth <= 768) {
		const dropdown = document.querySelector('.has-dropdown');
		if (dropdown) {
			dropdown.classList.add('dropdown-open');
		}
	}
});


	//jQuery example
	var d = new Date(new Date().getTime() + 1000 * 120 * 120 * 2000);

		// default example
		simplyCountdown('.simply-countdown-one', {
			year: d.getFullYear(),
			month: d.getMonth() + 1,
			day: d.getDate()
		});

		//jQuery example
		$('#simply-countdown-losange').simplyCountdown({
			year: d.getFullYear(),
			month: d.getMonth() + 1,
			day: d.getDate(),
			enableUtc: false
		});