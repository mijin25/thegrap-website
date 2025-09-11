// 폰트 로딩 확인 및 처리
document.fonts.ready.then(() => {
    console.log('폰트 로딩 완료');
    document.body.classList.remove('fonts-loading');
    document.body.classList.add('fonts-loaded');
});

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
        
        // 모바일 메뉴 초기화 (DOM이 완전히 렌더링된 후 실행)
        setTimeout(() => {
            initMobileMenu();
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
                                <svg width="126" height="18" viewBox="0 0 126 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M125.713 9.06025C125.713 10.0469 125.509 10.9349 125.101 11.7243C124.693 12.5136 124.14 13.1911 123.443 13.7568C122.759 14.3225 121.983 14.7566 121.115 15.0592C120.246 15.3486 119.345 15.4933 118.411 15.4933C117.938 15.4933 117.444 15.4473 116.931 15.3552C116.431 15.2762 115.945 15.1578 115.471 15C115.01 14.829 114.596 14.6251 114.228 14.3883C114.228 14.3883 114.221 14.3883 114.208 14.3883C114.208 14.3883 114.201 14.3883 114.188 14.3883C114.188 14.3883 114.188 14.3948 114.188 14.408V17.5653H107.361C107.361 16.7497 107.361 15.9406 107.361 15.1381C107.361 14.3225 107.361 13.5134 107.361 12.7109C107.361 11.8953 107.361 11.0862 107.361 10.2837C107.361 9.46807 107.361 8.65901 107.361 7.85652C107.361 7.04087 107.361 6.23181 107.361 5.42932C107.361 4.61367 107.361 3.79145 107.361 2.96265H114.188C114.188 3.6599 114.188 4.34398 114.188 5.01492C114.188 5.68585 114.188 6.35678 114.188 7.02772C114.188 7.69865 114.188 8.38932 114.188 9.09972C114.188 9.34967 114.254 9.56674 114.386 9.75092C114.517 9.93509 114.695 10.0864 114.918 10.2048C115.142 10.3232 115.392 10.4153 115.668 10.4811C115.958 10.5337 116.247 10.56 116.537 10.56C117.05 10.56 117.471 10.4876 117.799 10.3429C118.142 10.1982 118.391 10.014 118.549 9.79038C118.72 9.56674 118.806 9.33652 118.806 9.09972C118.806 8.88923 118.76 8.69847 118.668 8.52745C118.576 8.34327 118.438 8.18541 118.253 8.05385C118.069 7.90914 117.832 7.79732 117.543 7.71838C117.254 7.63945 116.918 7.59998 116.537 7.59998C115.984 7.59998 115.491 7.69865 115.057 7.89598C114.636 8.09332 114.353 8.41563 114.208 8.86292L115.787 2.96265C116.221 2.85741 116.648 2.78505 117.069 2.74558C117.49 2.69296 117.905 2.66665 118.313 2.66665C119.115 2.66665 119.885 2.75874 120.621 2.94292C121.371 3.12709 122.049 3.39678 122.654 3.75198C123.272 4.10718 123.812 4.5479 124.272 5.07412C124.732 5.58718 125.088 6.17918 125.338 6.85012C125.588 7.50789 125.713 8.24461 125.713 9.06025Z" fill="currentColor"/>
                                    <path d="M91.504 3.94239C92.4644 3.50826 93.5037 3.18595 94.6219 2.97546C95.7533 2.75181 96.8846 2.63999 98.016 2.63999C99.1211 2.63999 100.187 2.74523 101.213 2.95572C102.239 3.16621 103.153 3.48852 103.956 3.92266C104.771 4.35679 105.416 4.89617 105.89 5.54079C106.363 6.18541 106.6 6.94186 106.6 7.81012C106.6 9.08621 106.6 10.3623 106.6 11.6384C106.6 12.9145 106.6 14.1906 106.6 15.4667C106.14 15.4667 105.679 15.4667 105.219 15.4667C104.758 15.4667 104.298 15.4667 103.837 15.4667C103.377 15.4667 102.916 15.4667 102.456 15.4667C101.996 15.4667 101.535 15.4667 101.075 15.4667C100.614 15.4667 100.154 15.4667 99.6934 15.4667C99.6934 14.7694 99.6934 14.0787 99.6934 13.3947C99.6934 12.6974 99.6934 12.0067 99.6934 11.3227C99.6934 11.0859 99.6144 10.8951 99.4566 10.7504C99.2987 10.6057 99.1079 10.507 98.8843 10.4544C98.6606 10.3886 98.437 10.3557 98.2133 10.3557C97.7134 10.3557 97.3319 10.4544 97.0688 10.6517C96.8189 10.8491 96.6939 11.0727 96.6939 11.3227C96.6939 11.5726 96.8254 11.8028 97.0886 12.0133C97.3517 12.2107 97.7266 12.3093 98.2133 12.3093C98.4501 12.3093 98.7198 12.2633 99.0224 12.1712C99.325 12.0791 99.5552 11.8423 99.7131 11.4608C99.4368 12.1054 99.154 12.75 98.8646 13.3947C98.5883 14.0393 98.312 14.6839 98.0358 15.3285C97.5621 15.5653 97.0622 15.7298 96.536 15.8219C96.023 15.9271 95.5099 15.9797 94.9968 15.9797C94.3785 15.9797 93.7799 15.8942 93.2011 15.7232C92.6354 15.5653 92.1223 15.3285 91.6619 15.0128C91.2146 14.6971 90.8594 14.3024 90.5963 13.8288C90.3332 13.3552 90.2016 12.8027 90.2016 12.1712C90.2016 11.7897 90.2674 11.4147 90.399 11.0464C90.5305 10.678 90.7278 10.3294 90.991 10.0005C91.2541 9.67163 91.5829 9.38221 91.9776 9.13226C92.3854 8.8823 92.8656 8.69155 93.4182 8.55999C93.9707 8.41528 94.6021 8.34292 95.3126 8.34292C95.773 8.34292 96.2203 8.38239 96.6544 8.46132C97.0886 8.5271 97.4964 8.63235 97.8779 8.77706C98.2726 8.92177 98.6212 9.09937 98.9238 9.30986C99.2395 9.52035 99.496 9.75714 99.6934 10.0203C99.6934 9.99395 99.6934 9.97421 99.6934 9.96106C99.6934 9.93475 99.6934 9.91501 99.6934 9.90186C99.6934 9.87555 99.6934 9.85581 99.6934 9.84266C99.6934 9.43484 99.5881 9.08621 99.3776 8.79679C99.1803 8.49421 98.904 8.25083 98.5488 8.06666C98.2068 7.86932 97.8055 7.72461 97.3451 7.63252C96.8978 7.54044 96.4242 7.49439 95.9243 7.49439C95.1481 7.49439 94.3654 7.59306 93.576 7.79039C92.7867 7.98772 92.096 8.27715 91.504 8.65866V3.94239Z" fill="currentColor"/>
                                    <path d="M84.1643 3.23182C84.1643 4.02115 84.1643 4.81706 84.1643 5.61955C84.1643 6.40888 84.1643 7.20479 84.1643 8.00728C84.1643 8.79662 84.1643 9.59253 84.1643 10.395C84.1643 11.237 84.1643 12.0789 84.1643 12.9209C84.1643 13.7628 84.1643 14.6114 84.1643 15.4665H77.3366C77.3366 14.1641 77.3366 12.8617 77.3366 11.5593C77.3366 10.2569 77.3366 8.95448 77.3366 7.65208C77.3366 6.91537 77.3366 6.17866 77.3366 5.44195C77.3366 4.70524 77.3366 3.96853 77.3366 3.23182H84.1643ZM84.1446 10.77L85.2102 5.46168C85.3286 4.896 85.5588 4.42897 85.9008 4.06062C86.256 3.67911 86.6704 3.38968 87.144 3.19235C87.6176 2.99502 88.1044 2.87662 88.6043 2.83715C89.1042 2.78453 89.5647 2.80426 89.9856 2.89635C90.4066 2.97528 90.7421 3.11342 90.992 3.31075L89.4923 10.6516C89.1108 10.3358 88.6438 10.1188 88.0912 10.0004C87.5519 9.88195 87.0059 9.84248 86.4534 9.88195C85.9008 9.90826 85.4141 10.0003 84.9931 10.1582C84.5721 10.3161 84.2893 10.52 84.1446 10.77Z" fill="currentColor"/>
                                    <path d="M65.7352 0.0744629C68.0769 0.0744629 70.0108 0.363885 71.5368 0.942729C73.0629 1.52157 74.2337 2.31091 75.0493 3.31073C75.865 4.2974 76.3781 5.41562 76.5885 6.6654L68.0638 8.6782C68.2085 8.17828 68.215 7.74415 68.0835 7.3758C67.9519 7.00744 67.6888 6.71802 67.2942 6.50753C66.8995 6.29704 66.3733 6.1918 65.7155 6.1918C65.0972 6.1918 64.6038 6.27731 64.2355 6.44833C63.8803 6.61935 63.6237 6.83642 63.4659 7.09953C63.3212 7.34949 63.2488 7.61917 63.2488 7.9086C63.2488 8.11909 63.2949 8.323 63.387 8.52033C63.479 8.70451 63.6237 8.87553 63.8211 9.0334C64.0184 9.19126 64.2749 9.31624 64.5907 9.40833C64.9064 9.50042 65.2813 9.54646 65.7155 9.54646C66.3864 9.54646 66.9061 9.47411 67.2744 9.3294C67.6428 9.17153 67.9059 8.95446 68.0638 8.6782C67.8533 9.45437 67.6428 10.2371 67.4323 11.0265C67.2218 11.8158 67.0047 12.6117 66.7811 13.4142C66.5706 14.2035 66.3601 14.9863 66.1496 15.7625C65.7944 15.8282 65.4458 15.8743 65.1038 15.9006C64.7749 15.9401 64.3802 15.9598 63.9198 15.9598C62.9199 15.9598 61.999 15.8677 61.1571 15.6835C60.3283 15.4994 59.5784 15.2428 58.9075 14.9139C58.2366 14.5719 57.6446 14.1641 57.1315 13.6905C56.6316 13.2169 56.2106 12.6906 55.8686 12.1118C55.5397 11.5198 55.2897 10.8883 55.1187 10.2174C54.9477 9.53331 54.8622 8.82291 54.8622 8.0862C54.8622 7.48104 54.9214 6.89562 55.0398 6.32993C55.1713 5.75108 55.3686 5.19855 55.6318 4.67233C55.908 4.13295 56.2566 3.63304 56.6776 3.1726C57.0986 2.699 57.5919 2.27802 58.1576 1.90966C58.7365 1.52815 59.4008 1.19926 60.1507 0.922996C60.9006 0.64673 61.7359 0.436241 62.6568 0.291529C63.5909 0.146818 64.617 0.0744629 65.7352 0.0744629ZM68.0638 15.4665C68.0638 14.7034 68.0638 13.947 68.0638 13.1971C68.0638 12.4473 68.0638 11.6974 68.0638 10.9475C68.0638 10.1845 68.0638 9.42806 68.0638 8.6782C68.9978 8.6782 69.9253 8.6782 70.8461 8.6782C71.7802 8.6782 72.7142 8.6782 73.6483 8.6782C74.5823 8.6782 75.5098 8.6782 76.4307 8.6782V15.4665H68.0638Z" fill="currentColor"/>
                                    <path d="M42.0634 11.0069C42.7606 11.0069 43.3 10.8819 43.6815 10.632C44.063 10.382 44.2604 10.04 44.2735 9.60586L50.3711 11.5989C50.1343 12.4277 49.6278 13.1842 48.8517 13.8683C48.0886 14.5392 47.1217 15.072 45.9509 15.4667C44.78 15.8613 43.471 16.0587 42.0239 16.0587C40.7873 16.0587 39.6296 15.9205 38.5509 15.6443C37.4853 15.368 36.5446 14.9536 35.729 14.4011C34.9265 13.8354 34.295 13.1315 33.8346 12.2896C33.3741 11.4476 33.1439 10.4675 33.1439 9.34933C33.1439 8.2311 33.3741 7.25101 33.8346 6.40906C34.295 5.5671 34.9265 4.86986 35.729 4.31732C36.5446 3.75164 37.4918 3.33066 38.5706 3.05439C39.6493 2.77812 40.8005 2.63999 42.0239 2.63999C43.2737 2.63999 44.4182 2.77812 45.4575 3.05439C46.51 3.33066 47.4111 3.75821 48.161 4.33706C48.924 4.90275 49.5094 5.6263 49.9173 6.50772C50.3382 7.37599 50.5487 8.4087 50.5487 9.60586H39.7941C39.7941 9.60586 39.7875 9.60586 39.7743 9.60586C39.7743 9.60586 39.7743 9.61244 39.7743 9.62559C39.7743 9.82292 39.8269 10.0071 39.9322 10.1781C40.0374 10.3491 40.1821 10.5004 40.3663 10.632C40.5637 10.7504 40.8005 10.8425 41.0767 10.9083C41.3661 10.974 41.695 11.0069 42.0634 11.0069ZM42.0239 7.63252C41.3793 7.63252 40.8465 7.75092 40.4255 7.98772C40.0045 8.21137 39.7941 8.53368 39.7941 8.95466C39.7941 8.96781 39.7941 8.98097 39.7941 8.99412C39.8072 8.99412 39.8138 8.99412 39.8138 8.99412H44.2143C44.2275 8.99412 44.2341 8.99412 44.2341 8.99412C44.2341 8.98097 44.2341 8.96781 44.2341 8.95466C44.2341 8.74417 44.1749 8.55999 44.0565 8.40212C43.9512 8.2311 43.7999 8.09297 43.6026 7.98772C43.4053 7.86932 43.1685 7.78381 42.8922 7.73119C42.6291 7.66541 42.3397 7.63252 42.0239 7.63252Z" fill="currentColor"/>
                                    <path d="M16.8262 15.4666C16.8262 14.2431 16.8262 13.0262 16.8262 11.8159C16.8262 10.6056 16.8262 9.39526 16.8262 8.18495C16.8262 6.96149 16.8262 5.7446 16.8262 4.53429C16.8262 3.87651 16.8262 3.23189 16.8262 2.60042C16.8262 1.9558 16.8262 1.31118 16.8262 0.666553H23.6539C23.6539 1.07438 23.6539 1.55455 23.6539 2.10709C23.6539 2.64646 23.6539 3.21215 23.6539 3.80415C23.6539 4.39615 23.6539 4.96842 23.6539 5.52095C23.6539 6.25766 23.6539 6.88913 23.6539 7.41535C23.6539 7.94158 23.6539 8.23758 23.6539 8.30335C23.6539 8.36913 23.6539 8.52042 23.6539 8.75722C23.6539 8.98087 23.6539 9.25713 23.6539 9.58602C23.6539 10.0202 23.6539 10.5069 23.6539 11.0463C23.6539 11.5857 23.6539 12.1382 23.6539 12.7039C23.6539 13.2564 23.6539 13.7761 23.6539 14.2628C23.6539 14.7496 23.6539 15.1508 23.6539 15.4666H16.8262ZM25.7456 15.4666C25.7456 14.9535 25.7456 14.4404 25.7456 13.9274C25.7456 13.4143 25.7456 12.9078 25.7456 12.4079C25.7456 11.8948 25.7456 11.3818 25.7456 10.8687C25.7456 10.3556 25.7456 9.84255 25.7456 9.32949C25.7456 8.94798 25.647 8.67171 25.4496 8.50069C25.2654 8.32966 25.0418 8.23758 24.7787 8.22442C24.5156 8.19811 24.2722 8.21784 24.0486 8.28362C23.8381 8.3494 23.7065 8.42175 23.6539 8.50069L25.2326 3.42922C25.7062 3.21873 26.2126 3.06086 26.752 2.95562C27.2914 2.85038 27.8242 2.79775 28.3504 2.79775C29.0871 2.79775 29.7712 2.91615 30.4027 3.15295C31.0473 3.38975 31.567 3.76469 31.9616 4.27775C32.3694 4.79082 32.5734 5.47491 32.5734 6.33002C32.5734 7.343 32.5734 8.36255 32.5734 9.38869C32.5734 10.4017 32.5734 11.4146 32.5734 12.4276C32.5734 13.4406 32.5734 14.4536 32.5734 15.4666H25.7456Z" fill="currentColor"/>
                                    <path d="M16.1797 0.666553V6.66549H11.424C11.424 6.66549 11.4174 6.67206 11.4043 6.68522C11.4043 6.68522 11.3977 6.68522 11.3845 6.68522C11.3845 6.68522 11.3845 6.6918 11.3845 6.70495C11.3845 7.2838 11.3845 7.86922 11.3845 8.46122C11.3845 9.04006 11.3845 9.62549 11.3845 10.2175C11.3845 10.7963 11.3845 11.3818 11.3845 11.9738C11.3845 12.5526 11.3845 13.138 11.3845 13.73C11.3845 14.3089 11.3845 14.8877 11.3845 15.4666H4.7952C4.7952 14.493 4.7952 13.5195 4.7952 12.546C4.7952 11.5725 4.7952 10.599 4.7952 9.62549C4.7952 8.65198 4.7952 7.67846 4.7952 6.70495C4.7952 6.6918 4.78862 6.68522 4.77547 6.68522C4.77547 6.67206 4.76889 6.66549 4.75573 6.66549H0V0.666553H16.1797Z" fill="currentColor"/>
                                </svg>
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
                            <button id="theme-toggle" class="theme-toggle-btn">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M20.086 16.417C15.073 16.417 11.01 12.377 11.01 7.394C11.01 5.798 11.43 4.301 12.162 3C7.58 3.456 4 7.3 4 11.977C4 16.961 8.064 21 13.076 21C16.483 21 19.448 19.132 21 16.372C20.7 16.402 20.395 16.417 20.086 16.417Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                                </svg>
                            </button>
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
    updateThemeIcon(button, mode) {
        const svg = button.querySelector('svg');
        if (!svg) return;
        
        if (mode === 'dark') {
            // 다크모드 아이콘 (달)
            svg.innerHTML = `
                <path fill-rule="evenodd" clip-rule="evenodd" d="M20.086 16.417C15.073 16.417 11.01 12.377 11.01 7.394C11.01 5.798 11.43 4.301 12.162 3C7.58 3.456 4 7.3 4 11.977C4 16.961 8.064 21 13.076 21C16.483 21 19.448 19.132 21 16.372C20.7 16.402 20.395 16.417 20.086 16.417Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
            `;
        } else {
            // 라이트모드 아이콘 (태양)
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
                this.updateThemeIcon(themeToggle, 'light');
            } else {
                body.setAttribute('data-theme', 'light');
                this.updateThemeIcon(themeToggle, 'dark');
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
                    self.updateThemeIcon(themeToggle, 'light');
                    localStorage.setItem('theme', 'dark');
                } else {
                    body.setAttribute('data-theme', 'light');
                    self.updateThemeIcon(themeToggle, 'dark');
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
    
    // 페이지네이션 총 개수 설정 (3개로 고정)
    if (paginationTotal) {
        paginationTotal.textContent = 3;
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
    
    // 슬라이드 표시 함수 - Design Fever 스타일 즉시 전환
    function showSlide(index) {
        if (isTransitioning || index === currentSlide) {
            console.log(`슬라이드 전환 건너뜀: ${currentSlide} → ${index} (전환중: ${isTransitioning})`);
            return;
        }
        
        console.log(`슬라이드 전환 시작: ${currentSlide} → ${index}`);
        isTransitioning = true;
        
        // 현재 슬라이드 숨기기
        slides[currentSlide].classList.remove('active');
        
        // 새 슬라이드 표시
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        
        // 페이지네이션 업데이트
        if (paginationCurrent) {
            paginationCurrent.textContent = currentSlide + 1;
        }
        
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
    
    // 초기 슬라이드 표시
    showSlide(0);
    
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
            
            // 기존 테마 토글 기능과 동일하게 작동
            const themeToggle = document.getElementById('theme-toggle');
            if (themeToggle) {
                themeToggle.click(); // 기존 테마 토글 버튼 클릭 시뮬레이션
                
                // 모바일 테마 토글 아이콘도 동기화
                setTimeout(() => {
                    const isDarkMode = document.body.getAttribute('data-theme') === 'dark';
                    updateMobileThemeIcon(mobileThemeToggle, isDarkMode ? 'light' : 'dark');
                }, 50);
            }
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

