// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        // Toggle mobile menu visibility
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = '#ffffff';
            navLinks.style.padding = '20px';
            navLinks.style.boxShadow = '0 10px 15px rgba(0,0,0,0.1)';
            navLinks.style.borderTop = '1px solid var(--border)';
        }
    });
}

// Ensure layout resets on resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinks) {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'row';
        navLinks.style.position = 'static';
        navLinks.style.padding = '0';
        navLinks.style.boxShadow = 'none';
        navLinks.style.borderTop = 'none';
    } else if (navLinks && window.innerWidth <= 768) {
        navLinks.style.display = 'none';
    }
});

// Product Data for Products Page
const products = [
    // Oils
    { id: 1, name: "Premium Groundnut Oil", category: "oils", price: 199, img: "oil_n_natural_extract_200x200_crop_center.jpg", badge: "Bestseller" },
    { id: 2, name: "Cold Pressed Coconut Oil", category: "oils", price: 249, img: "oil_n_natural_extract_200x200_crop_center.jpg" },
    
    // Dry Fruits & Nuts
    { id: 3, name: "Mixed Dry Fruits Premium", category: "dry-fruits", price: 249, img: "seeds_dry_fruits_nuts_webp_200x200_crop_center.jpg" },
    { id: 4, name: "Premium Cashews", category: "dry-fruits", price: 349, img: "seeds_dry_fruits_nuts_webp_200x200_crop_center.jpg" },
    
    // Dry Seeds
    { id: 5, name: "Organic Pumpkin Seeds", category: "dry-seeds", price: 149, img: "dry_seeds_200x200_crop_center.jpg" },
    { id: 6, name: "Chia Seeds Standard", category: "dry-seeds", price: 129, img: "dry_seeds_200x200_crop_center.jpg" },
    
    // Ghee & Honey
    { id: 7, name: "Pure Desi Cow Ghee", category: "ghee", price: 299, img: "ghee_1_200x200_crop_center.jpg", badge: "New" },
    { id: 8, name: "Wild Forest Honey", category: "ghee", price: 399, img: "ghee_1_200x200_crop_center.jpg" },
    
    // Snacks
    { id: 9, name: "Traditional Sweets Assorted", category: "snacks", price: 179, img: "sweetsSnacks_200x200_crop_center.jpg" },
    { id: 10, name: "Crispy Evening Snacks", category: "snacks", price: 99, img: "sweetsSnacks_200x200_crop_center.jpg" },
    
    // Groceries
    { id: 11, name: "Daily Essential Groceries", category: "groceries", price: 399, img: "groceries_200x200_crop_center.jpg" },
    
    // Spices
    { id: 12, name: "Authentic Garam Masala", category: "spices", price: 129, img: "spice_200x200_crop_center.png" },
    { id: 13, name: "Pure Turmeric Powder", category: "spices", price: 119, img: "powders_200x200_crop_center.jpg" },
    
    // Pickles
    { id: 14, name: "Homemade Mango Pickle", category: "pickles", price: 159, img: "Veg_pickles_200x200_crop_center.png" },
    { id: 15, name: "Spicy Lemon Pickle", category: "pickles", price: 149, img: "Veg_pickles_200x200_crop_center.png" }
];

// ── Search clear & expand ──
(function() {
    var inps = document.querySelectorAll(".search-input-h, .nav-search-input");
    var btns = document.querySelectorAll(".search-clear-h");
    
    inps.forEach((inp, idx) => {
        var btn = btns[idx];
        if (!btn) return;
        inp.addEventListener("input", function() { btn.classList.toggle("visible", inp.value.length > 0); });
        btn.addEventListener("click", function() { inp.value = ""; btn.classList.remove("visible"); inp.focus(); });
    });

    // Expandable Search in Header
    const searchBtns = document.querySelectorAll('.search-btn');
    searchBtns.forEach(sb => {
        sb.addEventListener('click', (e) => {
            e.preventDefault();
            const wrap = sb.closest('.nav-search-wrap');
            if(wrap) {
                wrap.classList.toggle('active');
                if(wrap.classList.contains('active')) {
                    wrap.querySelector('.nav-search-input').focus();
                }
            }
        });
    });

    // Close search when clicking outside
    document.addEventListener('click', (e) => {
        if(!e.target.closest('.nav-search-wrap')) {
            document.querySelectorAll('.nav-search-wrap.active').forEach(wrap => {
                wrap.classList.remove('active');
            });
        }
    });

})();

