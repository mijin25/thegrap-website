// Navbar 컴포넌트 자동 초기화
document.addEventListener('DOMContentLoaded', function() {
    // navbar-container가 있으면 컴포넌트로 렌더링
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        const navbar = new Navbar({
            logoLink: 'index.html',
            menuItems: [
                { text: 'About', link: 'about.html' },
                { text: 'Work', link: 'work.html' },
                { text: 'All by Designers', link: 'designers.html' },
                { text: 'Contact', link: 'contact.html' }
            ],
            enableBlendMode: true // hero section이 있는 페이지에서만
        });
        
        navbarContainer.innerHTML = navbar.render();
        navbar.init();
        
        // 폰트 로딩 완료 후 폰트 스무딩 적용
        function applyFontSmoothing() {
            const navbarElement = document.querySelector('.navbar');
            if (navbarElement) {
                // 폰트 스무딩 속성들
                const fontSmoothingProps = {
                    webkitFontSmoothing: 'antialiased',
                    mozOsxFontSmoothing: 'grayscale',
                    textRendering: 'optimizeLegibility',
                    fontFeatureSettings: '"kern" 1',
                    fontKerning: 'normal'
                };
                
                // navbar 요소에 적용
                Object.entries(fontSmoothingProps).forEach(([prop, value]) => {
                    navbarElement.style[prop] = value;
                });
                
                // 모든 하위 요소에도 적용
                const navbarChildren = navbarElement.querySelectorAll('*');
                navbarChildren.forEach(child => {
                    Object.entries(fontSmoothingProps).forEach(([prop, value]) => {
                        child.style[prop] = value;
                    });
                });
                
                console.log('Font smoothing applied to navbar');
            }
        }
        
        // 폰트 로딩 완료 대기 및 상태 확인
        function waitForFonts() {
            if (document.fonts && document.fonts.ready) {
                // 두 폰트 모두 로딩 확인
                const fontsToCheck = ['PP Neue Montreal', 'Kakao Small Sans'];
                const fontPromises = fontsToCheck.map(font => 
                    document.fonts.load(`400 16px "${font}"`)
                );
                
                Promise.allSettled(fontPromises).then((results) => {
                    results.forEach((result, index) => {
                        if (result.status === 'fulfilled') {
                            console.log(`${fontsToCheck[index]} font loaded successfully`);
                        } else {
                            console.log(`${fontsToCheck[index]} font failed to load, using fallback`);
                        }
                    });
                    
                    document.body.classList.remove('fonts-loading');
                    document.body.classList.add('fonts-loaded');
                    applyFontSmoothing();
                });
                
                // 전체 폰트 로딩 완료 대기 (백업)
                document.fonts.ready.then(() => {
                    applyFontSmoothing();
                });
            } else {
                // 폰트 로딩 API가 없는 경우 즉시 적용
                setTimeout(applyFontSmoothing, 100);
            }
        }
        
        waitForFonts();
        
        console.log('Navbar component rendered and initialized');
    }
    
    // 기존 navbar가 있으면 자동으로 초기화 (하위 호환성)
    const existingNavbar = document.querySelector('.navbar');
    if (existingNavbar && !navbarContainer) {
        const navbar = new Navbar({
            enableBlendMode: true
        });
        navbar.init();
    }
});

// 부드러운 스크롤 효과
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// 스크롤 진행률 표시
document.addEventListener('DOMContentLoaded', function() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: #CCFF00;
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    function updateProgressBar() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    }
    
    window.addEventListener('scroll', updateProgressBar);
});


// 텍스트 애니메이션
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('h1, h2, h3, p');
    // 히어로 섹션 텍스트는 애니메이션에서 제외
    animatedElements.forEach(element => {
        if (!element.closest('.hero-section')) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        }
    });
});

// 패럴랙스 효과 제거됨 - 히어로 섹션은 정적

// Navbar 컴포넌트
class Navbar {
    constructor(options = {}) {
        this.options = {
            logoLink: options.logoLink || 'index.html',
            menuItems: options.menuItems || [
                { text: 'Work', link: 'work.html' },
                { text: 'About', link: 'about.html' },
                { text: 'Contact', link: 'contact.html' }
            ],
            enableBlendMode: options.enableBlendMode !== false, // 기본값 true
            ...options
        };
    }
    
