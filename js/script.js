// 폰트 로딩 확인 및 처리
document.fonts.ready.then(() => {
    console.log('폰트 로딩 완료');
    document.body.classList.remove('fonts-loading');
    document.body.classList.add('fonts-loaded');
    
    // 폰트 로딩 완료 후 플립 효과 초기화
    setTimeout(() => {
        initFlipEffect();
    }, 100);
});

// 웹스토리보이 원본 플립 효과 함수
function initFlipEffect() {
    const flipElements = document.querySelectorAll('.js-flip');
    
    flipElements.forEach(element => {
        const flipItems = element.querySelectorAll('.m-flip_item');
        
        if (flipItems.length >= 2) {
            // 첫 번째 아이템의 높이를 계산하여 컨테이너 높이 설정
            const firstItemHeight = flipItems[0].offsetHeight;
            element.style.height = firstItemHeight + 'px';
            element.style.overflow = 'hidden'; // 컨테이너에서 overflow hidden 강제 설정
            element.dataset.height = firstItemHeight;
            
            // 초기 상태 설정 - 더 명확하게
            flipItems[0].style.position = 'relative';
            flipItems[0].style.top = '0px';
            flipItems[0].style.display = 'block';
            
            flipItems[1].style.position = 'absolute';
            flipItems[1].style.top = '100%';
            flipItems[1].style.left = '0';
            flipItems[1].style.display = 'block';
            
            // 호버 이벤트 추가
            element.addEventListener('mouseenter', function() {
                flipItems[0].style.top = -firstItemHeight + 'px';
                flipItems[1].style.top = '0px';
            });
            
            element.addEventListener('mouseleave', function() {
                flipItems[0].style.top = '0px';
                flipItems[1].style.top = '100%';
            });
        }
    });
}

// Kakao Small Sans 폰트 로딩 확인
if ('fonts' in document) {
    document.fonts.load('400 16px "Kakao Small Sans"').then(() => {
        console.log('Kakao Small Sans 폰트 로딩 완료');
    }).catch((error) => {
        console.error('Kakao Small Sans 폰트 로딩 실패:', error);
    });
}

// 공통 스크롤 인터랙션 클래스
class ScrollReveal {
    constructor(options = {}) {
        this.options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
            ...options
        };
        this.init();
    }

    init() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, this.options);

        // 모든 scroll-reveal 요소 관찰 시작
        document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale, .scroll-reveal-down').forEach(el => {
            this.observer.observe(el);
        });
    }

    // 새로운 요소 추가
    observe(element) {
        this.observer.observe(element);
    }

    // 요소 관찰 중단
    unobserve(element) {
        this.observer.unobserve(element);
    }
}

// 공통 리빌 인터랙션 클래스 (위에서 아래로)
class RevealUp {
    constructor(options = {}) {
        this.options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
            ...options
        };
        this.init();
    }

    init() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, this.options);

        // 모든 reveal-up 요소들을 관찰
        document.querySelectorAll('.reveal-up').forEach(el => {
            this.observer.observe(el);
        });
    }

    observe(element) {
        this.observer.observe(element);
    }

    unobserve(element) {
        this.observer.unobserve(element);
    }
}

// Navbar 컴포넌트 자동 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 로고 컴포넌트 초기화
    initLogoComponents();
    
    // navbar-container가 있으면 컴포넌트로 렌더링
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        const navbar = new Navbar({
            logoLink: 'index.html',
            menuItems: [
                { text: 'About', link: '#' },
                { text: 'Work', link: '#' },
                { text: 'All by Designers', link: '#' },
                { text: 'Contact', link: '#' }
            ],
            enableBlendMode: true // hero section이 있는 페이지에서만
        });
        
        navbarContainer.innerHTML = navbar.render();
        navbar.init();
        
        // 모바일 메뉴 초기화 (DOM이 완전히 렌더링된 후 실행)
        setTimeout(() => {
            initMobileMenu();
            initFlipEffect(); // 플립 효과 초기화
        }, 100);
        
        // 추가로 DOMContentLoaded 이벤트에서도 초기화
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initMobileMenu);
        } else {
            // 이미 로드된 경우 즉시 실행
            setTimeout(initMobileMenu, 50);
        }
        
        // 블렌드 모드 수동 테스트 함수 (디버깅용)
        window.testBlendMode = function() {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                navbar.classList.toggle('blend-mode');
                console.log('블렌드 모드 수동 토글:', navbar.classList.contains('blend-mode'));
            } else {
                console.log('navbar 요소를 찾을 수 없음');
            }
        };
        
        // 전역 함수로도 등록
        function testBlendMode() {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                navbar.classList.toggle('blend-mode');
                console.log('블렌드 모드 수동 토글:', navbar.classList.contains('blend-mode'));
            } else {
                console.log('navbar 요소를 찾을 수 없음');
            }
        }
        
        // 전역 스코프에 등록
        window.testBlendMode = testBlendMode;
        
        // 블렌드 모드 전역 초기화
        function initGlobalBlendMode() {
            console.log('블렌드 모드 초기화 시도 중...');
            
            // 여러 방법으로 요소 찾기
            const navbar = document.querySelector('.navbar') || 
                          document.querySelector('nav') || 
                          document.querySelector('[class*="nav"]');
            
            const heroSection = document.querySelector('.hero-carousel-section') || 
                               document.querySelector('#home') || 
                               document.querySelector('[class*="hero"]');
            
            console.log('찾은 요소들:', {
                navbar: navbar,
                heroSection: heroSection,
                navbarClass: navbar ? navbar.className : '없음',
                heroClass: heroSection ? heroSection.className : '없음'
            });
            
            if (navbar && heroSection) {
                function handleScroll() {
                    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
                    const scrollY = window.scrollY;
                    
                    console.log('스크롤 체크:', {
                        scrollY: scrollY,
                        heroBottom: heroBottom,
                        shouldBlend: scrollY > heroBottom
                    });
                    
                    if (scrollY > heroBottom) {
                        navbar.classList.add('blend-mode');
                        console.log('블렌드 모드 활성화');
                    } else {
                        navbar.classList.remove('blend-mode');
                        console.log('블렌드 모드 비활성화');
                    }
                }
                
                window.addEventListener('scroll', handleScroll, { passive: true });
                handleScroll();
                console.log('전역 블렌드 모드 초기화 완료');
                return true;
            } else {
                console.log('요소를 찾을 수 없음 - navbar:', !!navbar, 'heroSection:', !!heroSection);
                return false;
            }
        }
        
        // 즉시 실행
        initGlobalBlendMode();
        
        // 지연 실행
        setTimeout(initGlobalBlendMode, 100);
        setTimeout(initGlobalBlendMode, 500);
        setTimeout(initGlobalBlendMode, 1000);
        
        
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
                        // 폰트 로딩 상태 확인 (디버깅용 로그 제거)
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
        
    }
    
    // 기존 navbar가 있으면 자동으로 초기화 (하위 호환성)
    const existingNavbar = document.querySelector('.navbar');
    if (existingNavbar && !navbarContainer) {
        const navbar = new Navbar({
            enableBlendMode: true
        });
        navbar.init();
        
        // 플립 효과 초기화
        setTimeout(() => {
            initFlipEffect();
        }, 100);
    }
});

