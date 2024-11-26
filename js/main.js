// 确保 translations 对象可用
let currentLang = 'zh';  // 默认语言为中文

// 切换语言函数
function switchLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    
    // 获取所有需要翻译的元素
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });

    // 更新当前语言显示
    const currentFlag = document.querySelector('.current-flag');
    const currentLangText = document.querySelector('.current-lang');
    
    if (translations[lang]) {
        if (currentFlag) currentFlag.src = translations[lang].flag;
        if (currentLangText) currentLangText.textContent = translations[lang].name;
    }

    // 保存语言选择到 localStorage
    localStorage.setItem('selectedLanguage', lang);
    
    // 关闭语言选择菜单
    const languageMenu = document.querySelector('.language-menu');
    if (languageMenu) {
        languageMenu.classList.remove('show');
    }
}

// 初始化页面语言
document.addEventListener('DOMContentLoaded', function() {
    // 创建语言菜单
    const languageMenu = document.createElement('div');
    languageMenu.className = 'language-menu';
    
    // 添加语言选项
    const languages = ['zh', 'en', 'pt'];
    languages.forEach(lang => {
        if (translations[lang]) {
            const option = document.createElement('div');
            option.className = 'language-option';
            option.innerHTML = `
                <img src="${translations[lang].flag}" alt="${translations[lang].name}">
                <span>${translations[lang].name}</span>
            `;
            option.addEventListener('click', (e) => {
                switchLanguage(lang);
                languageMenu.classList.remove('show');
                e.stopPropagation();
            });
            languageMenu.appendChild(option);
        }
    });
    
    // 添加语言菜单到选择器
    const languageSelector = document.getElementById('language-selector');
    if (languageSelector) {
        languageSelector.appendChild(languageMenu);
        
        // 切换菜单显示/隐藏
        languageSelector.addEventListener('click', function(e) {
            e.stopPropagation();
            languageMenu.classList.toggle('show');
        });
    }
    
    // 点击页面其他地方关闭菜单
    document.addEventListener('click', function() {
        languageMenu.classList.remove('show');
    });
    
    // 初始化默认语言
    const savedLang = localStorage.getItem('selectedLanguage') || currentLang;
    switchLanguage(savedLang);
});

function showQRCode(type) {
    const modal = document.getElementById('qrModal');
    const modalImg = document.getElementById('modalQRCode');
    const modalTitle = document.getElementById('modalTitle');
    const currentLang = localStorage.getItem('selectedLanguage') || 'zh';
    
    if (type === 'wechat') {
        modalImg.src = 'images/weix.jpg';
        modalTitle.textContent = translations[currentLang].modal_wechat_title;
    } else if (type === 'whatsapp') {
        modalImg.src = 'images/WhatsApp.jpg';
        modalTitle.textContent = translations[currentLang].modal_whatsapp_title;
    }
    
    modal.style.display = 'block';
} 