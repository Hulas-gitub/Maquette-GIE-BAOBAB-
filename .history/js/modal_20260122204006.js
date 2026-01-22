
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

// Ouvrir le modal de devis
function openDevisModal() {
    const modal = document.getElementById('devisModal');
    const content = document.getElementById('devisModalContent');
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    
    // Animation d'entrée
    setTimeout(() => {
        modal.classList.add('opacity-100');
        content.classList.add('scale-100');
        content.classList.remove('scale-95');
    }, 10);
}

// Ouvrir le modal depuis la bannière avec pré-sélection
function openDevisModalFromBanner(filiale) {
    openDevisModal();
    const filialeSelect = document.getElementById('filialeSelect');
    filialeSelect.value = filiale;
    updateServices();
}

// Fermer le modal de devis
function closeDevisModal() {
    const modal = document.getElementById('devisModal');
    const content = document.getElementById('devisModalContent');
    
    // Animation de sortie
    modal.classList.remove('opacity-100');
    content.classList.add('scale-95');
    content.classList.remove('scale-100');
    
    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = 'auto';
    }, 300);
}

// Ouvrir le modal de confirmation
function openConfirmationModal(filiale, service, reference) {
    const messages = {
        'CEVEB GABON': `Votre demande de devis pour <strong>${service}</strong> a bien été reçue. Notre équipe d'experts en espaces verts vous contactera sous 24h.`,
        'SCI TRIOMPHAL': `Votre demande concernant <strong>${service}</strong> a bien été enregistrée. Un conseiller immobilier vous recontactera rapidement.`,
        'CA-SERVICE': `Votre demande pour <strong>${service}</strong> a été transmise. Notre équipe automobile vous répondra dans les plus brefs délais.`,
        'AVA PRODUCTION': `Votre demande pour <strong>${service}</strong> a bien été reçue. Nos spécialistes événementiels vous contacteront sous 24h.`,
        'FEA ALIMENTATION': `Votre demande concernant <strong>${service}</strong> a été enregistrée. Notre équipe agro-alimentaire vous recontactera prochainement.`
    };
    
    document.getElementById('confirmationMessage').innerHTML = messages[filiale];
    document.getElementById('confirmationReference').textContent = reference;
    
    const modal = document.getElementById('confirmationModal');
    const content = document.getElementById('confirmationContent');
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    setTimeout(() => {
        modal.classList.add('opacity-100');
        content.classList.add('scale-100');
        content.classList.remove('scale-95');
    }, 10);
}

// Fermer le modal de confirmation
function closeConfirmationModal() {
    const modal = document.getElementById('confirmationModal');
    const content = document.getElementById('confirmationContent');
    
    modal.classList.remove('opacity-100');
    content.classList.add('scale-95');
    content.classList.remove('scale-100');
    
    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = 'auto';
    }, 300);
}

// Mettre à jour les services selon la filiale
function updateServices() {
    const filialeSelect = document.getElementById('filialeSelect');
    const serviceSelect = document.getElementById('serviceSelect');
    const serviceSection = document.getElementById('serviceSection');
    const modalSubtitle = document.getElementById('modalSubtitle');
    
    const filiale = filialeSelect.value;
    
    if (filiale) {
        serviceSection.classList.remove('hidden');
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
        serviceSection.classList.add('hidden');
        modalSubtitle.textContent = 'Remplissez ce formulaire pour recevoir une estimation gratuite sous 24h.';
    }
}

// Gestion du formulaire
document.getElementById('devisForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const filiale = formData.get('filiale');
    const service = formData.get('service');
    
    // Générer une référence unique
    const reference = 'DEV-' + new Date().getFullYear() + '-' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    
    // Fermer le modal de devis
    closeDevisModal();
    
    // Ouvrir le modal de confirmation
    setTimeout(() => {
        openConfirmationModal(filiale, service, reference);
    }, 300);
    
    // Réinitialiser le formulaire
    e.target.reset();
    document.getElementById('serviceSection').classList.add('hidden');
});

// Fermer en cliquant en dehors
document.getElementById('devisModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeDevisModal();
    }
});

document.getElementById('confirmationModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeConfirmationModal();
    }
});

// Fermer avec la touche Échap
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeDevisModal();
        closeConfirmationModal();
    }
});
