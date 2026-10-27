(function () {
    'use strict';

    /* ================================================================
       PEDRO LIMA — ANIMATIONS ENGINE  v4
       1. Page entry (sem loading screen — fade-in fluido)
       2. Cursor (mix-blend-mode: exclusion + adaptativo claro/escuro)
       3. Slideshow de imagens nos projetos (sem flash de volta à thumb)
       4. Word-by-word animation em headings (gradient spans atômicos)
       5. Animações de scroll (IntersectionObserver)
       6. Lightbox para imagens das páginas de projeto
       ================================================================ */

    var PROJECT_IMAGES = {
        '/vex': ['/assets/vex-1-1600w.webp', '/assets/vex-2.webp', '/assets/vex-3-1600w.webp', '/assets/vex-4-1600w.webp', '/assets/vex-6-1600w.webp'],
        '/conexion-idiomas': ['/assets/conexion-idiomas-video-poster.webp', '/assets/conexion-idiomas-2-1600w.webp', '/assets/conexion-idiomas-3-1600w.webp', '/assets/conexion-idiomas-4-1600w.webp', '/assets/conexion-idiomas-6-1600w.webp'],
        '/tais-veiga': ['/assets/tais-veiga-1-1600w.webp', '/assets/tais-veiga-2-1600w.webp', '/assets/tais-veiga-3-1600w.webp', '/assets/tais-veiga-4-1600w.webp', '/assets/tais-veiga-5-1600w.webp'],
        '/roger-nobles': ['/assets/roger-nobles-1-1600w.webp', '/assets/roger-nobles-2-1600w.webp', '/assets/roger-nobles-5-1600w.webp', '/assets/roger-nobles-4-1600w.webp', '/assets/roger-nobles-6-1600w.webp', '/assets/roger-nobles-3-1600w.webp', '/assets/roger-nobles-7-1600w.webp'],
        '/robison-kunz': ['/assets/robison-kunz-1-1600w.webp', '/assets/robison-kunz-2-1600w.webp', '/assets/robison-kunz-3-1600w.webp', '/assets/robison-kunz-4-1600w.webp', '/assets/robison-kunz-6-1600w.webp'],
        '/luna-sheeny': ['/assets/luna-sheeny-2-1600w.webp', '/assets/luna-sheeny-3-1600w.webp', '/assets/luna-sheeny-4-1600w.webp', '/assets/luna-sheeny-5-1600w.webp', '/assets/luna-sheeny-6-1600w.webp', '/assets/luna-sheeny-7-1600w.webp'],
        '/martin-dahmer': ['/assets/martin-dahmer-2-1600w.webp', '/assets/martin-dahmer-3-1600w.webp', '/assets/martin-dahmer-4-1600w.webp', '/assets/martin-dahmer-5-1600w.webp', '/assets/martin-dahmer-6-1600w.webp', '/assets/martin-dahmer-7-1600w.webp'],
        '/priscila-elpo': ['/assets/priscila-elpo-1-1600w.webp', '/assets/priscila-elpo-2-1600w.webp', '/assets/priscila-elpo-3-1600w.webp', '/assets/priscila-elpo-4-1600w.webp'],
        '/vitor-dos-santos': ['/assets/vitor-dos-santos-1.webp', '/assets/vitor-dos-santos-3.webp', '/assets/vitor-dos-santos-2.webp', '/assets/vitor-dos-santos-4.webp'],
    };

    var PROJECT_HREFS = Object.keys(PROJECT_IMAGES);
    var isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

    /* ================================================================
       1. PAGE ENTRY — fade-in fluido sem loader preto
       O body começa invisível (via CSS opacity:0 inline ou class) e
       faz fade-in assim que o DOM estiver pronto. Imagens acima do fold
       carregam com prioridade; o restante não bloqueia.
       ================================================================ */

    // FIX: antes o JS zerava a opacidade da página DEPOIS do primeiro paint
    // (script no fim do body), causando o efeito de "recarregar". Agora o
    // estado inicial das animações é aplicado via CSS desde o primeiro paint
    // (classe .lima-js no <html>, setada inline no <head>).
    window.__limaReady = true;

    /* ================================================================
       2. CURSOR PERSONALIZADO
       mix-blend-mode: exclusion no círculo faz branco virar escuro em
       fundos claros e escuro virar branco em fundos escuros.
       No estado -explore (sobre imagens de projeto), o blend é
       desligado e o círculo fica BRANCO puro — sempre visível.
       ================================================================ */

    var cursor = null;
    var cursorLabel = null;

    if (!isTouchDevice) {
        cursor = document.createElement('div');
        cursor.className = 'lima-cursor';
        cursor.innerHTML = '<div class="lima-cursor__circle"></div>';

        cursorLabel = document.createElement('span');
        cursorLabel.className = 'lima-cursor__label';
        cursorLabel.textContent = 'EXPLORAR';
        cursor.appendChild(cursorLabel);

        document.body.appendChild(cursor);

        var mouseX = window.innerWidth / 2;
        var mouseY = window.innerHeight / 2;
        var curX = mouseX;
        var curY = mouseY;
        var isActive = false;

        /* ---- Lerp do cursor ---- */
        (function tick() {
            curX += (mouseX - curX) * 0.13;
            curY += (mouseY - curY) * 0.13;
            cursor.style.transform = 'translate(' + curX.toFixed(2) + 'px,' + curY.toFixed(2) + 'px)';
            requestAnimationFrame(tick);
        })();

        /* ---- Detecção de zona: fundo claro → cursor escuro, fundo escuro → cursor branco ---- */
        var lastZoneCheck = 0;

        function detectCursorZone(clientX, clientY) {
            if (!cursor || cursor.classList.contains('-explore')) return;
            var now = Date.now();
            if (now - lastZoneCheck < 120) return;
            lastZoneCheck = now;

            var el = document.elementFromPoint(clientX, clientY);
            if (!el) return;

            var isDark = false;
            var node = el;
            var depth = 0;
            while (node && node !== document.documentElement && depth < 8) {
                var style = window.getComputedStyle(node);
                var bgImg = style.backgroundImage;
                var bgColor = style.backgroundColor;

                /* background-image não-vazia → assume fundo escuro (parallax, hero) */
                if (bgImg && bgImg !== 'none') { isDark = true; break; }

                /* background-color explícito (não transparente) */
                if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)') {
                    var p = bgColor.match(/[\d.]+/g);
                    if (p && p.length >= 3) {
                        var alpha = p.length >= 4 ? parseFloat(p[3]) : 1;
                        if (alpha < 0.1) {
                            /* Se for muito transparente, ignora e verifica o pai */
                            node = node.parentElement;
                            depth++;
                            continue;
                        }
                        var lum = (0.299 * +p[0] + 0.587 * +p[1] + 0.114 * +p[2]) / 255;
                        isDark = lum < 0.5;
                    }
                    break;
                }
                node = node.parentElement;
                depth++;
            }

            var circle = cursor.querySelector('.lima-cursor__circle');
            if (isDark) {
                cursor.classList.add('-on-dark-bg');
                if (circle) { circle.style.background = '#ffffff'; circle.style.mixBlendMode = ''; }
            } else {
                cursor.classList.remove('-on-dark-bg');
                if (circle) { circle.style.background = '#060312'; circle.style.mixBlendMode = 'normal'; }
            }
        }

        /* ---- Mouse entra / move ---- */
        document.addEventListener('mousemove', function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;

            if (!isActive) {
                curX = mouseX;
                curY = mouseY;
                isActive = true;
                cursor.classList.remove('-leaving');
                cursor.classList.add('-active');
            }

            detectCursorZone(e.clientX, e.clientY);
        });

        /* ---- Mouse sai da janela ---- */
        document.addEventListener('mouseleave', function () {
            isActive = false;
            cursor.classList.remove('-active', '-pointer', '-explore', '-on-dark-bg');
            cursor.classList.add('-leaving');
        });

        /* ---- Estado pointer via event delegation ---- */
        document.addEventListener('mouseover', function (e) {
            if (!cursor) return;
            if (cursor.classList.contains('-explore')) return;

            var el = e.target;
            while (el && el !== document.body) {
                if (
                    el.tagName === 'A' ||
                    el.tagName === 'BUTTON' ||
                    el.getAttribute('role') === 'button' ||
                    el.classList.contains('elementor-button')
                ) {
                    cursor.classList.add('-pointer');
                    return;
                }
                el = el.parentElement;
            }
            cursor.classList.remove('-pointer');
        });
    }

    /* ================================================================
       3. PROJECT IMAGE SLIDESHOW
       FIX: ao mouseenter, mostra images[0] IMEDIATAMENTE (sem esperar
       o primeiro tick do interval). Interval começa em images[1].
       FIX: imgA tem object-fit:cover para sempre preencher o wrap.
       FIX: wrap tem aspect-ratio fixo para evitar colapso.
       ================================================================ */

    /* Pré-carregamento sob demanda (antes baixava ~7MB de todas as fotos de
       todos os projetos em qualquer página, inclusive nas subpáginas):
       - card chega perto da tela → baixa as 2 primeiras do slideshow
       - mouse entra no card → baixa o restante daquele projeto */
    var preloaded = {};
    function preloadImages(list) {
        list.forEach(function (src) {
            if (preloaded[src]) return;
            preloaded[src] = true;
            var img = new Image();
            img.decoding = 'async';
            img.src = src;
        });
    }

    var cardObserver = null;
    function watchCardForPreload(link, images) {
        if (isTouchDevice || !('IntersectionObserver' in window)) return;
        if (!cardObserver) {
            cardObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (e) {
                    if (!e.isIntersecting) return;
                    cardObserver.unobserve(e.target);
                    preloadImages(PROJECT_IMAGES[e.target.getAttribute('href')].slice(0, 2));
                });
            }, { rootMargin: '300px 0px' });
        }
        var start = function () { cardObserver.observe(link); };
        if (document.readyState === 'complete') start(); else window.addEventListener('load', start);
        link.addEventListener('mouseenter', function () { preloadImages(images); });
    }

    function setupProjectSlideshows() {
        document.querySelectorAll('a').forEach(function (link) {
            var href = link.getAttribute('href');
            if (!href || PROJECT_HREFS.indexOf(href) === -1) return;

            var images = PROJECT_IMAGES[href];
            var originalImg = link.querySelector('img');
            if (!originalImg || !images || !images.length) return;

            link.classList.add('lima-project-card');
            watchCardForPreload(link, images);

            /* -- Wrapper + camadas B1 e B2 (double buffering) --
               FIX (Safari/iOS): o wrapper agora vem pronto no HTML. Antes o JS
               movia a <img loading="lazy"> para dentro dele enquanto ela ainda
               carregava, e o WebKit às vezes nunca terminava o carregamento
               (thumb em branco até recarregar a página). */
            var wrap = originalImg.parentElement;
            if (!wrap.classList.contains('lima-slide-wrap')) {
                wrap = document.createElement('div');
                wrap.className = 'lima-slide-wrap';
                link.insertBefore(wrap, originalImg);
                wrap.appendChild(originalImg);
            }
            originalImg.classList.add('lima-slide-a');

            var imgB1 = document.createElement('img');
            imgB1.className = 'lima-slide-b';
            imgB1.alt = originalImg.alt || '';
            wrap.appendChild(imgB1);

            var imgB2 = document.createElement('img');
            imgB2.className = 'lima-slide-b';
            imgB2.alt = originalImg.alt || '';
            wrap.appendChild(imgB2);

            var slideTimeout = null;
            var startDelay = null;
            var currentIdx = 0;
            var activeBuffer = 0; /* 0 ou 1 */
            var bufs = [imgB1, imgB2];

            function preloadNext() {
                var nextIdx = (currentIdx + 1) % images.length;
                var inactiveBuf = bufs[1 - activeBuffer];
                
                /* Carrega a próxima imagem no buffer que está escondido */
                inactiveBuf.classList.remove('lima-active', 'lima-playing');
                inactiveBuf.style.opacity = '0';
                inactiveBuf.src = images[nextIdx];
            }

            function swap() {
                /* 1. Troca o buffer ativo */
                activeBuffer = 1 - activeBuffer;
                var currentBuf = bufs[activeBuffer];
                var prevBuf = bufs[1 - activeBuffer];

                /* 2. Dispara animação da imagem que já estava pré-carregada */
                currentBuf.classList.add('lima-active', 'lima-playing');
                
                /* 3. Esconde a anterior após o fade-in */
                setTimeout(function() {
                    prevBuf.classList.remove('lima-active', 'lima-playing');
                    prevBuf.style.opacity = '0';
                }, 700);

                /* 4. Esconde a thumb original no primeiro swap */
                if (originalImg.style.opacity !== '0') {
                    setTimeout(function() { originalImg.style.opacity = '0'; }, 200);
                }

                /* 5. Avança o índice e já carrega a PRÓXIMA no buffer que acabou de sobrar */
                currentIdx = (currentIdx + 1) % images.length;
                preloadNext();

                /* 6. Agenda o próximo swap */
                slideTimeout = setTimeout(swap, 1500);
            }

            link.addEventListener('mouseenter', function () {
                /* Cursor */
                if (cursor) {
                    cursor.classList.add('-explore');
                    var circle = cursor.querySelector('.lima-cursor__circle');
                    if (circle) {
                        circle.style.transform = 'scale(1)';
                        circle.style.mixBlendMode = 'normal';
                        circle.style.background = '#ffffff';
                        circle.style.opacity = '1';
                    }
                }

                /* Início imediato do pipeline */
                startDelay = setTimeout(function () {
                    startDelay = null;
                    currentIdx = 0;
                    
                    /* Prepara a primeira imagem no buffer 0 e a segunda no buffer 1 */
                    bufs[0].src = images[0];
                    activeBuffer = 0;
                    
                    var isRunning = false;
                    var run = function() {
                        if (isRunning) return;
                        isRunning = true;
                        bufs[0].classList.add('lima-active', 'lima-playing');
                        preloadNext();
                        slideTimeout = setTimeout(swap, 1500);
                    };

                    if (bufs[0].complete) run(); else bufs[0].onload = run;
                }, 400);
            });

            link.addEventListener('mouseleave', function () {
                if (startDelay) { clearTimeout(startDelay); startDelay = null; }
                if (slideTimeout) { clearTimeout(slideTimeout); slideTimeout = null; }
                
                if (cursor) {
                    cursor.classList.remove('-explore');
                    var circle = cursor.querySelector('.lima-cursor__circle');
                    if (circle) {
                        circle.style.transform = '';
                        circle.style.mixBlendMode = '';
                        circle.style.background = '';
                        circle.style.opacity = '';
                    }
                }

                /* Reseta tudo para estado inicial */
                bufs.forEach(function(b) {
                    b.classList.remove('lima-active', 'lima-playing');
                    b.src = '';
                    b.style.opacity = '0';
                });
                originalImg.style.opacity = '1';
                currentIdx = 0;
                activeBuffer = 0;
            });
        });
    }

    /* ================================================================
       4. TEXT SPLIT — palavra por palavra nos headings
       ================================================================ */

    function splitHeadingWords(heading) {
        if (heading.dataset.limaSplit) return;
        heading.dataset.limaSplit = '1';
        heading.classList.add('lima-heading-anim');

        var wordCount = 0;

        function processNode(node) {
            if (node.nodeType === Node.TEXT_NODE) {
                var parts = node.textContent.split(/(\s+)/);
                var frag = document.createDocumentFragment();
                parts.forEach(function (part) {
                    if (/^\s+$/.test(part)) {
                        frag.appendChild(document.createTextNode(part));
                    } else if (part.length > 0) {
                        var wrap = document.createElement('span');
                        wrap.className = 'lima-word-wrap';
                        var inner = document.createElement('span');
                        inner.className = 'lima-word';
                        inner.style.transitionDelay = (Math.min(wordCount, 10) * 0.06).toFixed(2) + 's';
                        inner.textContent = part;
                        wordCount++;
                        wrap.appendChild(inner);
                        frag.appendChild(wrap);
                    }
                });
                node.parentNode.replaceChild(frag, node);

            } else if (node.nodeType === Node.ELEMENT_NODE) {
                var cls = node.className || '';
                var tag = node.tagName.toLowerCase();

                /* Spans de gradiente → unidade atômica (não entra dentro) */
                if (cls.indexOf('degrade-lima') !== -1) {
                    var atomicWrap = document.createElement('span');
                    atomicWrap.className = 'lima-word-wrap';
                    var atomicInner = document.createElement('span');
                    atomicInner.className = 'lima-word';
                    atomicInner.style.transitionDelay = (Math.min(wordCount, 10) * 0.06).toFixed(2) + 's';
                    wordCount++;
                    node.parentNode.insertBefore(atomicWrap, node);
                    atomicWrap.appendChild(atomicInner);
                    atomicInner.appendChild(node);
                    return;
                }

                /* Elementos inline sem gradiente → recursa */
                if (['span', 'em', 'strong', 'b', 'i'].indexOf(tag) !== -1) {
                    Array.from(node.childNodes).forEach(processNode);
                }
            }
        }

        Array.from(heading.childNodes).forEach(processNode);
    }

    /* ================================================================
       5. SCROLL ANIMATIONS — IntersectionObserver
       ================================================================ */

    function decorateElements() {
        /* Parágrafos e blocos de texto */
        document.querySelectorAll(
            'p.elementor-heading-title, .elementor-widget-text-editor'
        ).forEach(function (el, i) {
            if (!el.hasAttribute('data-lima-anim')) {
                el.setAttribute('data-lima-anim', 'text');
                el.setAttribute('data-lima-delay', String(Math.min((i % 4) + 1, 5)));
            }
        });

        /* Tags */
        document.querySelectorAll('.lima-tag').forEach(function (el) {
            if (!el.hasAttribute('data-lima-anim')) {
                el.setAttribute('data-lima-anim', 'text');
                el.setAttribute('data-lima-delay', '1');
            }
        });

        /* Botões */
        document.querySelectorAll('.elementor-widget-button').forEach(function (el) {
            if (!el.hasAttribute('data-lima-anim')) {
                el.setAttribute('data-lima-anim', 'text');
                el.setAttribute('data-lima-delay', '3');
            }
        });

        /* Imagens (exceto cards de projeto — têm slideshow próprio) */
        document.querySelectorAll('.elementor-widget-image img').forEach(function (img) {
            var link = img.closest('a');
            var widget = img.closest('.elementor-widget-image');
            if ((link && PROJECT_HREFS.indexOf(link.getAttribute('href')) !== -1) || img.closest('.parallax-layer')) {
                if (widget) widget.setAttribute('data-lima-skip', '');
                return;
            }
            if (widget && !widget.hasAttribute('data-lima-anim')) {
                widget.setAttribute('data-lima-anim', 'image');
            }
        });

        /* Ícones sociais */
        document.querySelectorAll('.elementor-widget-social-icons').forEach(function (el) {
            if (!el.hasAttribute('data-lima-anim')) {
                el.setAttribute('data-lima-anim', 'text');
                el.setAttribute('data-lima-delay', '2');
            }
        });

        /* Players de música */
        document.querySelectorAll('.iron_widget_radio').forEach(function (el) {
            if (!el.hasAttribute('data-lima-anim')) {
                el.setAttribute('data-lima-anim', 'text');
                el.setAttribute('data-lima-delay', '4');
            }
        });
    }

    function setupScrollAnimations() {
        /* Headings — word by word */
        document.querySelectorAll(
            'h1.elementor-heading-title, h2.elementor-heading-title, h3.elementor-heading-title'
        ).forEach(splitHeadingWords);

        var headingObs = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    e.target.classList.add('is-visible');
                    headingObs.unobserve(e.target);
                }
            });
        }, { threshold: 0.08 });

        document.querySelectorAll('.lima-heading-anim').forEach(function (h) {
            headingObs.observe(h);
        });

        /* Elementos gerais */
        var generalObs = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    e.target.classList.add('is-visible');
                    generalObs.unobserve(e.target);
                }
            });
        }, { threshold: 0.06 });

        document.querySelectorAll('[data-lima-anim]').forEach(function (el) {
            generalObs.observe(el);
        });
    }

    /* ================================================================
       6. LIGHTBOX — páginas de projeto
       REGRAS:
       - Só ativa em imagens .png / .jpg dentro de .elementor-widget-image
         que NÃO sejam cards de projeto da home
       - Exclui SVGs, logos (classe lima-logo-link), parallax layers
       - NUNCA esconde o cursor nativo (não aplicar cursor:none)
       - Cursor mostra "EXPANDIR" com círculo BRANCO (via -explore-white)
       ================================================================ */

    function isProjectImage(img) {
        /* Retorna true se a imagem é candidata ao lightbox:
           — Deve ser .png ou .jpg (não SVG)
           — Não pode estar dentro de .parallax-layer
           — Não pode ser logo (dentro de .lima-logo-link)
           — Não pode ser card de projeto da home */
        var src = img.getAttribute('src') || '';
        var lowerSrc = src.toLowerCase();

        /* Exclui SVGs e logos */
        if (lowerSrc.indexOf('.svg') !== -1) return false;

        /* Exclui parallax layers */
        if (img.closest('.parallax-layer')) return false;

        /* Exclui logos (link com classe lima-logo-link) */
        if (img.closest('.lima-logo-link')) return false;

        /* Exclui as thumbnails dos cards de projeto da home */
        var link = img.closest('a');
        if (link && PROJECT_HREFS.indexOf(link.getAttribute('href')) !== -1) return false;

        /* Só aceita imagens de projeto: .png, .jpg ou .webp nos assets */
        if (lowerSrc.indexOf('/assets/') === -1) return false;
        if (lowerSrc.indexOf('.png') === -1 && lowerSrc.indexOf('.jpg') === -1 && lowerSrc.indexOf('.jpeg') === -1 && lowerSrc.indexOf('.webp') === -1) return false;

        return true;
    }

    function setupLightbox() {
        var allImgs = document.querySelectorAll('.elementor-widget-image img, .lima-lightbox-trigger');
        if (!allImgs.length) return;

        /* Filtra apenas imagens de projeto válidas ou que tenham a classe trigger explicitly */
        var lightboxImages = [];
        allImgs.forEach(function (img) {
            if (img.classList.contains('lima-lightbox-trigger') || isProjectImage(img)) {
                lightboxImages.push(img);
            }
        });
        if (!lightboxImages.length) return;

        /* -- Cria overlay -- */
        var overlay = document.createElement('div');
        overlay.id = 'lima-lightbox';

        var bg = document.createElement('div');
        bg.className = 'lima-lightbox__bg';
        overlay.appendChild(bg);

        var lightboxImg = document.createElement('img');
        lightboxImg.className = 'lima-lightbox__img';
        lightboxImg.alt = '';
        overlay.appendChild(lightboxImg);

        var closeBtn = document.createElement('button');
        closeBtn.className = 'lima-lightbox__close';
        closeBtn.textContent = '✕';
        closeBtn.setAttribute('aria-label', 'Fechar');
        overlay.appendChild(closeBtn);

        document.body.appendChild(overlay);

        function openLightbox(src) {
            lightboxImg.src = src;
            overlay.classList.add('-open');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            overlay.classList.remove('-open');
            document.body.style.overflow = '';
            if (cursor) {
                cursor.classList.remove('-explore');
                if (cursorLabel) cursorLabel.textContent = 'EXPLORAR';
            }
        }

        /* -- Configura cada imagem -- */
        lightboxImages.forEach(function (img) {
            /* NÃO aplicar cursor:none — cursor nativo não pode sumir */

            /* Wrap para o scale-down no hover sem overflow (exceto para feedbacks que escalam o card todo) */
            if (!img.closest('.lima-img-hover-wrap') && !img.closest('.lima-feedback-card')) {
                var hoverWrap = document.createElement('div');
                hoverWrap.className = 'lima-img-hover-wrap';
                img.parentNode.insertBefore(hoverWrap, img);
                hoverWrap.appendChild(img);
            }

            img.addEventListener('mouseenter', function () {
                if (cursor) {
                    cursor.classList.add('-explore');
                    var circle = cursor.querySelector('.lima-cursor__circle');
                    if (circle) {
                        circle.style.transform = 'scale(1)';
                        circle.style.mixBlendMode = 'normal';
                        circle.style.background = '#ffffff';
                        circle.style.opacity = '1';
                    }
                    if (cursorLabel) cursorLabel.textContent = 'EXPANDIR';
                }
            });

            img.addEventListener('mouseleave', function () {
                if (cursor) {
                    cursor.classList.remove('-explore');
                    var circle = cursor.querySelector('.lima-cursor__circle');
                    if (circle) {
                        circle.style.transform = '';
                        circle.style.mixBlendMode = '';
                        circle.style.background = '';
                        circle.style.opacity = '';
                    }
                    if (cursorLabel) cursorLabel.textContent = 'EXPLORAR';
                }
            });

            /* Intercepta o clique no <a> wrapper na fase de CAPTURA —
               roda antes de qualquer handler do Elementor ou do browser,
               cancela a navegação e abre o lightbox. */
            var parentLink = img.closest('a[data-elementor-open-lightbox]');
            var clickTarget = parentLink || img;

            clickTarget.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                var src = img.getAttribute('data-src') ||
                    img.getAttribute('data-lazy-src') ||
                    img.src;
                openLightbox(src);
            }, true /* capture */);
        });

        /* -- Fechar -- */
        bg.addEventListener('click', closeLightbox);
        closeBtn.addEventListener('click', closeLightbox);
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && overlay.classList.contains('-open')) {
                closeLightbox();
            }
        });
    }

    /* ================================================================
       INIT
       ================================================================ */

    document.addEventListener('DOMContentLoaded', function () {
        decorateElements();
        setupProjectSlideshows();
        setupScrollAnimations();
        setupLightbox();
        document.documentElement.classList.add('lima-ready');
    });

})();
