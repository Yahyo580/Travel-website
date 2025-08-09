// Simple i18n handler for UZB / ENG / RUS
// - Marks active language button
// - Persists language to localStorage
// - Replaces textContent of elements with [data-i18n]

(function () {
  const LANGUAGE_STORAGE_KEY = "site_language";
  const DEFAULT_LANGUAGE = "uz";

  /**
   * Translations dictionary.
   * Add new keys as needed; missing keys are safely ignored.
   */
  const translations = {
    uz: {
      // Global / header
      site_title: "O'zbekiston Travel",
      nav_home: "Bosh sahifa",
      nav_food: "Tanavul uchun",
      nav_sights: "Diqqatga sazovor joylar",
      nav_gallery: "Foto va Video",

      // index.html hero
      hero_title:
        "O'zbekistonni o'zingiz uchun kashf eting!",
      hero_subtitle:
        "Sharqning sirli mamlakatida tarixlar afsonalarda to'plangan, quyosh yil bo'yi porlab, tabiatning betakrorligi va odamlarning yuraklari tozaligi buning nishonasidir",

      // diqqatga sazovorjoylar.html
      main_title: "Diqqatga sazovor joylar",
      main_subtitle:
        "O'zbekistondagi eng chiroyli va tarixiy joylarni kashf eting. Har bir joy o'ziga xos tarix va madaniyatga ega.",
      sections_title: "Bo'limlar",
      section_ziyorat: "Ziyorat turizm obyektlari",
      section_ziyorat_desc: "Diniy joylar va ziyoratgohlar",
      famous_places: "Eng mashhur joylar",
    },
    en: {
      // Global / header
      site_title: "Uzbekistan Travel",
      nav_home: "Home",
      nav_food: "Cuisine",
      nav_sights: "Attractions",
      nav_gallery: "Photo & Video",

      // index.html hero
      hero_title: "Discover Uzbekistan for yourself!",
      hero_subtitle:
        "In this mystical Eastern land, history lives in legends, the sun shines all year, nature is unique, and people's hearts are sincere.",

      // diqqatga sazovorjoylar.html
      main_title: "Attractions",
      main_subtitle:
        "Explore Uzbekistan's most beautiful and historic places. Each has its own story and culture.",
      sections_title: "Sections",
      section_ziyorat: "Pilgrimage sites",
      section_ziyorat_desc: "Religious places and shrines",
      famous_places: "Most famous places",
    },
    ru: {
      // Global / header
      site_title: "Путешествие по Узбекистану",
      nav_home: "Главная",
      nav_food: "Кухня",
      nav_sights: "Достопримечательности",
      nav_gallery: "Фото и видео",

      // index.html hero
      hero_title: "Откройте Узбекистан для себя!",
      hero_subtitle:
        "В этой загадочной восточной стране история живёт в легендах, солнце светит круглый год, природа уникальна, а сердца людей добры и открыты.",

      // diqqatga sazovorjoylar.html
      main_title: "Достопримечательности",
      main_subtitle:
        "Откройте самые красивые и исторические места Узбекистана. У каждого своя история и культура.",
      sections_title: "Разделы",
      section_ziyorat: "Места паломничества",
      section_ziyorat_desc: "Религиозные места и святыни",
      famous_places: "Самые известные места",
    },
  };

  function getCurrentLanguage() {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored && (stored === "uz" || stored === "en" || stored === "ru")) {
      return stored;
    }
    return DEFAULT_LANGUAGE;
  }

  function setCurrentLanguage(lang) {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  }

  function markActiveLanguageButton(lang) {
    const buttons = document.querySelectorAll('[data-lang]');
    buttons.forEach((btn) => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('bg-blue-700', 'text-white');
      } else {
        btn.classList.remove('bg-blue-700', 'text-white');
      }
    });
  }

  function applyTranslations(lang) {
    const dict = translations[lang] || {};
    document.documentElement.setAttribute('lang', lang);
    const nodes = document.querySelectorAll('[data-i18n]');
    nodes.forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const val = dict[key];
      if (typeof val === 'string') {
        el.textContent = val;
      }
    });
  }

  function initializeI18n() {
    const initialLang = getCurrentLanguage();
    markActiveLanguageButton(initialLang);
    applyTranslations(initialLang);

    document.addEventListener('click', (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const lang = target.getAttribute('data-lang');
      if (!lang) return;
      if (!['uz', 'en', 'ru'].includes(lang)) return;
      setCurrentLanguage(lang);
      markActiveLanguageButton(lang);
      applyTranslations(lang);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeI18n);
  } else {
    initializeI18n();
  }
})();

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 100) {
            header.classList.add('shadow-xl');
        } else {
            header.classList.remove('shadow-xl');
        }
    }
});