    render() {
        return `
            <nav class="navbar">
                <div class="nav-container">
                    <div class="nav-left">
                        <div class="nav-logo">
                            <a href="${this.options.logoLink}">
                                <img src="assets/logo.svg" alt="The Grap Logo">
                            </a>
                        </div>
                    </div>
                    <div class="nav-right">
                        <div class="nav-menu">
                            ${this.options.menuItems.map(item => 
                                `<a href="${item.link}" class="nav-link">${item.text}</a>`
                            ).join('')}
                        </div>
                        <div class="nav-icon">
                            <img src="assets/icon_dark-mode.svg" alt="Theme Toggle" id="theme-toggle">
                        </div>
                    </div>
                </div>
            </nav>
        `;
    }
    
    // Navbar 초기화 및 이벤트 설정
    init() {
        // 테마 토글 기능
        const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;
        
        if (themeToggle) {
            // 현재 테마 상태 확인
            let isDarkMode = localStorage.getItem('theme') === 'dark';
            
            // 초기 테마 적용
            if (isDarkMode) {
                body.setAttribute('data-theme', 'dark');
                themeToggle.src = 'assets/icon_light-mode.svg';
            } else {
                body.setAttribute('data-theme', 'light');
                themeToggle.src = 'assets/icon_dark-mode.svg';
            }
            
            // 테마 토글 이벤트
            themeToggle.addEventListener('click', function() {
                isDarkMode = !isDarkMode;
                
                if (isDarkMode) {
                    body.setAttribute('data-theme', 'dark');
                    themeToggle.src = 'assets/icon_light-mode.svg';
                    localStorage.setItem('theme', 'dark');
                } else {
                    body.setAttribute('data-theme', 'light');
                    themeToggle.src = 'assets/icon_dark-mode.svg';
                    localStorage.setItem('theme', 'light');
                }
            });
        }
        
        // Blend mode 기능 (옵션)
        if (this.options.enableBlendMode) {
            this.initBlendMode();
        }
    }
    
    // Blend mode 초기화
    initBlendMode() {
        const navbar = document.querySelector('.navbar');
        const heroSection = document.querySelector('.hero-section');
        
        if (navbar && heroSection) {
            function handleScroll() {
                const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
                const scrollY = window.scrollY;
                
                console.log(`Scroll: ${scrollY}, Hero Bottom: ${heroBottom}`);
                
                if (scrollY > heroBottom) {
                    navbar.classList.add('blend-mode');
                    console.log('✅ Blend mode activated - navbar elements should be visible on white background');
                } else {
                    navbar.classList.remove('blend-mode');
                    console.log('⚪ Blend mode deactivated - navbar elements are white in hero section');
                }
            }
            
            window.addEventListener('scroll', handleScroll);
            handleScroll(); // 초기 실행
        }
    }
}

// Project Card 컴포넌트
class ProjectCard {
    constructor(data) {
        this.data = data;
    }
    
    // 색상 기반 placeholder 생성
    generateColorPlaceholder() {
        const colors = this.data.placeholderColors || ["#667eea", "#764ba2"];
        const gradient = `linear-gradient(135deg, ${colors.join(', ')})`;
        return gradient;
    }
    
    render() {
        const placeholderGradient = this.generateColorPlaceholder();
        
        return `
            <div class="project-card ${this.data.isLarge ? 'project-card-large' : ''}">
                <div class="project-cover">
                    <img src="${this.data.image}" alt="${this.data.title}" class="project-image" 
                         onload="this.nextElementSibling.style.display='none';" 
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="project-placeholder" style="background: ${placeholderGradient};">
                        <span>${this.data.title}</span>
                    </div>
                </div>
                <div class="project-info">
                    <div class="project-name-and-tags">
                        <h3>${this.data.title}</h3>
                        <p>${this.data.tags}</p>
                    </div>
                    <div class="project-year">
                        <p>( ${this.data.year} )</p>
                    </div>
                </div>
            </div>
        `;
    }
}

// 프로젝트 데이터 (Figma 디자인 기반)
const projectsData = [
    {
        title: "SKON 2.0 App",
        tags: "UI/UX, App, Groupware, Illustation",
        year: "2023",
        image: "assets/work/sk-skon_00-hero.webp",
        isLarge: true,
        placeholderColors: ["#4A90E2", "#7B68EE", "#FF6B6B"]
    },
    {
        title: "Entertainment Website Builder",
        tags: "Entertainment, CMS, AI",
        year: "2025",
        image: "assets/work/ent-website-builder_00-hero.webp",
        isLarge: false,
        placeholderColors: ["#FF9A9E", "#FECFEF", "#FECFEF"]
    },
    {
        title: "2025 LEE GIKWANG SOLO CONCERT [OBSESSED] IN HONGKONG",
        tags: "Kpop Agency, Show, Performance",
        year: "2025",
        image: "assets/work/2025-lee-gikwang-solo-concert-hk_00-hero.jpg",
        isLarge: false,
        placeholderColors: ["#667eea", "#764ba2", "#f093fb"]
    },
    {
        title: "Ophily Brand Website",
        tags: "Shopping Mall, Cafe 24",
        year: "2024",
        image: "assets/work/opily-website_00-hero.webp",
        isLarge: false,
        placeholderColors: ["#4facfe", "#00f2fe", "#43e97b"]
    },
    {
        title: "Samsung EPP Referral Program",
        tags: "Visual Identity, Advertising",
        year: "2024",
        image: "assets/work/samsung-referral-program_00-hero.webp",
        isLarge: false,
        placeholderColors: ["#fa709a", "#fee140", "#ffecd2"]
    }
];

