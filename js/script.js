// JavaScript para A Gaiola Invisível - Landing Page

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Fade in animation on scroll
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Initialize animations
window.addEventListener('scroll', handleScrollAnimations);
window.addEventListener('load', handleScrollAnimations);


// Floating animation for hero elements
document.addEventListener('DOMContentLoaded', function() {
    const floatingElements = document.querySelectorAll('.floating');
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
    });
});

// Função de integração com plataforma de pagamento
function redirectToPayment() {
    // Aqui você integra com a plataforma de pagamento (Hotmart, etc.)
    alert('Redirecionando para a plataforma de pagamento...');
    window.location.href = 'https://pay.hotmart.com/seu-link-de-pagamento';
}

// Adicionar event listeners aos botões de CTA
document.addEventListener('DOMContentLoaded', function() {
    const ctaButtons = document.querySelectorAll('button[onclick*="scrollToSection"]');
    ctaButtons.forEach(button => {
        if (button.textContent.includes('INSCREVER-SE AGORA')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                redirectToPayment();
            });
        }
    });
});

// Função para inicializar os scripts de rastreamento APÓS o consentimento
function initTrackingScripts() {
    console.log("Consentimento dado. Inicializando Google Tag Manager...");

    // Substitua 'GTM-XXXXXXX' pelo ID do contêiner do GTM
    const gtmId = 'GTM-K64SLZ6M';

    // ===================================================================
    // GOOGLE TAG MANAGER
    // Este código injeta o script do GTM no <head> da página
    // ===================================================================
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer', gtmId);

    // ===================================================================
    // CÓDIGO (noscript) DO GOOGLE TAG MANAGER PARA O <body>
    // Este código injeta o iframe do GTM no <body> da página
    // ===================================================================
    const noscript = document.createElement('noscript');
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${gtmId}`;
    iframe.height = '0';
    iframe.width = '0';
    iframe.style.display = 'none';
    iframe.style.visibility = 'hidden';
    noscript.appendChild(iframe);
    document.body.insertBefore(noscript, document.body.firstChild);
}

// Funções auxiliares para manipular cookies
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/; SameSite=Lax";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i=0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

// Lógica Principal do Banner
document.addEventListener('DOMContentLoaded', function() {
    const banner = document.getElementById('cookie-consent-banner');
    const acceptBtn = document.getElementById('accept-cookies-btn');

    // Verifica se o cookie de consentimento existe
    if (getCookie('user_consent_cookies') === 'true') {
        // Se já consentiu, apenas carrega os scripts
        initTrackingScripts();
    } else {
        // Se não consentiu, mostra o banner
        banner.style.display = 'block';
    }

    // Adiciona o evento ao botão de aceitar
    acceptBtn.addEventListener('click', function() {
        setCookie('user_consent_cookies', 'true', 365); // Salva o consentimento por 1 ano
        banner.style.display = 'none'; // Esconde o banner
        initTrackingScripts(); // Ativa os scripts de rastreamento
    });
});
