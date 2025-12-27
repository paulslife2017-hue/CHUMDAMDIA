// 청담디아 메인 JavaScript - 향상된 기능

let currentLang = 'ko';

// DOM 로드 완료
document.addEventListener('DOMContentLoaded', function() {
    initLanguage();
    initHeader();
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initForm();
});

// 언어 초기화
function initLanguage() {
    // 브라우저 언어 감지
    const browserLang = navigator.language.toLowerCase();
    const supportedLangs = ['ko', 'en', 'ja', 'tw'];
    
    // 브라우저 언어 매핑
    let detectedLang = 'en'; // 기본값을 영어로 설정 (그 외 국가)
    
    // 한국어 감지
    if (browserLang.startsWith('ko')) {
        detectedLang = 'ko';
    }
    // 영어 감지
    else if (browserLang.startsWith('en')) {
        detectedLang = 'en';
    }
    // 일본어 감지
    else if (browserLang.startsWith('ja')) {
        detectedLang = 'ja';
    }
    // 중국어 감지 (대만, 홍콩, 중국 모두 번체중국어로 처리)
    else if (browserLang.startsWith('zh')) {
        // zh-TW (대만), zh-HK (홍콩), zh-CN (중국), zh-SG (싱가포르) 등
        // 모두 번체중국어(tw)로 통일
        detectedLang = 'tw';
    }
    
    // 저장된 언어 확인 (사용자가 명시적으로 선택한 경우 우선)
    const savedLang = localStorage.getItem('chungdamdia-lang');
    currentLang = savedLang && supportedLangs.includes(savedLang) ? savedLang : detectedLang;
    
    // 언어 적용
    setLanguage(currentLang);
    
    // 언어 버튼 이벤트
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
        });
    });
    
    // 디버깅: 감지된 언어 로그
    console.log('Browser Language:', navigator.language);
    console.log('Detected Language:', detectedLang);
    console.log('Current Language:', currentLang);
}

// 언어 변경
function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('chungdamdia-lang', lang);
    document.documentElement.lang = lang;
    
    // 텍스트 번역
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getTranslation(key, lang);
        if (translation !== undefined && translation !== null) {
            // HTML 태그가 포함된 경우 innerHTML 사용 (예: reviews-average-rating)
            if (key === 'reviews-average-rating') {
                element.innerHTML = translation;
            } else {
                element.textContent = translation;
            }
        }
    });
    
    // Placeholder 번역
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        const translation = getTranslation(key, lang);
        if (translation) {
            element.placeholder = translation;
        }
    });
    
    // Select Option 번역
    document.querySelectorAll('option[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getTranslation(key, lang);
        if (translation) {
            element.textContent = translation;
        }
    });
    
    // 메타 태그 업데이트
    updateMetaTags(lang);
    
    // 활성 버튼
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// 번역 가져오기
function getTranslation(key, lang = currentLang) {
    if (translations[lang] && translations[lang][key]) {
        return translations[lang][key];
    }
    return translations['ko'][key] || key;
}

// 메타 태그 업데이트
function updateMetaTags(lang) {
    const titleMap = {
        ko: '청담디아 | 프리미엄 피부 클리닉 | 청담동 피부관리 전문',
        en: 'Chungdam DIA | Premium Skin Clinic | Seoul Gangnam',
        ja: 'チョンダムディア | プレミアムスキンクリニック | ソウル江南',
        tw: '清潭DIA | 頂級皮膚診所 | 首爾江南'
    };
    
    const descMap = {
        ko: '청담동 프리미엄 피부 클리닉 청담디아. 정밀 피부 진단, 맞춤형 레이저 시술, 필러, 보톡스, 리프팅 전문.',
        en: 'Chungdam DIA Premium Skin Clinic. Specialized in precise skin diagnosis, customized laser treatment, filler, botox, lifting.',
        ja: 'チョンダムディアプレミアムスキンクリニック。精密な肌診断、カスタマイズされたレーザー施術、フィラー、ボトックス、リフティング専門。',
        tw: '清潭DIA頂級皮膚診所。專精於精密皮膚診斷、客製化雷射療程、填充劑、肉毒桿菌、提升。'
    };
    
    document.title = titleMap[lang];
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = descMap[lang];
    
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = titleMap[lang];
    
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.content = descMap[lang];
}

// 헤더 스크롤
function initHeader() {
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// 모바일 메뉴
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.nav');
    
    if (toggle && nav) {
        toggle.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('mobile-active');
            document.body.style.overflow = nav.classList.contains('mobile-active') ? 'hidden' : '';
        });
        
        // 링크 클릭 시 메뉴 닫기
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                toggle.classList.remove('active');
                nav.classList.remove('mobile-active');
                document.body.style.overflow = '';
            });
        });
    }
}

// 부드러운 스크롤
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 스크롤 애니메이션
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);
    
    // 애니메이션 적용
    document.querySelectorAll('.card-reveal').forEach(el => {
        observer.observe(el);
    });
    
    // 추가 요소들
    document.querySelectorAll('.philosophy-card, .program-card, .doctor-card, .gallery-item').forEach(el => {
        el.classList.add('card-reveal');
        observer.observe(el);
    });
}

// 폼 제출
function initForm() {
    const form = document.getElementById('reservationForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 폼 데이터 수집
            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                program: formData.get('program'),
                message: formData.get('message'),
                language: currentLang,
                timestamp: new Date().toISOString()
            };
            
            // 여기에 실제 API 호출 로직 추가
            console.log('예약 신청:', data);
            
            // 성공 메시지
            const messages = {
                ko: '예약 신청이 완료되었습니다.\n빠른 시일 내에 연락드리겠습니다.\n\n감사합니다.',
                en: 'Your reservation has been submitted.\nWe will contact you soon.\n\nThank you.',
                ja: 'ご予約を承りました。\n早急にご連絡いたします。\n\nありがとうございます。',
                tw: '您的預約已提交。\n我們會盡快與您聯繫。\n\n謝謝。'
            };
            
            alert(messages[currentLang] || messages.ko);
            
            // 폼 초기화
            this.reset();
            
            // 폼 제출 후 스크롤
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        // 입력 필드 검증
        const inputs = form.querySelectorAll('input[required], select[required]');
        inputs.forEach(input => {
            input.addEventListener('invalid', function(e) {
                e.preventDefault();
                this.classList.add('error');
            });
            
            input.addEventListener('input', function() {
                this.classList.remove('error');
            });
        });
    }
}

// Parallax 효과 (선택적)
function initParallax() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// 이미지 지연 로딩
function initLazyLoad() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// 페이지 가시성 변경 시
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        // 페이지가 다시 활성화되었을 때
        console.log('Page is visible');
    }
});

// 에러 핸들링
window.addEventListener('error', function(e) {
    console.error('Error occurred:', e.error);
});

// 페이지 언로드 시
window.addEventListener('beforeunload', function() {
    // 필요한 정리 작업
});

// 리사이즈 디바운싱
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        console.log('Window resized');
        // 리사이즈 후 필요한 작업
    }, 250);
});

// 유틸리티 함수들
const utils = {
    // 요소가 뷰포트에 있는지 확인
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // 디바운스
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // 스로틀
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// 성능 모니터링 (개발 환경)
if (window.performance && window.performance.timing) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page load time: ${pageLoadTime}ms`);
        }, 0);
    });
}