// Product Rendering and Filtering Logic
const productsGrid = document.getElementById('productsGrid');
const noResults = document.getElementById('noResults');
const categoryRadios = document.querySelectorAll('input[name="category"]');
const priceRadios = document.querySelectorAll('input[name="price"]');

// Category mapping for displaying nice names
const catNames = {
    'oils': 'Cold Pressed Oils',
    'dry-fruits': 'Dry Fruits & Nuts',
    'dry-seeds': 'Dry Seeds',
    'ghee': 'Ghee & Honey',
    'snacks': 'Sweets & Snacks',
    'groceries': 'Cooking Essentials',
    'spices': 'Spices & Powders',
    'pickles': 'Homemade Pickles'
};

function renderProducts(productsToRender) {
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    if (productsToRender.length === 0) {
        productsGrid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }
    
    productsGrid.style.display = 'grid';
    noResults.style.display = 'none';
    
    productsToRender.forEach(product => {
        const badgeHtml = product.badge ? `<div class="product-badge">${product.badge}</div>` : '';
        const catName = catNames[product.category] || 'General';
        
        const cardHtml = `
            <div class="product-card">
                ${badgeHtml}
                <div class="product-img-wrap">
                    <img src="${product.img}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <div class="product-cat">${catName}</div>
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">Rs. ${product.price}</div>
                    <button class="add-to-cart-btn"><i class="fa-solid fa-cart-plus"></i> Add to Cart</button>
                </div>
            </div>
        `;
        productsGrid.insertAdjacentHTML('beforeend', cardHtml);
    });
    
    // Re-bind the cart listeners for the newly added buttons
    attachCartListeners();
}

function filterProducts() {
    // Scroll to the top when filtering on any device
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Get active filters
    let activeCategory = 'all';
    let activePrice = 'all';
    
    categoryRadios.forEach(r => { if(r.checked) activeCategory = r.value; });
    priceRadios.forEach(r => { if(r.checked) activePrice = r.value; });
    
    // Filter array
    const filtered = products.filter(product => {
        // Category check
        const matchCategory = (activeCategory === 'all') || (product.category === activeCategory);
        
        // Price check
        let matchPrice = true;
        if (activePrice === 'under-150') {
            matchPrice = product.price < 150;
        } else if (activePrice === '150-300') {
            matchPrice = product.price >= 150 && product.price <= 300;
        } else if (activePrice === 'above-300') {
            matchPrice = product.price > 300;
        }
        
        return matchCategory && matchPrice;
    });
    
    renderProducts(filtered);
}

function resetFilters() {
    document.querySelector('input[name="category"][value="all"]').checked = true;
    document.querySelector('input[name="price"][value="all"]').checked = true;
    filterProducts();
}

// Check for URL parameters (e.g., from homepage category click)
function checkUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const categoryQuery = params.get('category');
    
    if (categoryQuery) {
        const targetRadio = document.querySelector(`input[name="category"][value="${categoryQuery}"]`);
        if (targetRadio) {
            targetRadio.checked = true;
        }
    }
}

// Initialize on products page
if (productsGrid) {
    checkUrlParams();
    renderProducts(products); // Initial render
    filterProducts(); // Apply URL param filter if any
    
    // Add event listeners to filters
    categoryRadios.forEach(radio => radio.addEventListener('change', filterProducts));
    priceRadios.forEach(radio => radio.addEventListener('change', filterProducts));
}

