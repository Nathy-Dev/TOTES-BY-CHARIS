// CONFIG: Your WhatsApp Number (International Format without +)
const WHATSAPP_NUMBER = "2349117064920"; // REPLACE THIS with your real number

// --- 2. APP LOGIC ---
const app = {
    init: () => {
        app.renderHome();
        app.renderShop();
        // initialise breadcrumb on load
        app.updateBreadcrumb('home');
    },

    // Navigation Router
    router: (viewName, productId = null) => {
        // Hide all views
        document.querySelectorAll('.view').forEach(el => el.classList.remove('active'));

        // Show requested view
        if (viewName === 'home') {
            document.getElementById('homeView').classList.add('active');
            window.scrollTo(0, 0);
            app.updateBreadcrumb('home');
        } else if (viewName === 'shop') {
            document.getElementById('shopView').classList.add('active');
            window.scrollTo(0, 0);
            app.updateBreadcrumb('shop');
        } else if (viewName === 'product' && productId) {
            app.renderProductDetail(productId);
            document.getElementById('productView').classList.add('active');
            window.scrollTo(0, 0);
            app.updateBreadcrumb('product', productId);
        }
    },

    // Update breadcrumb trail
    updateBreadcrumb: (viewName, productId = null) => {
        const container = document.getElementById('breadcrumb');
        if (!container) return;
        const makeLink = (label, view, id = null) => `<a href="#" onclick="app.router('${view}'${id ? ', ' + id : ''})">${label}</a>`;

        let items = [];
        if (viewName === 'home') {
            // hide breadcrumb on home
            container.innerHTML = '';
            return;
        } else if (viewName === 'shop') {
            items = [
                { name: 'Home', view: 'home' },
                { name: 'Shop', current: true }
            ];
        } else if (viewName === 'product') {
            const product = products.find(p => p.id === productId);
            const productName = product ? product.name : 'Product';
            items = [
                { name: 'Home', view: 'home' },
                { name: 'Shop', view: 'shop' },
                { name: productName, current: true }
            ];
        }

        container.innerHTML = items.map((it, idx) => {
            if (it.current) return `<li class="current" aria-current="page">${it.name}</li>`;
            return `<li>${makeLink(it.name, it.view)}</li>`;
        }).join('');
    },

    // Generate HTML for a product card
    createCard: (product) => {
        const makeSrc = (w) => product.image.includes('w=') ? product.image.replace(/w=\d+/, 'w=' + w) : product.image + `&w=${w}`;
        const src400 = makeSrc(400);
        const src800 = makeSrc(800);
        const src1200 = makeSrc(1200);

        return `
                    <div class="product-card" onclick="app.router('product', ${product.id})">
                        <div class="product-img-wrap">
                            <img src="${src800}" srcset="${src400} 400w, ${src800} 800w, ${src1200} 1200w" sizes="(max-width:480px) 48vw, (max-width:768px) 48vw, 31vw" alt="${product.name}">
                        </div>
                        <div class="p-brand">${product.brand}</div>
                        <h3 class="p-name">${product.name}</h3>
                        <div class="p-price">${product.price}</div>
                    </div>
                `;
    },

    // Render Home Grid (Limit to 3 items)
    renderHome: () => {
        const grid = document.getElementById('featuredGrid');
        grid.innerHTML = products.slice(0, 3).map(p => app.createCard(p)).join('');
    },

    // Render Full Shop Grid
    renderShop: () => {
        const grid = document.getElementById('shopGrid');
        grid.innerHTML = products.map(p => app.createCard(p)).join('');
    },

    // Render Product Detail Page
    renderProductDetail: (id) => {
        const product = products.find(p => p.id === id);
        if (!product) return;

        // responsive detail image
        const makeSrc = (w) => product.image.includes('w=') ? product.image.replace(/w=\d+/, 'w=' + w) : product.image + `&w=${w}`;
        const d600 = makeSrc(600);
        const d1000 = makeSrc(1000);
        const d1400 = makeSrc(1400);
        const detailImg = document.getElementById('detailImg');
        detailImg.src = d1000;
        detailImg.srcset = `${d600} 600w, ${d1000} 1000w, ${d1400} 1400w`;
        detailImg.sizes = '(max-width:768px) 100vw, 50vw';
        detailImg.alt = product.name;

        document.getElementById('detailBrand').innerText = product.brand;
        document.getElementById('detailName').innerText = product.name;
        document.getElementById('detailPrice').innerText = product.price;
        document.getElementById('detailDesc').innerText = product.desc;
        document.getElementById('detailCondition').innerText = product.condition;
        document.getElementById('detailCategory').innerText = product.category;

        // WhatsApp Logic
        const message = `Hi Totes By Charis, I would like to place an order for ${product.name} listed at ${product.price}. Is it still available?`;
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

        document.getElementById('whatsappBtn').href = url;
    }
};

// Start App
document.addEventListener('DOMContentLoaded', () => {
    app.init();

    // Mobile nav toggle + keyboard accessibility
    const navToggle = document.querySelector('.nav-toggle');
    const navWrapper = document.querySelector('.nav-wrapper');
    const mainNav = document.getElementById('main-nav');

    if (navToggle && navWrapper && mainNav) {
        const openMenu = () => {
            navToggle.setAttribute('aria-expanded', 'true');
            navWrapper.classList.add('open');
            const firstLink = mainNav.querySelector('a');
            if (firstLink) firstLink.focus();
        };

        const closeMenu = () => {
            navToggle.setAttribute('aria-expanded', 'false');
            navWrapper.classList.remove('open');
            navToggle.focus();
        };

        navToggle.addEventListener('click', () => {
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            if (expanded) closeMenu(); else openMenu();
        });

        // Close menu when a nav link is clicked (helpful on mobile)
        mainNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
            closeMenu();
        }));

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navWrapper.classList.contains('open')) {
                closeMenu();
            }
        });

        // Support Enter / Space on the toggle (native for button but keep for robust behavior)
        navToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navToggle.click();
            }
        });
    }
});