// 부드러운 스크롤 효과 - 향상된 버전
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // 네비게이션 바 높이 고려한 오프셋
                const navbarHeight = 80; // 네비게이션 바 높이
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 마우스 휠 스크롤 부드럽게 만들기
    let isScrolling = false;
    let scrollTimeout;
    let scrollVelocity = 0;
    let lastScrollTime = 0;
    
    function smoothScroll() {
        if (!isScrolling) {
            isScrolling = true;
            requestAnimationFrame(() => {
                isScrolling = false;
            });
        }
    }
    
    // 휠 이벤트 최적화 - 속도감과 탄력감 추가
    window.addEventListener('wheel', function(e) {
        const currentTime = Date.now();
        const deltaTime = currentTime - lastScrollTime;
        lastScrollTime = currentTime;
        
        // 스크롤 속도 계산
        scrollVelocity = Math.abs(e.deltaY);
        
        // 더 빠른 스크롤을 위한 가속도 적용
        if (scrollVelocity > 50) {
            // 빠른 스크롤 시 더 역동적인 효과
            document.body.style.scrollBehavior = 'auto';
            window.scrollBy(0, e.deltaY * 1.5);
            e.preventDefault();
        } else {
            // 일반 스크롤 시 부드러운 효과
            document.body.style.scrollBehavior = 'smooth';
        }
        
        smoothScroll();
        
        // 스크롤 완료 후 이벤트 정리
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
            scrollVelocity = 0;
        }, 100);
    }, { passive: false });
    
    // 키보드 스크롤 (Page Up/Down, 화살표 키) - 속도감과 탄력감 추가
    window.addEventListener('keydown', function(e) {
        // 히어로 캐러셀의 좌우 화살표 키는 제외
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            return; // 캐러셀 네비게이션을 위해 기본 동작 허용
        }
        
        if ([32, 33, 34, 35, 36, 37, 38, 39, 40].includes(e.keyCode)) {
            // 키보드 스크롤 시 더 역동적인 효과
            const scrollAmount = window.innerHeight * 0.8; // 화면 높이의 80%
            
            if (e.keyCode === 32 || e.keyCode === 34 || e.keyCode === 40) { // Space, Page Down, Down Arrow
                window.scrollBy({
                    top: scrollAmount,
                    behavior: 'smooth'
                });
            } else if (e.keyCode === 33 || e.keyCode === 38) { // Page Up, Up Arrow
                window.scrollBy({
                    top: -scrollAmount,
                    behavior: 'smooth'
                });
            } else if (e.keyCode === 35) { // End
                window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: 'smooth'
                });
            } else if (e.keyCode === 36) { // Home
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
            
            e.preventDefault();
            smoothScroll();
        }
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
    
    window.addEventListener('scroll', updateProgressBar, { passive: true });
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
                { text: 'Work', link: '#' },
                { text: 'About', link: '#' },
                { text: 'Contact', link: '#' }
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
                            ${createLogoComponent({ link: this.options.logoLink })}
                        </div>
                    </div>
                    <div class="nav-right">
                        <div class="nav-menu">
                            ${this.options.menuItems.map(item => 
                                `<a href="${item.link}" class="nav-link js-flip">
                                    <span class="m-flip_item">${item.text}</span>
                                    <span class="m-flip_item">${item.text}</span>
                                </a>`
                            ).join('')}
                        </div>
                        <div class="nav-icon">
                            <div class="theme-toggle-container">
                                <button id="theme-toggle" class="theme-toggle-btn">
                                    <svg id="theme-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M20.086 16.417C15.073 16.417 11.01 12.377 11.01 7.394C11.01 5.798 11.43 4.301 12.162 3C7.58 3.456 4 7.3 4 11.977C4 16.961 8.064 21 13.076 21C16.483 21 19.448 19.132 21 16.372C20.7 16.402 20.395 16.417 20.086 16.417Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div class="nav-icon nav-menu-icon" id="nav-menu-icon" onclick="openMobileMenu()">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 11H30" stroke="currentColor" stroke-width="1.5"/>
                                <path d="M2 21H30" stroke="currentColor" stroke-width="1.5"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </nav>
        `;
    }
    
    // 테마 아이콘 업데이트 함수
    updateThemeIcon(button, currentTheme) {
        const svg = button.querySelector('svg');
        if (!svg) return;
        
        if (currentTheme === 'dark') {
            // 다크모드일 때: 달 아이콘 표시 (다크모드 상태)
            svg.innerHTML = `
                <path fill-rule="evenodd" clip-rule="evenodd" d="M20.086 16.417C15.073 16.417 11.01 12.377 11.01 7.394C11.01 5.798 11.43 4.301 12.162 3C7.58 3.456 4 7.3 4 11.977C4 16.961 8.064 21 13.076 21C16.483 21 19.448 19.132 21 16.372C20.7 16.402 20.395 16.417 20.086 16.417Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
            `;
        } else {
            // 라이트모드일 때: 태양 아이콘 표시 (라이트모드 상태)
            svg.innerHTML = `
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.50096C13.5184 6.50096 14.8941 7.11648 15.8897 8.11109C16.8854 9.10665 17.5 10.4813 17.5 12.0005C17.5 13.5197 16.8844 14.8943 15.8897 15.8899C14.8941 16.8854 13.5184 17.5 12 17.5C10.4807 17.5 9.10592 16.8845 8.11027 15.8899C7.11462 14.8943 6.5 13.5197 6.5 12.0005C6.5 10.4813 7.11558 9.10665 8.11027 8.11109C9.10592 7.11553 10.4807 6.50096 12 6.50096Z" stroke="currentColor" stroke-width="1.5"/>
                <path d="M17.625 6.37498L18.7017 5.2983L19.7784 4.22163M4.22163 19.7784L5.29924 18.7008L6.37591 17.6241M19.9538 12H21.4774H23M1 12H2.52265H4.04623M17.625 17.6241L18.7017 18.7008L19.7784 19.7784M4.22163 4.22163L5.29924 5.2983L6.37591 6.37498M12.0317 4.04623V2.52265V1M12.0317 23V21.4764V19.9538" stroke="currentColor" stroke-width="1.5"/>
            `;
        }
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
                this.updateThemeIcon(themeToggle, 'dark');
            } else {
                body.setAttribute('data-theme', 'light');
                this.updateThemeIcon(themeToggle, 'light');
            }
            
            // 테마 토글 이벤트
            const self = this; // this 컨텍스트 보존
            themeToggle.addEventListener('click', function() {
                const heroSection = document.querySelector('.hero-section');
                
                // 히어로 영역에 페이드 효과 추가
                if (heroSection) {
                    heroSection.classList.add('theme-transitioning');
                }
                
                isDarkMode = !isDarkMode;
                
                if (isDarkMode) {
                    body.setAttribute('data-theme', 'dark');
                    self.updateThemeIcon(themeToggle, 'dark');
                    localStorage.setItem('theme', 'dark');
                } else {
                    body.setAttribute('data-theme', 'light');
                    self.updateThemeIcon(themeToggle, 'light');
                    localStorage.setItem('theme', 'light');
                }
                
                // 페이드 효과 제거 (전환 완료 후)
                setTimeout(() => {
                    if (heroSection) {
                        heroSection.classList.remove('theme-transitioning');
                    }
                }, 300); // 0.3초 후 제거
            });
        }
        
        // Blend mode 기능 (옵션) - 간단한 방법으로 교체
        if (this.options.enableBlendMode) {
            // 즉시 블렌드 모드 초기화
            this.initSimpleBlendMode();
        }
    }
    
    // 간단한 블렌드 모드 초기화
    initSimpleBlendMode() {
        const navbar = document.querySelector('.navbar');
        const heroSection = document.querySelector('.hero-carousel-section');
        
        if (navbar && heroSection) {
            function checkBlendMode() {
                const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
                const scrollY = window.scrollY;
                
                if (scrollY > heroBottom) {
                    navbar.classList.add('blend-mode');
                } else {
                    navbar.classList.remove('blend-mode');
                }
            }
            
            // 스크롤 이벤트 등록
            window.addEventListener('scroll', checkBlendMode, { passive: true });
            
            // 초기 실행
            checkBlendMode();
            
            console.log('간단한 블렌드 모드 초기화 완료');
        }
    }
    
    // Blend mode 초기화
    initBlendMode() {
        // 여러 방법으로 요소 찾기
        const navbar = document.querySelector('.navbar') || document.querySelector('nav.navbar');
        const heroSection = document.querySelector('.hero-carousel-section') || document.querySelector('#home');
        
        console.log('블렌드 모드 초기화:', {
            navbar: !!navbar,
            heroSection: !!heroSection,
            navbarElement: navbar,
            heroElement: heroSection
        });
        
        if (navbar && heroSection) {
            // 기존 스크롤 이벤트 리스너들을 모두 제거
            const existingListeners = window._blendModeListeners || [];
            existingListeners.forEach(listener => {
                window.removeEventListener('scroll', listener);
            });
            
            function handleScroll() {
                const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
                const scrollY = window.scrollY;
                
                console.log('스크롤 이벤트:', {
                    scrollY: scrollY,
                    heroBottom: heroBottom,
                    shouldBlend: scrollY > heroBottom
                });
                
                if (scrollY > heroBottom) {
                    navbar.classList.add('blend-mode');
                    console.log('블렌드 모드 활성화 - 클래스 추가됨');
                } else {
                    navbar.classList.remove('blend-mode');
                    console.log('블렌드 모드 비활성화 - 클래스 제거됨');
                }
            }
            
            // 새로운 리스너 등록
            window.addEventListener('scroll', handleScroll, { passive: true });
            
            // 리스너를 추적하기 위해 저장
            if (!window._blendModeListeners) {
                window._blendModeListeners = [];
            }
            window._blendModeListeners.push(handleScroll);
            
            // 초기 실행
            handleScroll();
            
            console.log('블렌드 모드 스크롤 이벤트 리스너 등록 완료');
        } else {
            console.log('블렌드 모드 초기화 실패 - 요소를 찾을 수 없음');
            console.log('사용 가능한 요소들:', {
                allNavbars: document.querySelectorAll('.navbar, nav'),
                allHeroSections: document.querySelectorAll('.hero-carousel-section, #home, section')
            });
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
        const delayClass = `reveal-up-delay-${(this.data.index % 4) + 1}`;
        
        return `
            <a href="#" class="project-card hover-link-block project-card-curtain ${delayClass}">
                <div class="hover-content-wrapper">
                <div class="project-cover">
                        <div class="hover-image-wrapper">
                            <img src="${this.data.image}" alt="${this.data.title}" class="project-image hover-image" 
                         onload="this.nextElementSibling.style.display='none';" 
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="project-placeholder" style="background: ${placeholderGradient};">
                        <span>${this.data.title}</span>
                    </div>
                        </div>
                        <div class="image-revealer"></div>
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
            </a>
        `;
    }
}

// 프로젝트 데이터 (Figma 디자인 기반)
const projectsData = [
    {
        index: 0,
        title: "SKON 2.0 App",
        tags: "UI/UX, App, Groupware, Illustation",
        year: "2023",
        image: "assets/work/sk-skon_00-hero.webp",
        placeholderColors: ["#4A90E2", "#7B68EE", "#FF6B6B"]
    },
    {
        index: 1,
        title: "Entertainment Website Builder",
        tags: "Entertainment, CMS, AI",
        year: "2025",
        image: "assets/work/ent-website-builder_00-hero.webp",
        placeholderColors: ["#FF9A9E", "#FECFEF", "#FECFEF"]
    },
    {
        index: 2,
        title: "2025 LEE GIKWANG SOLO CONCERT [OBSESSED] IN HONGKONG",
        tags: "Kpop Agency, Show, Performance",
        year: "2025",
        image: "assets/work/2025-lee-gikwang-solo-concert-hk_00-hero.jpg",
        placeholderColors: ["#667eea", "#764ba2", "#f093fb"]
    },
    {
        index: 3,
        title: "Ophily Brand Website",
        tags: "Shopping Mall, Cafe 24",
        year: "2024",
        image: "assets/work/opily-website_00-hero.webp",
        placeholderColors: ["#4facfe", "#00f2fe", "#43e97b"]
    },
    {
        index: 4,
        title: "Samsung EPP Referral Program",
        tags: "Visual Identity, Advertising",
        year: "2024",
        image: "assets/work/samsung-referral-program_00-hero.webp",
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
        
        // 프로젝트 카드에 커튼 효과 적용 (순차적으로)
        const projectCards = projectGrid.querySelectorAll('.project-card');
        console.log(`발견된 프로젝트 카드 수: ${projectCards.length}`);
        
        // 프로젝트 카드 초기 설정 - 처음부터 숨김 상태
        projectCards.forEach((card, index) => {
            // 처음부터 숨김 상태로 설정
            card.style.clipPath = 'inset(0 0 100% 0)';
            card.style.overflow = 'hidden';
            card.style.animation = 'none';
            card.classList.remove('project-card-curtain');
            
            // 기존 reveal-up 관찰 유지
            if (window.revealUpInstance) {
                window.revealUpInstance.observe(card);
            }
        });
        
        // Intersection Observer로 프로젝트 섹션 진입 시 커튼 효과 시작
        const projectSection = document.querySelector('.featured-work-grid-section');
        if (projectSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        console.log('프로젝트 섹션 진입 - 커튼 효과 시작');
                        
                        // 데스크탑/모바일 구분하여 딜레이 설정
                        const isMobile = window.innerWidth <= 768;
                        
                        // 각 카드에 순차적으로 커튼 효과 적용
                        projectCards.forEach((card, index) => {
                            let delay;
                            
                            if (isMobile) {
                                // 모바일: 카드 사이 딜레이 없음 (단일 컬럼)
                                delay = index * 100; // 100ms씩만 간격
                            } else {
                                // 데스크탑: 그리드 레이아웃에 맞는 딜레이
                                if (index === 0) {
                                    delay = 0; // 첫 번째 카드는 즉시 시작
                                } else if (index === 1) {
                                    delay = 200; // 두 번째 카드는 200ms 후 시작
                                } else if (index === 2) {
                                    delay = 500; // 세 번째 카드는 500ms 후 시작 (2번과 3번 사이 딜레이)
                                } else {
                                    delay = 500 + (index - 2) * 150; // 네 번째부터는 150ms씩 추가 지연
                                }
                            }
                            
                            setTimeout(() => {
                                // 더 부드러운 애니메이션 적용
                                card.style.animation = 'projectCardDrawDown 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
                                console.log(`카드 ${index + 1} 커튼 효과 시작 (${isMobile ? '모바일' : '데스크탑'})`);
                                
                                // 애니메이션 완료 후 성능 최적화
                                setTimeout(() => {
                                    card.style.willChange = 'auto'; // will-change 해제
                                }, 800);
                                
                            }, delay);
                        });
                        
                        // 한 번만 실행되도록 observer 해제
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1, // 섹션의 10%가 보일 때 트리거
                rootMargin: '0px 0px -100px 0px' // 100px 전에 트리거 (더 일찍 시작)
            });
            
            observer.observe(projectSection);
        }
        
        console.log('프로젝트 카드 커튼 효과 설정 완료');
        
        console.log('프로젝트 카드 커튼 효과 설정 완료');
        
        // 디버깅: 관찰된 카드 수 확인
        console.log(`관찰된 프로젝트 카드 수: ${projectCards.length}`);
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

// 모바일 폰트 사이즈는 CSS clamp() 함수로 반응형 처리

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

// 기본 스크롤 사용 (커스텀 스크롤 제거됨)

// 스크롤 이벤트 최적화 - requestAnimationFrame 사용
let scrollTicking = false;

function optimizedScrollHandler() {
    if (!scrollTicking) {
        requestAnimationFrame(function() {
    // 스크롤 관련 로직
            scrollTicking = false;
        });
        scrollTicking = true;
    }
}

window.addEventListener('scroll', optimizedScrollHandler, { passive: true });

// 리사이즈 이벤트 최적화
const optimizedResizeHandler = debounce(function() {
    // 리사이즈 관련 로직
}, 250);

window.addEventListener('resize', optimizedResizeHandler);

// 히어로 섹션은 CSS 애니메이션만 사용 (JavaScript 인터랙션 제거됨)
document.addEventListener('DOMContentLoaded', function() {
    const hugeText = document.querySelector('.huge-text');

    // 휠 스크롤로 텍스트 이동 애니메이션 (The Grap 스타일)
    if (hugeText) {
        // The Grap 스타일 초기 설정
        hugeText.style.willChange = 'transform';
        hugeText.style.transformStyle = 'preserve-3d';
        
        // The Grap 스타일 스크롤 기반 인터랙션
        let currentScrollY = 0;
        let targetTranslateX = 0;
        let currentTranslateX = 0;
        
        // 스크롤 이벤트로 텍스트 위치 계산 - 자연스러운 ease in/out
        function updateTextPosition() {
            const scrollY = window.scrollY;
            const scrollDelta = scrollY - currentScrollY;
            
            // 스크롤에 따라 텍스트 위치 계산 (The Grap 스타일)
            targetTranslateX -= scrollDelta * 0.5; // 스크롤 속도에 비례한 이동
            
            // 고급 ease in/out을 위한 개선된 lerp
            const lerpFactor = 0.06; // 더 부드러운 전환 (0.08 → 0.06)
            const distance = targetTranslateX - currentTranslateX;
            
            // ease in/out 커브 적용
            const easeInOut = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            const normalizedDistance = Math.abs(distance) / 100; // 거리를 정규화
            const easedFactor = easeInOut(Math.min(normalizedDistance, 1)) * lerpFactor;
            
            currentTranslateX += distance * easedFactor;
            
            // The Grap과 동일한 transform 스타일 적용
            hugeText.style.transform = `translate3d(${currentTranslateX}px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`;
            
            currentScrollY = scrollY;
        }
        
        // 스크롤 이벤트 리스너
        window.addEventListener('scroll', updateTextPosition, { passive: true });
        
        // 초기 위치 설정
        updateTextPosition();
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
            customCursor.innerHTML = 'View';
        });
        
        card.addEventListener('mouseleave', function() {
            customCursor.classList.remove('hover');
            customCursor.innerHTML = '•';
        });
    });
    
    // 선택 가능한 요소들에 호버 이벤트 추가 - 더 구체적인 선택자 사용
    const interactiveElements = document.querySelectorAll('a, button, .nav-link, .btn, .btn-small, .btn-medium, .btn-large, [role="button"], input[type="button"], input[type="submit"], .nav-icon, .theme-toggle, .hero-cta-pagination-block .btn');
    
    // 히어로 영역 버튼 직접 확인 및 이벤트 추가
    const heroButtons = document.querySelectorAll('.hero-carousel-section .btn');
    heroButtons.forEach((btn, index) => {
        // interactive 요소에 포함되는지 확인
        const isInInteractive = Array.from(interactiveElements).includes(btn);
        
        // interactive 요소에 포함되지 않으면 직접 이벤트 추가
        if (!isInInteractive) {
            btn.addEventListener('mouseenter', function() {
                if (!customCursor.classList.contains('hover')) {
                    customCursor.classList.add('interactive');
                }
            });
            
            btn.addEventListener('mouseleave', function() {
                customCursor.classList.remove('interactive');
            });
        }
    });
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            // 프로젝트 카드 호버 상태가 아닐 때만 interactive 클래스 추가
            if (!customCursor.classList.contains('hover')) {
            customCursor.classList.add('interactive');
            }
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
        serviceItems.forEach((item, index) => {
            if (index === activeItemIndex) {
                // 스크롤로 활성화된 아이템
                item.classList.add('active');
            } else {
                // 비활성화된 아이템
                item.classList.remove('active');
            }
        });
    }
    
    // Envato Elements 스타일: 스크롤 기반 활성화만 사용
    
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
    
    // 스크롤 인터랙션 자동 초기화
    window.scrollRevealInstance = new ScrollReveal();
    window.revealUpInstance = new RevealUp();
    
    // Hero 영역 즉시 표시
    const heroContent = document.querySelector('.hero-content.reveal-up');
    if (heroContent) {
        heroContent.classList.add('revealed');
    }
    
    // 히어로 캐러셀 초기화
    initHeroCarousel();
    
    // 히어로 커스텀 커서 초기화
    initHeroCustomCursor();
});

// 히어로 캐러셀 기능
function initHeroCarousel() {
    const slides = document.querySelectorAll('.hero-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const paginationCurrent = document.querySelector('.pagination-current');
    const paginationTotal = document.querySelector('.pagination-total');
    
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let isTransitioning = false;
    let autoSlideInterval = null;
    const autoSlideDelay = 5000; // 5초마다 자동 전환
    
    // 페이지네이션 총 개수 설정 (동적으로 계산)
    if (paginationTotal) {
        paginationTotal.textContent = totalSlides;
    }
    
    // 자동 슬라이드 전환 시작
    function startAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
        autoSlideInterval = setInterval(() => {
            nextSlide();
        }, autoSlideDelay);
    }
    
    // 자동 슬라이드 전환 중지
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }
    
    // 자동 슬라이드 전환 재시작 (일시정지 후 다시 시작)
    function restartAutoSlide() {
        stopAutoSlide();
        setTimeout(() => {
            startAutoSlide();
        }, 2000); // 2초 후 재시작
    }
    
    // 영상 제어 함수
    function controlVideo(slideIndex, action) {
        const slide = slides[slideIndex];
        const video = slide?.querySelector('.hero-slide-video video');
        
        if (!video) return;
        
        switch (action) {
            case 'play':
                video.play().catch(e => console.log('영상 재생 실패:', e));
                break;
            case 'pause':
                video.pause();
                break;
            case 'restart':
                video.currentTime = 0;
                video.play().catch(e => console.log('영상 재시작 실패:', e));
                break;
        }
    }
    
    // 슬라이드 표시 함수 - Design Fever 스타일 즉시 전환
    function showSlide(index) {
        if (isTransitioning || index === currentSlide) {
            console.log(`슬라이드 전환 건너뜀: ${currentSlide} → ${index} (전환중: ${isTransitioning})`);
            return;
        }
        
        console.log(`슬라이드 전환 시작: ${currentSlide} → ${index}`);
        isTransitioning = true;
        
        // 현재 슬라이드의 영상 일시정지
        controlVideo(currentSlide, 'pause');
        
        // 모든 슬라이드 비활성화
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // 새 슬라이드 활성화
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        
        // 새 슬라이드의 영상 재생
        controlVideo(currentSlide, 'play');
        
        // 모든 슬라이드의 페이지네이션 업데이트
        const allPaginationCurrents = document.querySelectorAll('.pagination-current');
        allPaginationCurrents.forEach(pagination => {
            pagination.textContent = currentSlide + 1;
        });
        
        console.log(`슬라이드 전환 완료: 현재 슬라이드 ${currentSlide + 1}`);
        
        // 자연스러운 전환 완료 (0.8초)
        setTimeout(() => {
            isTransitioning = false;
            // 자동 슬라이드 재시작
            restartAutoSlide();
        }, 800);
    }
    
    // 다음 슬라이드
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % totalSlides;
        console.log(`다음 슬라이드: ${currentSlide} → ${nextIndex} (총 ${totalSlides}개)`);
        showSlide(nextIndex);
    }
    
    // 이전 슬라이드
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
        console.log(`이전 슬라이드: ${currentSlide} → ${prevIndex} (총 ${totalSlides}개)`);
        showSlide(prevIndex);
    }
    
    // 이벤트 리스너 추가
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoSlide(); // 자동 슬라이드 중지
            prevSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoSlide(); // 자동 슬라이드 중지
            nextSlide();
        });
    }
    
    // 키보드 네비게이션
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            stopAutoSlide(); // 자동 슬라이드 중지
            prevSlide();
        }
        if (e.key === 'ArrowRight') {
            stopAutoSlide(); // 자동 슬라이드 중지
            nextSlide();
        }
    });
    
    // 스와이프 기능 (모바일 전용)
    let startX = 0;
    let startY = 0;
    let isSwiping = false;
    let swipeThreshold = 50; // 스와이프 최소 거리
    
    const carouselContainer = document.querySelector('.hero-carousel-container');
    
    if (carouselContainer) {
        // 마우스 드래그 기능 제거 - 스와이프만 사용
        
        // 터치 이벤트 (모바일 스와이프)
        carouselContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isSwiping = true;
        }, { passive: true });
        
        carouselContainer.addEventListener('touchmove', (e) => {
            if (!isSwiping) return;
            
            // 수평 스와이프인지 확인
            const deltaX = e.touches[0].clientX - startX;
            const deltaY = e.touches[0].clientY - startY;
            
            // 수평 스와이프가 수직 스와이프보다 클 때만 스크롤 방지
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                e.preventDefault(); // 수평 스와이프일 때만 스크롤 방지
            }
        }, { passive: false });
        
        carouselContainer.addEventListener('touchend', (e) => {
            if (!isSwiping) return;
            
            const deltaX = e.changedTouches[0].clientX - startX;
            const deltaY = e.changedTouches[0].clientY - startY;
            
            // 수평 스와이프가 수직 스와이프보다 클 때만 슬라이드 변경
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > swipeThreshold) {
                stopAutoSlide(); // 자동 슬라이드 중지
                if (deltaX > 0) {
                    prevSlide(); // 오른쪽으로 스와이프 = 이전 슬라이드
                } else {
                    nextSlide(); // 왼쪽으로 스와이프 = 다음 슬라이드
                }
            }
            
            isSwiping = false;
        }, { passive: true });
        
        // 스와이프 전용 - 커서 스타일 제거
    }
    
    // 초기 슬라이드 표시 - 첫 번째 슬라이드 강제 활성화
    if (slides.length > 0) {
        // 모든 슬라이드 비활성화
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // 첫 번째 슬라이드 활성화
        slides[0].classList.add('active');
        
        // 첫 번째 슬라이드 영상 재생
        controlVideo(0, 'play');
        
        // 페이지네이션 초기화
        const allPaginationCurrents = document.querySelectorAll('.pagination-current');
        allPaginationCurrents.forEach(pagination => {
            pagination.textContent = '1';
        });
    }
    
    // 자동 슬라이드 시작
    startAutoSlide();
    
    // 전역에서 접근 가능하도록 함수 노출
    window.heroCarousel = {
        nextSlide: nextSlide,
        prevSlide: prevSlide,
        showSlide: showSlide,
        startAutoSlide: startAutoSlide,
        stopAutoSlide: stopAutoSlide
    };
}

// 히어로 커스텀 커서 기능
function initHeroCustomCursor() {
    // 모바일에서는 히어로 커스텀 커서 비활성화
    if (window.innerWidth <= 767) {
        return;
    }
    
    const heroSection = document.querySelector('.hero-carousel-section');
    const leftArea = document.querySelector('.hero-slide-left');
    const centerArea = document.querySelector('.hero-slide-center');
    const rightArea = document.querySelector('.hero-slide-right');
    
    if (!heroSection || !leftArea || !centerArea || !rightArea) {
        console.log('히어로 슬라이드 영역 요소를 찾을 수 없음:', {
            heroSection: !!heroSection,
            leftArea: !!leftArea,
            centerArea: !!centerArea,
            rightArea: !!rightArea
        });
        return;
    }
    
    console.log('히어로 슬라이드 영역 요소들 찾음:', {
        heroSection: heroSection,
        leftArea: leftArea,
        centerArea: centerArea,
        rightArea: rightArea
    });
    
    let isInHeroSection = false;
    let currentDirection = null;
    
    // 마우스 이동 이벤트
    document.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        const isInside = e.clientX >= rect.left && e.clientX <= rect.right && 
                        e.clientY >= rect.top && e.clientY <= rect.bottom;
        
        // navbar 영역 제외 - 실제 navbar 요소의 위치와 크기 기준
        const navbar = document.querySelector('.navbar');
        let isInNavbarArea = false;
        
        if (navbar) {
            const navbarRect = navbar.getBoundingClientRect();
            // navbar 영역과 겹치는지 확인 (Y 좌표 기준)
            isInNavbarArea = e.clientY >= navbarRect.top && e.clientY <= navbarRect.bottom;
        } else {
            // navbar 요소가 없으면 상단 100px로 대체
            const navbarHeight = 100;
            isInNavbarArea = e.clientY < rect.top + navbarHeight;
        }
        
        // 하단 텍스트 영역 감지 (하단 200px)
        const bottomTextHeight = 200; // 하단 텍스트 영역 높이
        const isInBottomTextArea = e.clientY > rect.bottom - bottomTextHeight;
        
        // prev/next 커서가 절대 나타나면 안 되는 영역들
        const isInRestrictedArea = isInNavbarArea || isInBottomTextArea;
        
        if (isInside && !isInNavbarArea && !isInBottomTextArea) {
            if (!isInHeroSection) {
                isInHeroSection = true;
                console.log('히어로 영역 진입 (navbar 영역, 하단 텍스트 영역 제외)');
                
                // 기본 커스텀 커서가 보이도록 설정
                const customCursor = document.querySelector('.custom-cursor');
                if (customCursor) {
                    // 히어로 영역 클래스 먼저 추가
                    customCursor.classList.add('hero-cursor');
                    
                    // 프로젝트 카드 호버 상태나 interactive 상태가 아닐 때만 히어로 스타일 적용
                    if (!customCursor.classList.contains('hover') && !customCursor.classList.contains('interactive')) {
                        // 개별 속성만 설정하여 View 커스텀 커서 크기 보호
                        customCursor.style.display = 'flex';
                        customCursor.style.opacity = '1';
                        customCursor.style.visibility = 'visible';
                        customCursor.style.zIndex = '99999';
                        customCursor.style.width = '96px';
                        customCursor.style.height = '96px';
                        customCursor.style.backgroundColor = 'var(--brand-lime-light)';
                        customCursor.style.mixBlendMode = 'var(--cursor-blend-mode-default)';
                        customCursor.style.position = 'fixed';
                        customCursor.style.pointerEvents = 'none';
                        customCursor.style.borderRadius = '50%';
                        customCursor.style.alignItems = 'center';
                        customCursor.style.justifyContent = 'center';
                    }
                    
                    console.log('히어로 커서 표시 설정 완료');
                } else {
                    console.log('커스텀 커서 요소를 찾을 수 없음');
                }
            }
            
            // 프로젝트 카드 호버 상태 확인 - hover 상태가 아닐 때만 히어로 커서 로직 실행
            const customCursor = document.querySelector('.custom-cursor');
            if (customCursor && !customCursor.classList.contains('hover')) {
                // interactive 클래스가 있으면 히어로 커서 로직 건너뛰기
                if (customCursor.classList.contains('interactive')) {
                    return;
                }
        // 제한된 영역에서는 prev/next 커서 절대 표시하지 않음
        if (isInRestrictedArea) {
            // 제한된 영역에서는 기본 커스텀 커서만 표시
            if (currentDirection !== 'restricted') {
                currentDirection = 'restricted';
                customCursor.classList.remove('hero-nav-cursor');
                customCursor.innerHTML = '•';
                // 기본 커스텀 커서 스타일로 복원
                customCursor.style.width = 'var(--cursor-size-default)';
                customCursor.style.height = 'var(--cursor-size-default)';
                customCursor.style.backgroundColor = 'var(--cursor-color)';
                customCursor.style.mixBlendMode = 'var(--cursor-blend-mode-default)';
                console.log('제한된 영역에서 기본 커스텀 커서로 전환');
            }
        } else {
                    // 허용된 영역에서만 3등분 영역 판단
                    const heroWidth = rect.width;
                    const relativeX = e.clientX - rect.left;
                    const sectionWidth = heroWidth / 3;
                    
                    if (relativeX < sectionWidth && currentDirection !== 'prev') {
                        // 좌측 영역 (이전) - View 커스텀 커서 스타일 적용
                        currentDirection = 'prev';
                        customCursor.classList.add('hero-nav-cursor');
                        customCursor.innerHTML = 'Prev';
                    } else if (relativeX > sectionWidth * 2 && currentDirection !== 'next') {
                        // 우측 영역 (다음) - View 커스텀 커서 스타일 적용
                        currentDirection = 'next';
                        customCursor.classList.add('hero-nav-cursor');
                        customCursor.innerHTML = 'Next';
                    } else if (relativeX >= sectionWidth && relativeX <= sectionWidth * 2 && currentDirection !== 'center') {
                        // 중앙 영역 (클릭 비활성화) - 기본 커스텀 커서
                        currentDirection = 'center';
                        customCursor.classList.remove('hero-nav-cursor');
                        customCursor.innerHTML = '•';
                        // 기본 커스텀 커서 스타일로 복원
                        customCursor.style.width = 'var(--cursor-size-default)';
                        customCursor.style.height = 'var(--cursor-size-default)';
                        customCursor.style.backgroundColor = 'var(--cursor-color)';
                        customCursor.style.mixBlendMode = 'var(--cursor-blend-mode-default)';
                    }
                }
            } else if (customCursor && customCursor.classList.contains('interactive')) {
                // interactive 상태일 때 로그 출력
                console.log('히어로 영역에서 interactive 상태 감지');
            }
        } else if (isInside && isInRestrictedArea) {
            // 제한된 영역(navbar, 하단 텍스트)에서는 히어로 커서 비활성화하고 기본 커스텀 커서로 전환
            if (isInHeroSection) {
                isInHeroSection = false;
                currentDirection = null;
                
                const customCursor = document.querySelector('.custom-cursor');
                if (customCursor) {
                    customCursor.classList.remove('hero-cursor');
                    customCursor.classList.remove('hero-nav-cursor');
                    
                    if (!customCursor.classList.contains('hover') && !customCursor.classList.contains('interactive')) {
                        customCursor.innerHTML = '•';
                        customCursor.style.width = 'var(--cursor-size-default)';
                        customCursor.style.height = 'var(--cursor-size-default)';
                        customCursor.style.backgroundColor = 'var(--cursor-color)';
                        customCursor.style.mixBlendMode = 'var(--cursor-blend-mode-default)';
                    }
                }
                console.log('제한된 영역에서 히어로 커서 비활성화');
            }
        } else {
            if (isInHeroSection) {
                isInHeroSection = false;
                currentDirection = null;
                
                // 기본 커스텀 커서 원래 상태로 복원
                const customCursor = document.querySelector('.custom-cursor');
                if (customCursor) {
                    // 히어로 영역 클래스들 제거
                    customCursor.classList.remove('hero-cursor');
                    customCursor.classList.remove('hero-nav-cursor');
                    
                    // 프로젝트 카드 호버 상태가 아닐 때만 기본 상태로 복원
                    if (!customCursor.classList.contains('hover') && !customCursor.classList.contains('interactive')) {
                        customCursor.innerHTML = '•';
                        // 개별 속성만 설정하여 View 커스텀 커서 크기 보호
                        customCursor.style.display = 'flex';
                        customCursor.style.opacity = '1';
                        customCursor.style.visibility = 'visible';
                        customCursor.style.zIndex = 'var(--cursor-z-index)';
                        customCursor.style.width = 'var(--cursor-size-default)';
                        customCursor.style.height = 'var(--cursor-size-default)';
                        customCursor.style.backgroundColor = 'var(--cursor-color)';
                        customCursor.style.mixBlendMode = 'var(--cursor-blend-mode-default)';
                        customCursor.style.position = 'fixed';
                        customCursor.style.pointerEvents = 'none';
                        customCursor.style.borderRadius = '50%';
                        customCursor.style.alignItems = 'center';
                        customCursor.style.justifyContent = 'center';
                    }
                }
            }
        }
    });
    
    // 좌측 영역 클릭 이벤트 - Design Fever 스타일 즉시 전환
    leftArea.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // navbar 영역과 겹치는지 확인
        const navbar = document.querySelector('.navbar');
        let isInNavbarArea = false;
        
        if (navbar) {
            const navbarRect = navbar.getBoundingClientRect();
            isInNavbarArea = e.clientY >= navbarRect.top && e.clientY <= navbarRect.bottom;
        }
        
        if (isInNavbarArea) {
            console.log('navbar 영역에서 클릭 - 슬라이드 전환 차단');
            return; // navbar 영역에서는 슬라이드 전환하지 않음
        }
        
        console.log('좌측 영역 클릭 - 이전 슬라이드로 이동', e);
        if (window.heroCarousel && window.heroCarousel.prevSlide) {
            window.heroCarousel.prevSlide();
            console.log('이전 슬라이드 실행됨');
        } else {
            console.log('heroCarousel 또는 prevSlide 함수를 찾을 수 없음', window.heroCarousel);
        }
    });
    
    // 중앙 영역 클릭 이벤트 (클릭 비활성화)
    centerArea.addEventListener('click', (e) => {
        e.preventDefault();
        // 중앙 영역은 클릭해도 아무 동작하지 않음
        console.log('중앙 영역 클릭 - 슬라이드 전환 없음');
    });
    
    // 우측 영역 클릭 이벤트 - Design Fever 스타일 즉시 전환
    rightArea.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // navbar 영역과 겹치는지 확인
        const navbar = document.querySelector('.navbar');
        let isInNavbarArea = false;
        
        if (navbar) {
            const navbarRect = navbar.getBoundingClientRect();
            isInNavbarArea = e.clientY >= navbarRect.top && e.clientY <= navbarRect.bottom;
        }
        
        if (isInNavbarArea) {
            console.log('navbar 영역에서 클릭 - 슬라이드 전환 차단');
            return; // navbar 영역에서는 슬라이드 전환하지 않음
        }
        
        console.log('우측 영역 클릭 - 다음 슬라이드로 이동', e);
        if (window.heroCarousel && window.heroCarousel.nextSlide) {
            window.heroCarousel.nextSlide();
            console.log('다음 슬라이드 실행됨');
        } else {
            console.log('heroCarousel 또는 nextSlide 함수를 찾을 수 없음', window.heroCarousel);
        }
    });
    
    console.log('히어로 슬라이드 영역 클릭 이벤트 등록 완료');
    
    // 히어로 섹션에서 벗어날 때 커서 복원
    document.addEventListener('mouseleave', () => {
        if (isInHeroSection) {
            isInHeroSection = false;
            currentDirection = null;
            
            // 기본 커스텀 커서 원래 상태로 복원
            const customCursor = document.querySelector('.custom-cursor');
            if (customCursor) {
                // 히어로 영역 클래스들 제거
                customCursor.classList.remove('hero-cursor');
                customCursor.classList.remove('hero-nav-cursor');
                
                // 프로젝트 카드 호버 상태가 아닐 때만 기본 상태로 복원
                if (!customCursor.classList.contains('hover') && !customCursor.classList.contains('interactive')) {
                    customCursor.innerHTML = '•';
                    // 개별 속성만 설정하여 View 커스텀 커서 크기 보호
                    customCursor.style.display = 'flex';
                    customCursor.style.opacity = '1';
                    customCursor.style.visibility = 'visible';
                    customCursor.style.zIndex = 'var(--cursor-z-index)';
                    customCursor.style.width = 'var(--cursor-size-default)';
                    customCursor.style.height = 'var(--cursor-size-default)';
                    customCursor.style.backgroundColor = 'var(--cursor-color)';
                    customCursor.style.mixBlendMode = 'var(--cursor-blend-mode-default)';
                    customCursor.style.position = 'fixed';
                    customCursor.style.pointerEvents = 'none';
                    customCursor.style.borderRadius = '50%';
                    customCursor.style.alignItems = 'center';
                    customCursor.style.justifyContent = 'center';
                }
            }
        }
    });
}

// 전역 변수로 모바일 메뉴 요소들 저장
let mobileMenuOverlay, mobileMenuClose, mobileMenuLinks;

// 로고 컴포넌트 함수
function createLogoComponent(options = {}) {
    const {
        width = '72',
        height = '18',
        viewBox = '0 0 72 18',
        fill = 'none',
        className = '',
        link = null
    } = options;
    
    const logoSvg = `
        <svg width="${width}" height="${height}" viewBox="${viewBox}" fill="${fill}" xmlns="http://www.w3.org/2000/svg" class="${className}">
            <path d="M72 9.32182C72 10.3372 71.7928 11.2511 71.3783 12.0634C70.9639 12.8757 70.4024 13.5729 69.6938 14.1551C68.9987 14.7372 68.2099 15.184 67.3275 15.4954C66.4452 15.7932 65.5294 15.9421 64.5802 15.9421C64.0989 15.9421 63.5976 15.8948 63.0762 15.8C62.5682 15.7188 62.0735 15.5969 61.5922 15.4345C61.1243 15.2585 60.7032 15.0486 60.3288 14.8049C60.3288 14.8049 60.3222 14.8049 60.3088 14.8049C60.3088 14.8049 60.3021 14.8049 60.2887 14.8049C60.2887 14.8049 60.2887 14.8117 60.2887 14.8252V18.0745H53.3502C53.3502 17.2351 53.3502 16.4025 53.3502 15.5766C53.3502 14.7372 53.3502 13.9046 53.3502 13.0788C53.3502 12.2394 53.3502 11.4067 53.3502 10.5809C53.3502 9.74151 53.3502 8.9089 53.3502 8.08305C53.3502 7.24366 53.3502 6.41104 53.3502 5.58519C53.3502 4.74581 53.3502 3.89965 53.3502 3.04672H60.2887C60.2887 3.76426 60.2887 4.46827 60.2887 5.15873C60.2887 5.84919 60.2887 6.53966 60.2887 7.23012C60.2887 7.92059 60.2887 8.63136 60.2887 9.36244C60.2887 9.61967 60.3556 9.84305 60.4893 10.0326C60.623 10.2221 60.8035 10.3778 61.0307 10.4997C61.258 10.6215 61.512 10.7163 61.7928 10.784C62.0869 10.8381 62.381 10.8652 62.6751 10.8652C63.1965 10.8652 63.6243 10.7907 63.9586 10.6418C64.3061 10.4929 64.5602 10.3034 64.7206 10.0732C64.8944 9.84305 64.9813 9.60613 64.9813 9.36244C64.9813 9.14582 64.9345 8.94951 64.8409 8.77351C64.7473 8.58397 64.6069 8.42151 64.4198 8.28612C64.2326 8.1372 63.992 8.02212 63.6978 7.94089C63.4037 7.85966 63.0628 7.81905 62.6751 7.81905C62.1136 7.81905 61.6123 7.92059 61.1711 8.12366C60.7433 8.32674 60.4559 8.65843 60.3088 9.11874L61.9131 3.04672C62.3543 2.93842 62.7887 2.86395 63.2166 2.82334C63.6444 2.76918 64.0655 2.74211 64.4799 2.74211C65.2955 2.74211 66.0775 2.83688 66.8262 3.02642C67.5882 3.21595 68.2767 3.49349 68.8917 3.85903C69.52 4.22457 70.0682 4.67811 70.5361 5.21965C71.004 5.74765 71.365 6.35689 71.619 7.04735C71.873 7.72428 72 8.48243 72 9.32182Z" fill="currentColor"/>
            <path d="M37.2364 4.05498C38.2124 3.60821 39.2685 3.27652 40.4049 3.0599C41.5546 2.82975 42.7044 2.71467 43.8541 2.71467C44.9771 2.71467 46.06 2.82298 47.1028 3.0396C48.1455 3.25621 49.0747 3.5879 49.8902 4.03467C50.7191 4.48145 51.3742 5.03652 51.8554 5.69991C52.3367 6.3633 52.5774 7.14176 52.5774 8.0353C52.5774 9.34854 52.5774 10.6618 52.5774 11.975C52.5774 13.2882 52.5774 14.6015 52.5774 15.9147C52.1095 15.9147 51.6415 15.9147 51.1736 15.9147C50.7057 15.9147 50.2378 15.9147 49.7699 15.9147C49.302 15.9147 48.834 15.9147 48.3661 15.9147C47.8982 15.9147 47.4303 15.9147 46.9624 15.9147C46.4945 15.9147 46.0266 15.9147 45.5586 15.9147C45.5586 15.1972 45.5586 14.4864 45.5586 13.7824C45.5586 13.0649 45.5586 12.3541 45.5586 11.6501C45.5586 11.4064 45.4784 11.2101 45.318 11.0612C45.1576 10.9122 44.9637 10.8107 44.7365 10.7565C44.5092 10.6888 44.2819 10.655 44.0546 10.655C43.5466 10.655 43.1589 10.7565 42.8915 10.9596C42.6375 11.1627 42.5105 11.3929 42.5105 11.6501C42.5105 11.9073 42.6442 12.1442 42.9116 12.3609C43.179 12.5639 43.56 12.6655 44.0546 12.6655C44.2953 12.6655 44.5693 12.6181 44.8768 12.5233C45.1843 12.4285 45.4183 12.1849 45.5787 11.7922C45.2979 12.4556 45.0105 13.119 44.7164 13.7824C44.4356 14.4458 44.1549 15.1092 43.8741 15.7726C43.3929 16.0162 42.8848 16.1855 42.3501 16.2803C41.8287 16.3886 41.3073 16.4427 40.7859 16.4427C40.1576 16.4427 39.5493 16.3547 38.961 16.1787C38.3862 16.0163 37.8648 15.7726 37.3969 15.4476C36.9423 15.1227 36.5813 14.7166 36.314 14.2292C36.0466 13.7418 35.9129 13.1732 35.9129 12.5233C35.9129 12.1307 35.9797 11.7449 36.1134 11.3658C36.2471 10.9867 36.4477 10.6279 36.715 10.2895C36.9824 9.951 37.3166 9.65315 37.7177 9.39592C38.1321 9.13869 38.6201 8.94238 39.1816 8.807C39.7431 8.65807 40.3848 8.58361 41.1068 8.58361C41.5747 8.58361 42.0292 8.62423 42.4704 8.70546C42.9116 8.77315 43.326 8.88146 43.7137 9.03038C44.1148 9.17931 44.4691 9.36208 44.7766 9.57869C45.0974 9.79531 45.3581 10.039 45.5586 10.3098C45.5586 10.2827 45.5586 10.2624 45.5586 10.2488C45.5586 10.2218 45.5586 10.2015 45.5586 10.1879C45.5586 10.1608 45.5586 10.1405 45.5586 10.127C45.5586 9.70731 45.4517 9.34854 45.2378 9.05069C45.0372 8.73931 44.7565 8.48884 44.3955 8.2993C44.0479 8.09623 43.6402 7.9473 43.1723 7.85253C42.7177 7.75776 42.2364 7.71038 41.7284 7.71038C40.9396 7.71038 40.1442 7.81192 39.342 8.01499C38.5399 8.21807 37.838 8.51592 37.2364 8.90854V4.05498Z" fill="currentColor"/>
            <path d="M29.7776 3.32373C29.7776 4.13604 29.7776 4.95512 29.7776 5.78096C29.7776 6.59327 29.7776 7.41235 29.7776 8.2382C29.7776 9.05051 29.7776 9.86959 29.7776 10.6954C29.7776 11.5619 29.7776 12.4284 29.7776 13.2948C29.7776 14.1613 29.7776 15.0345 29.7776 15.9145H22.8391C22.8391 14.5742 22.8391 13.2339 22.8391 11.8936C22.8391 10.5533 22.8391 9.21297 22.8391 7.87266C22.8391 7.11451 22.8391 6.35635 22.8391 5.59819C22.8391 4.84004 22.8391 4.08188 22.8391 3.32373H29.7776ZM29.7576 11.0813L30.8405 5.6185C30.9608 5.03635 31.1947 4.55573 31.5423 4.17665C31.9033 3.78403 32.3244 3.48619 32.8057 3.28311C33.287 3.08003 33.7816 2.95819 34.2897 2.91757C34.7977 2.86342 35.2656 2.88372 35.6934 2.97849C36.1212 3.05972 36.4621 3.20188 36.7161 3.40496L35.1921 10.9594C34.8044 10.6345 34.3298 10.4111 33.7683 10.2893C33.2201 10.1674 32.6653 10.1268 32.1038 10.1674C31.5423 10.1945 31.0477 10.2893 30.6199 10.4517C30.1921 10.6142 29.9046 10.8241 29.7576 11.0813Z" fill="currentColor"/>
            <path d="M11.0495 0.0744629C13.4292 0.0744629 15.3944 0.37231 16.9452 0.968003C18.496 1.5637 19.6859 2.37601 20.5148 3.40493C21.3436 4.42032 21.865 5.57109 22.0789 6.85725L13.4158 8.92864C13.5629 8.41418 13.5696 7.96741 13.4359 7.58833C13.3022 7.20925 13.0348 6.91141 12.6337 6.69479C12.2327 6.47817 11.6979 6.36987 11.0294 6.36987C10.4011 6.36987 9.89975 6.45787 9.52542 6.63387C9.16446 6.80987 8.90376 7.03325 8.74333 7.30402C8.59628 7.56126 8.52275 7.8388 8.52275 8.13664C8.52275 8.35326 8.56954 8.5631 8.66312 8.76618C8.75671 8.95572 8.90377 9.13172 9.1043 9.29418C9.30484 9.45665 9.56553 9.58526 9.88639 9.68003C10.2072 9.7748 10.5883 9.82218 11.0294 9.82218C11.7113 9.82218 12.2393 9.74772 12.6137 9.5988C12.988 9.43634 13.2554 9.21295 13.4158 8.92864C13.2019 9.72742 12.988 10.533 12.7741 11.3453C12.5602 12.1576 12.3396 12.9767 12.1123 13.8025C11.8984 14.6148 11.6845 15.4204 11.4706 16.2191C11.1097 16.2868 10.7554 16.3342 10.4078 16.3613C10.0736 16.4019 9.67248 16.4222 9.20457 16.4222C8.18852 16.4222 7.25269 16.3274 6.39708 16.1379C5.55483 15.9484 4.79279 15.6844 4.11097 15.3459C3.42915 14.9939 2.82755 14.5742 2.30616 14.0868C1.79813 13.5994 1.37033 13.0579 1.02273 12.4622C0.688506 11.853 0.434491 11.2031 0.260693 10.5126C0.086896 9.80865 0 9.07757 0 8.31941C0 7.69664 0.0601615 7.09418 0.180483 6.51202C0.314173 5.91633 0.514707 5.34771 0.782088 4.80617C1.06284 4.25109 1.41712 3.73663 1.84493 3.26278C2.27273 2.77539 2.77407 2.34216 3.34894 1.96308C3.93718 1.57047 4.61231 1.232 5.37434 0.947696C6.13638 0.663388 6.98531 0.446772 7.92114 0.297848C8.87034 0.148924 9.91313 0.0744629 11.0495 0.0744629ZM13.4158 15.9145C13.4158 15.1293 13.4158 14.3508 13.4158 13.5791C13.4158 12.8074 13.4158 12.0357 13.4158 11.264C13.4158 10.4788 13.4158 9.70034 13.4158 8.92864C14.365 8.92864 15.3075 8.92864 16.2434 8.92864C17.1926 8.92864 18.1418 8.92864 19.091 8.92864C20.0402 8.92864 20.9827 8.92864 21.9185 8.92864V15.9145H13.4158Z" fill="currentColor"/>
        </svg>
    `;
    
    if (link) {
        return `<a href="${link}">${logoSvg}</a>`;
    }
    
    return logoSvg;
}

// 로고 컴포넌트 초기화 함수
function initLogoComponents() {
    // 모바일 메뉴 로고 생성
    const mobileMenuLogo = document.getElementById('mobile-menu-logo');
    if (mobileMenuLogo) {
        mobileMenuLogo.innerHTML = createLogoComponent({ 
            className: 'mobile-menu-logo-svg' 
        });
    }
    
    // 푸터 로고 생성
    const footerLogo = document.getElementById('footer-logo');
    if (footerLogo) {
        footerLogo.innerHTML = createLogoComponent({ 
            className: 'footer-logo-svg' 
        });
    }
}

// 햄버거 메뉴 아이콘을 닫기 아이콘으로 전환
function toggleMenuIcon(isOpen) {
    const menuIcon = document.querySelector('#nav-menu-icon svg');
    if (!menuIcon) return;
    
    if (isOpen) {
        // 닫기 아이콘으로 전환
        menuIcon.innerHTML = `
            <path d="M26 26L6.20101 6.20101" stroke="currentColor" stroke-width="1.5"/>
            <path d="M6 26L25.799 6.20101" stroke="currentColor" stroke-width="1.5"/>
        `;
    } else {
        // 햄버거 메뉴 아이콘으로 전환 (2줄, 10px 간격)
        menuIcon.innerHTML = `
            <path d="M2 11H30" stroke="currentColor" stroke-width="1.5"/>
            <path d="M2 21H30" stroke="currentColor" stroke-width="1.5"/>
        `;
    }
}

// 모바일 메뉴 열기 (전역 함수)
function openMobileMenu() {
    if (!mobileMenuOverlay) {
        mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    }
    
    if (mobileMenuOverlay) {
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // 스크롤 방지
        toggleMenuIcon(true); // 햄버거 아이콘을 닫기 아이콘으로 전환
        console.log('모바일 메뉴 열림');
    }
}

// 모바일 메뉴 닫기 (전역 함수)
function closeMobileMenu() {
    if (!mobileMenuOverlay) {
        mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    }
    
    if (mobileMenuOverlay) {
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = ''; // 스크롤 복원
        toggleMenuIcon(false); // 닫기 아이콘을 햄버거 아이콘으로 전환
        console.log('모바일 메뉴 닫힘');
    }
}

// 모바일 테마 아이콘 업데이트 함수 (전역)
function updateMobileThemeIcon(button, mode) {
    const svg = button.querySelector('svg');
    if (!svg) return;
    
    if (mode === 'dark') {
        // 다크모드 아이콘 (달) - icon_dark-mode.svg와 동일
        svg.innerHTML = `
            <path fill-rule="evenodd" clip-rule="evenodd" d="M20.086 16.417C15.073 16.417 11.01 12.377 11.01 7.394C11.01 5.798 11.43 4.301 12.162 3C7.58 3.456 4 7.3 4 11.977C4 16.961 8.064 21 13.076 21C16.483 21 19.448 19.132 21 16.372C20.7 16.402 20.395 16.417 20.086 16.417Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
        `;
    } else {
        // 라이트모드 아이콘 (태양) - icon_light-mode.svg와 동일
        svg.innerHTML = `
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.50096C13.5184 6.50096 14.8941 7.11648 15.8897 8.11109C16.8854 9.10665 17.5 10.4813 17.5 12.0005C17.5 13.5197 16.8844 14.8943 15.8897 15.8899C14.8941 16.8854 13.5184 17.5 12 17.5C10.4807 17.5 9.10592 16.8845 8.11027 15.8899C7.11462 14.8943 6.5 13.5197 6.5 12.0005C6.5 10.4813 7.11558 9.10665 8.11027 8.11109C9.10592 7.11553 10.4807 6.50096 12 6.50096Z" stroke="currentColor" stroke-width="1.5"/>
            <path d="M17.625 6.37498L18.7017 5.2983L19.7784 4.22163M4.22163 19.7784L5.29924 18.7008L6.37591 17.6241M19.9538 12H21.4774H23M1 12H2.52265H4.04623M17.625 17.6241L18.7017 18.7008L19.7784 19.7784M4.22163 4.22163L5.29924 5.2983L6.37591 6.37498M12.0317 4.04623V2.52265V1M12.0317 23V21.4764V19.9538" stroke="currentColor" stroke-width="1.5"/>
        `;
    }
}

// 모바일 테마 토글 (전역 함수)
function toggleMobileTheme() {
    console.log('모바일 테마 토글 클릭됨');
    
    // 현재 테마 확인
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    console.log('현재 테마:', currentTheme, '-> 새 테마:', newTheme);
    
    // 테마 변경
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // 데스크톱 테마 토글 버튼도 동기화
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const desktopSvg = themeToggle.querySelector('svg');
        if (desktopSvg) {
            if (newTheme === 'dark') {
                // 다크모드 아이콘 (달)
                desktopSvg.innerHTML = `
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M20.086 16.417C15.073 16.417 11.01 12.377 11.01 7.394C11.01 5.798 11.43 4.301 12.162 3C7.58 3.456 4 7.3 4 11.977C4 16.961 8.064 21 13.076 21C16.483 21 19.448 19.132 21 16.372C20.7 16.402 20.395 16.417 20.086 16.417Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                `;
            } else {
                // 라이트모드 아이콘 (태양)
                desktopSvg.innerHTML = `
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.50096C13.5184 6.50096 14.8941 7.11648 15.8897 8.11109C16.8854 9.10665 17.5 10.4813 17.5 12.0005C17.5 13.5197 16.8844 14.8943 15.8897 15.8899C14.8941 16.8854 13.5184 17.5 12 17.5C10.4807 17.5 9.10592 16.8845 8.11027 15.8899C7.11462 14.8943 6.5 13.5197 6.5 12.0005C6.5 10.4813 7.11558 9.10665 8.11027 8.11109C9.10592 7.11553 10.4807 6.50096 12 6.50096Z" stroke="currentColor" stroke-width="1.5"/>
                    <path d="M17.625 6.37498L18.7017 5.2983L19.7784 4.22163M4.22163 19.7784L5.29924 18.7008L6.37591 17.6241M19.9538 12H21.4774H23M1 12H2.52265H4.04623M17.625 17.6241L18.7017 18.7008L19.7784 19.7784M4.22163 4.22163L5.29924 5.2983L6.37591 6.37498M12.0317 4.04623V2.52265V1M12.0317 23V21.4764V19.9538" stroke="currentColor" stroke-width="1.5"/>
                `;
            }
        }
    }
    
    // 모바일 테마 토글 아이콘도 동기화
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    if (mobileThemeToggle) {
        // newTheme가 라이트모드면 달 아이콘(다크모드 전환), 다크모드면 태양 아이콘(라이트모드 전환)
        updateMobileThemeIcon(mobileThemeToggle, newTheme === 'light' ? 'dark' : 'light');
    }
    
    console.log('테마 변경 완료:', newTheme);
}

// 모바일 메뉴 초기화 함수
function initMobileMenu() {
    mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuToggle = document.querySelector('#nav-menu-icon');
    mobileMenuClose = document.querySelector('.mobile-menu-close');
    mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
    
    if (!mobileMenuOverlay || !mobileMenuToggle) {
        console.log('모바일 메뉴 요소를 찾을 수 없음:', {
            mobileMenuOverlay: !!mobileMenuOverlay,
            mobileMenuToggle: !!mobileMenuToggle
        });
        return;
    }
    
    console.log('모바일 메뉴 요소들 찾음:', {
        mobileMenuOverlay: mobileMenuOverlay,
        mobileMenuToggle: mobileMenuToggle
    });
    
    // 햄버거 메뉴 클릭 이벤트 (여러 이벤트 타입으로 확실하게)
    function handleMenuClick(e) {
        console.log('햄버거 메뉴 클릭됨!', e);
        e.preventDefault();
        e.stopPropagation();
        openMobileMenu();
    }
    
    // 모든 이벤트 타입에 동일한 핸들러 적용
    mobileMenuToggle.addEventListener('click', handleMenuClick, { passive: false });
    mobileMenuToggle.addEventListener('touchstart', handleMenuClick, { passive: false });
    mobileMenuToggle.addEventListener('mousedown', handleMenuClick, { passive: false });
    mobileMenuToggle.addEventListener('pointerdown', handleMenuClick, { passive: false });
    
    // SVG 자체에도 이벤트 추가 (혹시 모를 경우를 대비)
    const menuIconSvg = mobileMenuToggle.querySelector('svg');
    if (menuIconSvg) {
        menuIconSvg.addEventListener('click', handleMenuClick, { passive: false });
        menuIconSvg.addEventListener('touchstart', handleMenuClick, { passive: false });
    }
    
    // 닫기 버튼 클릭 이벤트
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeMobileMenu();
        });
    }
    
    // 메뉴 링크 클릭 시 메뉴 닫기
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });
    
    // 오버레이 클릭 시 메뉴 닫기
    mobileMenuOverlay.addEventListener('click', function(e) {
        if (e.target === mobileMenuOverlay) {
            closeMobileMenu();
        }
    });
    
    // ESC 키로 메뉴 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // 모바일 테마 토글 기능
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // 직접 테마 변경
            const currentTheme = document.body.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            console.log('모바일 테마 토글:', currentTheme, '->', newTheme);
            
            // 테마 변경
            document.body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // 데스크톱 테마 토글 아이콘도 동기화
            const themeToggle = document.getElementById('theme-toggle');
            if (themeToggle) {
                const desktopSvg = themeToggle.querySelector('svg');
                if (desktopSvg) {
                    if (newTheme === 'dark') {
                        // 다크모드 아이콘 (달)
                        desktopSvg.innerHTML = `
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M20.086 16.417C15.073 16.417 11.01 12.377 11.01 7.394C11.01 5.798 11.43 4.301 12.162 3C7.58 3.456 4 7.3 4 11.977C4 16.961 8.064 21 13.076 21C16.483 21 19.448 19.132 21 16.372C20.7 16.402 20.395 16.417 20.086 16.417Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                        `;
                    } else {
                        // 라이트모드 아이콘 (태양)
                        desktopSvg.innerHTML = `
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.50096C13.5184 6.50096 14.8941 7.11648 15.8897 8.11109C16.8854 9.10665 17.5 10.4813 17.5 12.0005C17.5 13.5197 16.8844 14.8943 15.8897 15.8899C14.8941 16.8854 13.5184 17.5 12 17.5C10.4807 17.5 9.10592 16.8845 8.11027 15.8899C7.11462 14.8943 6.5 13.5197 6.5 12.0005C6.5 10.4813 7.11558 9.10665 8.11027 8.11109C9.10592 7.11553 10.4807 6.50096 12 6.50096Z" stroke="currentColor" stroke-width="1.5"/>
                            <path d="M17.625 6.37498L18.7017 5.2983L19.7784 4.22163M4.22163 19.7784L5.29924 18.7008L6.37591 17.6241M19.9538 12H21.4774H23M1 12H2.52265H4.04623M17.625 17.6241L18.7017 18.7008L19.7784 19.7784M4.22163 4.22163L5.29924 5.2983L6.37591 6.37498M12.0317 4.04623V2.52265V1M12.0317 23V21.4764V19.9538" stroke="currentColor" stroke-width="1.5"/>
                        `;
                    }
                }
            }
            
            // 모바일 테마 토글 아이콘도 동기화
            updateMobileThemeIcon(mobileThemeToggle, newTheme === 'light' ? 'dark' : 'light');
        });
    }
    
    
    // 모바일 메뉴 초기화 시 테마 아이콘 설정
    const currentTheme = document.body.getAttribute('data-theme') || 'dark';
    if (mobileThemeToggle) {
        // 현재 테마가 다크모드면 태양 아이콘(라이트모드 전환), 라이트모드면 달 아이콘(다크모드 전환)을 표시
        updateMobileThemeIcon(mobileThemeToggle, currentTheme === 'dark' ? 'light' : 'dark');
        console.log('모바일 테마 아이콘 초기화:', currentTheme === 'dark' ? 'light' : 'dark');
    }
    
    console.log('모바일 메뉴 초기화 완료');
}