// 프로젝트 카드 렌더링
document.addEventListener('DOMContentLoaded', function() {
    const projectGrid = document.getElementById('project-grid');
    
    if (projectGrid) {
        // 모든 카드를 순서대로 렌더링 (CSS Grid가 자동으로 배치)
        const allCards = projectsData.map(projectData => {
            const card = new ProjectCard(projectData);
            return card.render();
        }).join('');
        
        projectGrid.innerHTML = allCards;
        console.log('Project cards rendered successfully');
    }
});

// 휠 이벤트는 HTML 인라인 스크립트에서 처리됨

// 리사이즈 이벤트 처리
window.addEventListener('resize', function() {
    // 리사이즈 시 필요한 로직 (히어로 섹션 높이 조정 제거됨)
});

// 페이지 로드 완료 후 초기화
window.addEventListener('load', function() {
    // 모든 리소스 로드 완료 후 실행
    document.body.style.opacity = '1';
    
    // 히어로 섹션 높이 조정 제거됨
});

// 키보드 접근성
document.addEventListener('keydown', function(e) {
    // ESC 키로 모달 닫기 등
    if (e.key === 'Escape') {
        // ESC 키 처리 로직
    }
    
    // Tab 키로 포커스 관리
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

// 마우스 사용 시 키보드 네비게이션 클래스 제거
document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// 터치 디바이스 지원
document.addEventListener('touchstart', function() {
    document.body.classList.add('touch-device');
});

// 성능 최적화를 위한 디바운스 함수
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 스크롤 이벤트 최적화
const optimizedScrollHandler = debounce(function() {
    // 스크롤 관련 로직
}, 16); // 60fps

window.addEventListener('scroll', optimizedScrollHandler);

// 리사이즈 이벤트 최적화
const optimizedResizeHandler = debounce(function() {
    // 리사이즈 관련 로직
}, 250);

window.addEventListener('resize', optimizedResizeHandler);

// 히어로 섹션은 CSS 애니메이션만 사용 (JavaScript 인터랙션 제거됨)
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - hero section uses CSS animation only');

    const hugeText = document.querySelector('.huge-text');
    console.log('Huge text found:', hugeText);

    // 휠 스크롤로 텍스트 이동 애니메이션 (The Grap 스타일)
    if (hugeText) {
        // The Grap 스타일 초기 설정
        hugeText.style.willChange = 'transform';
        hugeText.style.transformStyle = 'preserve-3d';
        
        // The Grap 스타일 스크롤 기반 인터랙션
        let currentScrollY = 0;
        let targetTranslateX = 0;
        let currentTranslateX = 0;
        
        // 스크롤 이벤트로 텍스트 위치 계산
        function updateTextPosition() {
            const scrollY = window.scrollY;
            const scrollDelta = scrollY - currentScrollY;
            
            // 스크롤에 따라 텍스트 위치 계산 (The Grap 스타일)
            targetTranslateX -= scrollDelta * 0.5; // 스크롤 속도에 비례한 이동
            
            // 부드러운 애니메이션을 위한 lerp
            currentTranslateX += (targetTranslateX - currentTranslateX) * 0.1;
            
            // The Grap과 동일한 transform 스타일 적용
            hugeText.style.transform = `translate3d(${currentTranslateX}px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`;
            
            currentScrollY = scrollY;
        }
        
        // 스크롤 이벤트 리스너
        window.addEventListener('scroll', updateTextPosition, { passive: true });
        
        // 초기 위치 설정
        updateTextPosition();
        console.log('The Grap style scroll-based text interaction initialized');
    } else {
        console.log('Huge text not found!');
    }
});