// Add loading animation to cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.bg-white.rounded-lg').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Add hover effects to buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Enhanced Search Functionality
const searchBtn = document.querySelector('button:has(.fa-search)');
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        showSearchModal();
    });
}

function showSearchModal() {
    const modalHTML = `
        <div id="search-modal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-bold text-gray-800">Qidiruv</h3>
                    <button onclick="closeSearchModal()" class="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
                </div>
                <div class="mb-4">
                    <input type="text" id="search-input" placeholder="Qidiruv so'zini kiriting..." 
                           class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uzbek-blue focus:border-transparent">
                </div>
                <div class="mb-4">
                    <select id="search-category" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uzbek-blue focus:border-transparent">
                        <option value="">Barcha kategoriyalar</option>
                        <option value="shahar">Shaharlar</option>
                        <option value="masjid">Masjidlar</option>
                        <option value="muzey">Muzeylar</option>
                        <option value="bog">Bog'lar</option>
                    </select>
                </div>
                <div class="flex space-x-2">
                    <button onclick="performSearch()" class="bg-uzbek-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex-1">
                        <i class="fas fa-search mr-2"></i>Qidirish
                    </button>
                    <button onclick="closeSearchModal()" class="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400">
                        Bekor
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.getElementById('search-input').focus();
}

function closeSearchModal() {
    const modal = document.getElementById('search-modal');
    if (modal) {
        modal.remove();
    }
}

function performSearch() {
    const searchTerm = document.getElementById('search-input').value;
    const category = document.getElementById('search-category').value;
    
    if (searchTerm.trim() === '') {
        showNotification('Iltimos, qidiruv so\'zini kiriting!', 'error');
        return;
    }
    
    // Real search results based on current page content
    const allAttractions = [
        { name: 'Xazrati Dovud g\'ori', category: 'ziyorat', city: 'Toshkent' },
        { name: 'Dorut Tilovat majmuasi', category: 'ziyorat', city: 'Toshkent' },
        { name: 'Shayxontohur me\'moriy ansambli', category: 'me\'moriy', city: 'Toshkent' },
        { name: 'Chorsu Art-galereyasi', category: 'san\'at', city: 'Toshkent' },
        { name: 'Alisher Navoiy nomidagi Katta teatr', category: 'madaniyat', city: 'Toshkent' },
        { name: 'Mustaqillik maydoni', category: 'maydon', city: 'Toshkent' },
        { name: 'Registon maydoni', category: 'me\'moriy', city: 'Samarqand' },
        { name: 'Bibi-Xonim masjidi', category: 'masjid', city: 'Samarqand' },
        { name: 'Shohi Zinda', category: 'maqbara', city: 'Samarqand' },
        { name: 'Poyi Kalon', category: 'masjid', city: 'Buxoro' },
        { name: 'Sitorai Mohi Xosa', category: 'saroy', city: 'Buxoro' },
        { name: 'Labi Hovuz', category: 'maydon', city: 'Buxoro' },
        { name: 'Ichan Qal\'a', category: 'qal\'a', city: 'Xiva' },
        { name: 'Juma masjidi', category: 'masjid', city: 'Xiva' },
        { name: 'Xo\'ja Nasriddin Afandi haykali', category: 'haykal', city: 'Xiva' }
    ];
    
    const results = allAttractions.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (category === '' || item.category === category)
    );
    
    showSearchResults(results, searchTerm);
    closeSearchModal();
}

function showSearchResults(results, searchTerm) {
    const modalHTML = `
        <div id="results-modal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div class="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-96 overflow-y-auto">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-bold text-gray-800">"${searchTerm}" uchun natijalar</h3>
                    <button onclick="closeResultsModal()" class="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
                </div>
                <div id="search-results">
                    ${results.length > 0 ? results.map(item => `
                        <div class="border-b border-gray-200 py-3">
                            <h4 class="font-semibold text-gray-800">${item.name}</h4>
                            <p class="text-sm text-gray-600">${item.city}</p>
                        </div>
                    `).join('') : '<p class="text-gray-500 text-center py-4">Hech qanday natija topilmadi</p>'}
                </div>
                <div class="mt-4 text-center">
                    <button onclick="closeResultsModal()" class="bg-uzbek-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                        Yopish
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function closeResultsModal() {
    const modal = document.getElementById('results-modal');
    if (modal) {
        modal.remove();
    }
}

// Enhanced Language Switcher
const languages = {
    'UZB': { name: 'O\'zbekcha', flag: '🇺🇿' },
    'ENG': { name: 'English', flag: '🇺🇸' },
    'RUS': { name: 'Русский', flag: '🇷🇺' }
};

document.querySelectorAll('button').forEach(btn => {
    if (btn.textContent === 'UZB' || btn.textContent === 'ENG' || btn.textContent === 'RUS') {
        btn.addEventListener('click', function() {
            const language = this.textContent;
            switchLanguage(language);
        });
    }
});

function switchLanguage(langCode) {
    const lang = languages[langCode];
    if (lang) {
        // Show language change notification
        showNotification(`${lang.flag} ${lang.name} tiliga o'tkazildi`);
        
        // Update page title and content based on language
        updatePageContent(langCode);
    }
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    const bgColor = type === 'error' ? 'bg-red-500' : 'bg-green-500';
    const icon = type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle';
    
    notification.className = `fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300`;
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${icon} mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function updatePageContent(langCode) {
    // Update page title
    const titles = {
        'UZB': 'Diqqatga sazovor joylar - O\'zbekiston Travel',
        'ENG': 'Attractions - Uzbekistan Travel',
        'RUS': 'Достопримечательности - Узбекистан Travel'
    };
    
    if (titles[langCode]) {
        document.title = titles[langCode];
    }
}

function showLanguageSwitcher() {
    const modalHTML = `
        <div id="language-modal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-bold text-gray-800">Tilni tanlang</h3>
                    <button onclick="closeLanguageModal()" class="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
                </div>
                <div class="space-y-3">
                    <button onclick="switchLanguage('UZB'); closeLanguageModal()" class="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center">
                        <span class="text-2xl mr-3">🇺🇿</span>
                        <div class="text-left">
                            <div class="font-semibold">O'zbekcha</div>
                            <div class="text-sm text-gray-500">Uzbek</div>
                        </div>
                    </button>
                    <button onclick="switchLanguage('ENG'); closeLanguageModal()" class="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center">
                        <span class="text-2xl mr-3">🇺🇸</span>
                        <div class="text-left">
                            <div class="font-semibold">English</div>
                            <div class="text-sm text-gray-500">Inglizcha</div>
                        </div>
                    </button>
                    <button onclick="switchLanguage('RUS'); closeLanguageModal()" class="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center">
                        <span class="text-2xl mr-3">🇷🇺</span>
                        <div class="text-left">
                            <div class="font-semibold">Русский</div>
                            <div class="text-sm text-gray-500">Ruscha</div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function closeLanguageModal() {
    const modal = document.getElementById('language-modal');
    if (modal) {
        modal.remove();
    }
}

// Enhanced Download Functionality
document.querySelectorAll('button').forEach(btn => {
    if (btn.textContent.includes('Bepul yuklab olish')) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const imageName = this.closest('.bg-white').querySelector('h3').textContent;
            downloadImage(imageName);
        });
    }
});

function downloadImage(imageName) {
    try {
        // Create a canvas to generate a sample image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 1200;
        canvas.height = 800;
        
        // Create gradient background
        const gradient = ctx.createLinearGradient(0, 0, 1200, 800);
        gradient.addColorStop(0, '#1e40af');
        gradient.addColorStop(0.5, '#3b82f6');
        gradient.addColorStop(1, '#1e40af');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 1200, 800);
        
        // Add decorative elements
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.beginPath();
        ctx.arc(100, 100, 50, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(1100, 700, 80, 0, 2 * Math.PI);
        ctx.fill();
        
        // Add main text
        ctx.fillStyle = 'white';
        ctx.font = 'bold 64px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(imageName, 600, 300);
        
        // Add subtitle
        ctx.font = '32px Arial';
        ctx.fillText('O\'zbekiston Travel', 600, 350);
        
        // Add decorative border
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 4;
        ctx.strokeRect(50, 50, 1100, 700);
        
        // Convert to blob and download
        canvas.toBlob(function(blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${imageName.replace(/\s+/g, '_')}_uzbekistan_travel.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            showNotification(`${imageName} rasmi muvaffaqiyatli yuklab olindi!`);
        }, 'image/png', 0.9);
        
    } catch (error) {
        showNotification('Yuklab olishda xatolik yuz berdi!', 'error');
        console.error('Download error:', error);
    }
}

// Add smooth reveal animation for sections
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('section').forEach(section => {
    section.classList.add('opacity-0', 'transform', 'translate-y-10');
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    sectionObserver.observe(section);
});

// Photo Gallery Modal Functionality
class PhotoGallery {
    constructor() {
        this.gallery = [];
        this.init();
    }

    init() {
        // Create modal HTML
        this.createModal();
        
        // Add event listeners
        this.addEventListeners();
        
        // Load existing gallery items
        this.loadGallery();
    }

    createModal() {
        const modalHTML = `
            <div id="gallery-modal" class="gallery-modal">
                <div class="gallery-content">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-2xl font-bold text-gray-800">Foto va Video Galereya</h2>
                        <button id="close-gallery" class="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
                    </div>
                    
                    <div class="mb-6">
                        <button id="add-photo-btn" class="bg-uzbek-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 mr-2">
                            <i class="fas fa-plus mr-2"></i>Foto qo'shish
                        </button>
                        <button id="add-video-btn" class="bg-uzbek-green text-white px-4 py-2 rounded-lg hover:bg-green-700">
                            <i class="fas fa-video mr-2"></i>Video qo'shish
                        </button>
                    </div>
                    
                    <div id="upload-area" class="upload-area hidden">
                        <i class="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4"></i>
                        <p class="text-gray-600 mb-2">Faylni bu yerga tashlang yoki tanlang</p>
                        <p class="text-sm text-gray-500">Rasmlar: JPG, PNG, GIF | Videolar: MP4, AVI, MOV</p>
                        <input type="file" id="file-input" accept="image/*,video/*" multiple class="hidden">
                    </div>
                    
                    <div id="gallery-grid" class="gallery-grid">
                        <!-- Gallery items will be added here -->
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    addEventListeners() {
        // Open gallery modal
        document.querySelectorAll('.fa-camera, .fa-video').forEach(icon => {
            icon.addEventListener('click', (e) => {
                e.preventDefault();
                this.openGallery();
            });
        });

        // Close gallery modal
        document.getElementById('close-gallery').addEventListener('click', () => {
            this.closeGallery();
        });

        // Close modal when clicking outside
        document.getElementById('gallery-modal').addEventListener('click', (e) => {
            if (e.target.id === 'gallery-modal') {
                this.closeGallery();
            }
        });

        // Add photo button
        document.getElementById('add-photo-btn').addEventListener('click', () => {
            this.showUploadArea('image');
        });

        // Add video button
        document.getElementById('add-video-btn').addEventListener('click', () => {
            this.showUploadArea('video');
        });

        // File input change
        document.getElementById('file-input').addEventListener('change', (e) => {
            this.handleFileUpload(e.target.files);
        });

        // Drag and drop functionality
        const uploadArea = document.getElementById('upload-area');
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            this.handleFileUpload(e.dataTransfer.files);
        });

        // Click to upload
        uploadArea.addEventListener('click', () => {
            document.getElementById('file-input').click();
        });
    }

    openGallery() {
        document.getElementById('gallery-modal').style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    closeGallery() {
        document.getElementById('gallery-modal').style.display = 'none';
        document.body.style.overflow = 'auto';
        document.getElementById('upload-area').classList.add('hidden');
    }

    showUploadArea(type) {
        const uploadArea = document.getElementById('upload-area');
        const fileInput = document.getElementById('file-input');
        
        uploadArea.classList.remove('hidden');
        
        if (type === 'image') {
            fileInput.accept = 'image/*';
        } else if (type === 'video') {
            fileInput.accept = 'video/*';
        }
    }

    handleFileUpload(files) {
        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) {
                this.addImageToGallery(file);
            } else if (file.type.startsWith('video/')) {
                this.addVideoToGallery(file);
            }
        });
        
        // Hide upload area after upload
        document.getElementById('upload-area').classList.add('hidden');
    }

    addImageToGallery(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const galleryItem = {
                type: 'image',
                src: e.target.result,
                name: file.name,
                date: new Date().toLocaleDateString('uz-UZ')
            };
            
            this.gallery.push(galleryItem);
            this.renderGallery();
            this.saveGallery();
        };
        reader.readAsDataURL(file);
    }

    addVideoToGallery(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const galleryItem = {
                type: 'video',
                src: e.target.result,
                name: file.name,
                date: new Date().toLocaleDateString('uz-UZ')
            };
            
            this.gallery.push(galleryItem);
            this.renderGallery();
            this.saveGallery();
        };
        reader.readAsDataURL(file);
    }

    renderGallery() {
        const galleryGrid = document.getElementById('gallery-grid');
        galleryGrid.innerHTML = '';
        
        this.gallery.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'gallery-item';
            
            if (item.type === 'image') {
                itemElement.innerHTML = `
                    <img src="${item.src}" alt="${item.name}" onclick="photoGallery.showFullscreen('${item.src}')">
                    <div class="absolute top-2 right-2">
                        <button onclick="photoGallery.deleteItem(${index})" class="bg-red-500 text-white rounded-full w-6 h-6 text-sm hover:bg-red-600">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                    <div class="p-2 bg-white">
                        <p class="text-sm font-semibold">${item.name}</p>
                        <p class="text-xs text-gray-500">${item.date}</p>
                    </div>
                `;
            } else {
                itemElement.innerHTML = `
                    <video src="${item.src}" controls></video>
                    <div class="absolute top-2 right-2">
                        <button onclick="photoGallery.deleteItem(${index})" class="bg-red-500 text-white rounded-full w-6 h-6 text-sm hover:bg-red-600">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                    <div class="p-2 bg-white">
                        <p class="text-sm font-semibold">${item.name}</p>
                        <p class="text-xs text-gray-500">${item.date}</p>
                    </div>
                `;
            }
            
            galleryGrid.appendChild(itemElement);
        });
    }

    deleteItem(index) {
        if (confirm('Bu elementni o\'chirishni xohlaysizmi?')) {
            this.gallery.splice(index, 1);
            this.renderGallery();
            this.saveGallery();
        }
    }

    showFullscreen(src) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 2000;
            display: flex;
            justify-content: center;
            align-items: center;
        `;
        
        modal.innerHTML = `
            <img src="${src}" style="max-width: 90%; max-height: 90%; object-fit: contain;">
            <button onclick="this.parentElement.remove()" style="position: absolute; top: 20px; right: 20px; background: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer;">&times;</button>
        `;
        
        document.body.appendChild(modal);
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    saveGallery() {
        localStorage.setItem('uzbekistan-gallery', JSON.stringify(this.gallery));
    }

    loadGallery() {
        const saved = localStorage.getItem('uzbekistan-gallery');
        if (saved) {
            this.gallery = JSON.parse(saved);
            this.renderGallery();
        }
    }
}

// Initialize Photo Gallery
const photoGallery = new PhotoGallery();

// Add gallery buttons to existing photo gallery section
document.addEventListener('DOMContentLoaded', () => {
    const photoSection = document.querySelector('section:has(.fa-camera)');
    if (photoSection) {
        const galleryButtons = document.createElement('div');
        galleryButtons.className = 'flex justify-center space-x-4 mt-8';
        galleryButtons.innerHTML = `
            <button onclick="photoGallery.openGallery()" class="bg-uzbek-blue text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                <i class="fas fa-camera mr-2"></i>Foto Galereya
            </button>
            <button onclick="photoGallery.openGallery()" class="bg-uzbek-green text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
                <i class="fas fa-video mr-2"></i>Video Galereya
            </button>
        `;
        photoSection.appendChild(galleryButtons);
    }
});

// Enhanced Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        photoGallery.closeGallery();
        closeSearchModal();
        closeResultsModal();
    }
    
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        showSearchModal();
    }
    
    // Ctrl/Cmd + L for language switcher
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        showLanguageSwitcher();
    }
});

// Error handling for all functions
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    showNotification('Biror xatolik yuz berdi. Iltimos, sahifani yangilang.', 'error');
});

// Global error handler for async operations
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    showNotification('Tizimda xatolik yuz berdi.', 'error');
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS for animations and modals
const style = document.createElement('style');
style.textContent = `
    .animate-fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .gallery-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 1000;
        display: none;
        justify-content: center;
        align-items: center;
    }
    
    .gallery-content {
        background: white;
        border-radius: 12px;
        padding: 20px;
        max-width: 90%;
        max-height: 90%;
        overflow-y: auto;
    }
    
    .gallery-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 15px;
        margin-top: 20px;
    }
    
    .gallery-item {
        position: relative;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .gallery-item img {
        width: 100%;
        height: 150px;
        object-fit: cover;
    }
    
    .gallery-item video {
        width: 100%;
        height: 150px;
        object-fit: cover;
    }
    
    .upload-area {
        border: 2px dashed #ccc;
        border-radius: 8px;
        padding: 40px;
        text-align: center;
        cursor: pointer;
        transition: border-color 0.3s ease;
    }
    
    .upload-area:hover {
        border-color: #1e40af;
    }
    
    .upload-area.dragover {
        border-color: #1e40af;
        background-color: #f0f9ff;
    }
    
    body:not(.loaded) {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);