// ── Cinematic Slider Logic (index.html) ──
const slides = document.querySelectorAll('.cinematic-slide');
const dots = document.querySelectorAll('.dot-cine');
const prevBtn = document.querySelector('.prev-cine');
const nextBtn = document.querySelector('.next-cine');
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
    if (!slides.length) return;
    
    // reset all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // set new active
    currentSlide = index;
    if (currentSlide >= slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    
    slides[currentSlide].classList.add('active');
    if(dots[currentSlide]) dots[currentSlide].classList.add('active');
}

function moveSlider(direction) {
    showSlide(currentSlide + direction);
    resetInterval();
}

function goToSlide(index) {
    showSlide(index);
    resetInterval();
}

function resetInterval() {
    clearInterval(slideInterval);
    if(slides.length > 0) {
        slideInterval = setInterval(() => { moveSlider(1); }, 6000); // 6s fade
    }
}

// Initialize slider events
if(slides.length > 0) {
    if(prevBtn) prevBtn.addEventListener('click', () => moveSlider(-1));
    if(nextBtn) nextBtn.addEventListener('click', () => moveSlider(1));
    
    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => goToSlide(idx));
    });

    showSlide(0);
    resetInterval();
}

// ── Category Scroll Logic (index.html) ──
const catContainer = document.querySelector('.categories-wrapper');
const catPrev = document.getElementById('catPrevBtn');
const catNext = document.getElementById('catNextBtn');

if (catContainer && catPrev && catNext) {
    const scrollAmount = 300; // Adjust based on how far it should scroll per click
    catPrev.addEventListener('click', () => {
        catContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    catNext.addEventListener('click', () => {
        catContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
}

// ── Number Counter Animation (about.html) ──
const statElements = document.querySelectorAll('.stat-item h3');
if (statElements.length > 0) {
    // Basic function to handle counting
    const runCounterAnimation = (element, targetValue, duration) => {
        let startTimestamp = null;
        
        // Parse numbers and suffixes
        const targetText = element.dataset.originalTarget || targetValue;
        const isK = targetText.includes('K');
        const hasPlus = targetText.includes('+');
        const finalTarget = parseInt(targetText.replace(/\D/g, ''), 10);
        const suffixK = isK ? 'K' : '';
        const suffixPlus = hasPlus ? '+' : '';

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            // ease-out quartic easing
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentObj = Math.floor(easeOutQuart * finalTarget);
            
            // format with commas using toLocaleString
            element.innerText = currentObj.toLocaleString('en-IN') + suffixK + suffixPlus;
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                element.innerText = targetText; // Ensure exact finish 
            }
        };
        window.requestAnimationFrame(step);
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const hasAnimated = entry.target.dataset.animated === "true";

            if (entry.isIntersecting && !hasAnimated) {
                // Trigger animation
                runCounterAnimation(entry.target, entry.target.innerText, 2000);
                entry.target.dataset.animated = "true";
            } else if (!entry.isIntersecting) {
                // Reset to 0 when it leaves the screen so it animations again next scroll
                const targetText = entry.target.dataset.originalTarget;
                const isK = targetText.includes('K');
                const hasPlus = targetText.includes('+');
                const suffixK = isK ? 'K' : '';
                const suffixPlus = hasPlus ? '+' : '';
                
                entry.target.innerText = "0" + suffixK + suffixPlus;
                entry.target.dataset.animated = "false"; // allow re-trigger
            }
        });
    }, { 
        threshold: 0.1, // Trigger as soon as 10% is visible
        rootMargin: "0px"
    });
    
    statElements.forEach(stat => {
        stat.dataset.originalTarget = stat.innerText; // Store original value
        
        // Set initial state
        const targetText = stat.innerText;
        const isK = targetText.includes('K');
        const hasPlus = targetText.includes('+');
        const suffixK = isK ? 'K' : '';
        const suffixPlus = hasPlus ? '+' : '';
        stat.innerText = "0" + suffixK + suffixPlus;
        stat.dataset.animated = "false";
        
        statsObserver.observe(stat);
    });
}