// 커스텀 커서 기능 - 성능 최적화 단일 커서
document.addEventListener('DOMContentLoaded', function() {
    const customCursor = document.querySelector('.custom-cursor');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!customCursor) return;
    
    // 마우스 이동 이벤트 - 단일 커서
    document.addEventListener('mousemove', function(e) {
        const { clientX: x, clientY: y } = e;
        customCursor.style.left = `${x}px`;
        customCursor.style.top = `${y}px`;
    });
    
    // 프로젝트 카드에 마우스 진입/벗어남
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            customCursor.classList.add('hover');
        });
        
        card.addEventListener('mouseleave', function() {
            customCursor.classList.remove('hover');
        });
    });
    
    // 선택 가능한 요소들에 호버 이벤트 추가
    const interactiveElements = document.querySelectorAll('a, button, .nav-link, [role="button"], input[type="button"], input[type="submit"]');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            customCursor.classList.add('interactive');
        });
        
        element.addEventListener('mouseleave', function() {
            customCursor.classList.remove('interactive');
        });
    });
    
    // 페이지를 벗어날 때 커서 숨김
    document.addEventListener('mouseleave', function() {
        customCursor.classList.remove('hover');
        customCursor.classList.remove('interactive');
    });
    
    console.log('Custom cursor initialized - optimized single cursor');
});

// Services 섹션 스크롤 기반 활성화 + 마우스 호버 인터랙션 (Envato Elements 스타일)
document.addEventListener('DOMContentLoaded', function() {
    const serviceItems = document.querySelectorAll('.service-item');
    const serviceListContainer = document.querySelector('.service-list-container');
    
    if (serviceItems.length === 0 || !serviceListContainer) return;
    
    // 모바일 환경 감지
    const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // 스크롤 기반 활성화만 사용 (마우스 호버 제거)
    
    // 현재 활성화된 아이템 인덱스 (순서: 01, 02, 03)
    let activeItemIndex = 0; // service-item-01이 기본 활성화
    
    // 부드러운 애니메이션을 위한 lerp 함수
    function lerp(start, end, factor) {
        return start + (end - start) * factor;
    }
    
    // 스크롤 위치에 따라 활성화된 아이템 감지 및 색상 변경
    function updateActiveItem() {
        const windowHeight = window.innerHeight;
        const viewportCenter = windowHeight / 2; // 뷰포트 중앙
        
        let newActiveIndex = 0;
        let minDistance = Infinity;
        
        serviceItems.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const itemCenter = rect.top + rect.height / 2;
            
            // 뷰포트 중앙과 아이템 중앙 사이의 거리 계산
            const distance = Math.abs(viewportCenter - itemCenter);
            
            if (distance < minDistance) {
                minDistance = distance;
                newActiveIndex = index;
            }
        });
        
        // 활성화된 아이템이 변경되었을 때만 색상 업데이트
        if (newActiveIndex !== activeItemIndex) {
            activeItemIndex = newActiveIndex;
            updateItemColors();
        }
    }
    
    // 아이템 색상 업데이트 (Envato Elements 스타일: 스크롤 기반 활성화)
    function updateItemColors() {
        console.log('updateItemColors called - activeItemIndex:', activeItemIndex);
        
        serviceItems.forEach((item, index) => {
            if (index === activeItemIndex) {
                // 스크롤로 활성화된 아이템
                item.classList.add('active');
                console.log('Item', index, 'set to active');
            } else {
                // 비활성화된 아이템
                item.classList.remove('active');
                console.log('Item', index, 'set to inactive');
            }
        });
    }
    
    // Envato Elements 스타일: 스크롤 기반 활성화만 사용 (마우스 움직임 제거)
    
    // Envato Elements 스타일: 스크롤 기반 활성화만 사용 (마우스 이벤트 제거)
    
    // 스크롤 이벤트로 활성화된 아이템 감지
    window.addEventListener('scroll', updateActiveItem, { passive: true });
    
    // 초기 설정: 스크롤 기반 활성화
    activeItemIndex = 0; // service-item-01 강제 활성화
    
    // 모든 카드의 클래스를 강제로 초기화
    serviceItems.forEach((item, index) => {
        item.classList.remove('active');
    });
    
    // 첫 번째 카드만 활성화
    serviceItems[0].classList.add('active');
    
    // 디버깅: 초기 상태 확인
    console.log('Initial activeItemIndex:', activeItemIndex);
    console.log('service-item-01 classes:', serviceItems[0].classList.toString());
    console.log('service-item-02 classes:', serviceItems[1].classList.toString());
    console.log('service-item-03 classes:', serviceItems[2].classList.toString());
    
    console.log('Services section scroll-based activation + mouse interaction initialized - Envato Elements style');
});
