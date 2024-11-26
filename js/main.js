function switchLanguage(lang) {
    localStorage.setItem('selectedLanguage', lang);
    
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    const currentFlag = document.querySelector('#language-selector .current-flag');
    const currentLang = document.querySelector('#language-selector .current-lang');
    if (currentFlag) {
        currentFlag.src = translations[lang].flag;
    }
    if (currentLang) {
        currentLang.textContent = translations[lang].name;
    }
}

function updateLanguageSelector() {
    const selector = document.getElementById('language-selector');
    const dropdown = document.createElement('div');
    dropdown.className = 'language-dropdown';
    dropdown.style.display = 'none';
    
    let isDropdownOpen = false;
    
    Object.keys(translations).forEach(langCode => {
        const option = document.createElement('div');
        option.className = 'language-option';
        option.innerHTML = `
            <img src="${translations[langCode].flag}" alt="${translations[langCode].name}" class="flag-icon">
            <span>${translations[langCode].name}</span>
        `;
        
        option.addEventListener('mousedown', (e) => {
            e.stopPropagation();
            switchLanguage(langCode);
            isDropdownOpen = false;
            dropdown.style.display = 'none';
        });
        
        dropdown.appendChild(option);
    });
    
    selector.addEventListener('click', (e) => {
        e.stopPropagation();
        isDropdownOpen = !isDropdownOpen;
        dropdown.style.display = isDropdownOpen ? 'block' : 'none';
    });
    
    document.addEventListener('mousedown', (e) => {
        if (!selector.contains(e.target) && isDropdownOpen) {
            isDropdownOpen = false;
            dropdown.style.display = 'none';
        }
    });
    
    selector.appendChild(dropdown);
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'zh';
    switchLanguage(savedLanguage);
    updateLanguageSelector();
    
    // 初始化 clipboard.js
    var clipboard = new ClipboardJS('.copy-btn');
    
    // 复制成功回调
    clipboard.on('success', function(e) {
        const currentLang = localStorage.getItem('selectedLanguage') || 'zh';
        // 创建提示元素
        var tooltip = document.createElement('span');
        tooltip.className = 'copy-tooltip';
        // 根据当前语言显示提示文字
        tooltip.textContent = translations[currentLang].copy_success;
        
        // 根据父元素的类名设置不同的背景色
        if (e.trigger.closest('.wechat')) {
            tooltip.style.background = 'rgba(7, 193, 96, 0.9)';  // 微信绿色
        } else if (e.trigger.closest('.whatsapp')) {
            tooltip.style.background = 'rgba(37, 211, 102, 0.9)';  // WhatsApp绿色
        } else if (e.trigger.closest('.facebook')) {
            tooltip.style.background = 'rgba(24, 119, 242, 0.9)';  // Facebook蓝色
        } else if (e.trigger.closest('.email')) {
            tooltip.style.background = 'rgba(234, 67, 53, 0.9)';  // Gmail红色
        }
        
        // 将提示添加到按钮旁边
        e.trigger.appendChild(tooltip);
        
        // 显示提示
        requestAnimationFrame(function() {
            tooltip.classList.add('show');
        });
        
        // 移除提示
        setTimeout(function() {
            tooltip.classList.remove('show');
            setTimeout(function() {
                tooltip.remove();
            }, 300);
        }, 1500);
        
        e.clearSelection();
    });
    
    // 复制失败回调
    clipboard.on('error', function(e) {
        const currentLang = localStorage.getItem('selectedLanguage') || 'zh';
        var tooltip = document.createElement('span');
        tooltip.className = 'copy-tooltip';
        tooltip.textContent = translations[currentLang].copy_fail;
        
        // 错误提示统一使用红色
        tooltip.style.background = 'rgba(244, 67, 54, 0.9)';
        
        e.trigger.appendChild(tooltip);
        
        requestAnimationFrame(function() {
            tooltip.classList.add('show');
        });
        
        setTimeout(function() {
            tooltip.classList.remove('show');
            setTimeout(function() {
                tooltip.remove();
            }, 300);
        }, 1500);
    });
    
    // 添加滚动监听
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
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