// ── Deal Tabs Logic (index.html) ──
const dealTabs = document.querySelectorAll('.deal-tab');
const dealItems = document.querySelectorAll('.deal-item');

if (dealTabs.length > 0 && dealItems.length > 0) {
    dealTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active from all tabs
            dealTabs.forEach(t => t.classList.remove('active'));
            // Add active to clicked
            tab.classList.add('active');
            
            const target = tab.getAttribute('data-target');
            
            dealItems.forEach(item => {
                if (target === 'all' || item.getAttribute('data-category') === target) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// ── Cart Logic ──
let cartCount = 0;
let cartTotal = 0;

function updateCartUI() {
    // Update header badges
    document.querySelectorAll('.cart-badge, .cart-badge-h').forEach(badge => {
        badge.textContent = cartCount;
    });
    
    // Update sticky cart counts
    document.querySelectorAll('.sticky-cart-container .count, .mobile-sticky-cart .count').forEach(el => {
        el.textContent = cartCount;
    });
    
    // Update sticky cart price
    document.querySelectorAll('.sticky-cart-container .price, .mobile-sticky-cart .price').forEach(el => {
        el.textContent = cartTotal.toLocaleString('en-IN');
    });
}

// Add event listeners to all Add to Cart buttons
function attachCartListeners() {
    const addBtns = document.querySelectorAll('.add-to-cart-btn, .limited-card .icon-btn');
    addBtns.forEach(btn => {
        // Prevent multiple bindings
        if (btn.dataset.cartBound) return;
        btn.dataset.cartBound = "true";
        
        let qty = 0;
        
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Extract price from the closest card if possible
            let price = 0;
            const card = btn.closest('.product-card, .limited-card, .deal-item');
            if (card) {
                const priceEl = card.querySelector('.product-price, .limited-info .price');
                if (priceEl) {
                    const priceText = priceEl.textContent.replace(/[^\d]/g, '');
                    if (priceText) {
                        price = parseInt(priceText, 10);
                    }
                }
            }
            if (!price) price = 150; // Fallback price

            // First click handles Add to Cart
            if (qty === 0) {
                qty = 1;
                cartCount++;
                cartTotal += price;
                updateCartUI();
                
                // Change UI to quantity selector
                renderQtySelector(btn, qty, price, card);
            }
        });
    });
}

function renderQtySelector(btn, currentQty, unitPrice, cardContext) {
    btn.innerHTML = `
        <div class="qty-controls" style="display:flex; justify-content:space-between; align-items:center; width:100%; padding: 0 8px;">
            <span class="qty-btn minus" style="cursor:pointer; padding:0 8px; font-weight:bold;">-</span>
            <span class="qty-text" style="font-weight:bold;">${currentQty}</span>
            <span class="qty-btn plus" style="cursor:pointer; padding:0 8px; font-weight:bold;">+</span>
        </div>
    `;
    btn.style.background = 'var(--primary)';
    btn.style.color = 'white';
    btn.style.padding = '8px 12px';
    
    // Bind plus/minus events
    const minusBtn = btn.querySelector('.minus');
    const plusBtn = btn.querySelector('.plus');
    const qtyText = btn.querySelector('.qty-text');
    
    minusBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent parent click
        if (currentQty > 0) {
            currentQty--;
            cartCount--;
            cartTotal -= unitPrice;
            updateCartUI();
            
            if (currentQty === 0) {
                // Reset button
                btn.innerHTML = '<i class="fa-solid fa-cart-plus"></i> Add to Cart';
                btn.style.background = '';
                btn.style.color = '';
                btn.style.padding = '';
            } else {
                qtyText.textContent = currentQty;
            }
        }
    });

    plusBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentQty++;
        cartCount++;
        cartTotal += unitPrice;
        updateCartUI();
        qtyText.textContent = currentQty;
    });
}

// Run initial binding and also re-bind after dynamic rendering
document.addEventListener('DOMContentLoaded', () => {
    attachCartListeners();
});
