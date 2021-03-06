(function (window) {
    'use strict';
    $.exists = function (selector) {
        return ($(selector).length > 0);
    };

    window.onpageshow = function (event) {
        if (event.persisted) {
            PageTransition();
        }
    };
    // All Funtions
    PageTransition();
    Menu();
    ms_home_slider();
    slider_slide_3();
    setLine();
    setActiv();
})(window);

/*--------------------
    Page Transition
---------------------*/
function PageTransition() {
    var preload = anime({
        targets: '.ms-preloader',
        opacity: [1, 0],
        duration: 2000,
        easing: 'easeInOutCubic',
        complete: function (preload) {
            $('.ms-preloader').css('visibility', 'hidden');
        }
    });
    $('.ms-main-container').addClass('loaded');
    var cont = anime({
        targets: '.loaded',
        opacity: [0, 1],
        easing: 'easeInOutCubic',
        duration: 1000,
        delay: 300,
        complete: function (preload) {
            $('.ug-thumb-image').css({
                'opacity': '1'
            });
            $('.ms-section__block img').css({
                'opacity': '1'
            });
            $('.ug-thumb-wrapper, .post-item').css({
                'pointer-events': 'auto'
            });
        }
    });
    $(document).on('click', '[data-type="page-transition"]', function (e) {
        var url = $(this).attr('href');
        if (url != '#' && url != '') {
            e.preventDefault();
            $('.ms-preloader').css('visibility', 'visible');
            var url = $(this).attr('href');
            var preload = anime({
                targets: '.ms-preloader',
                opacity: [0, 1],
                duration: 300,
                easing: 'easeInOutQuad',
                complete: function (preload) {
                    window.location.href = url;
                }
            });
        }

        var numberSlide = $(this).data('number-slide');
        homeSlider.slideTo(numberSlide, 1);
        $('.hamburger').toggleClass('is-active');
        $('.ms-nav').toggleClass('is-visible');
        setNavColor("#ffffff", "#384850");
        beginDigits();
        disableSocialLastSlide();
        return false;
    });
}

/*------------------
    Menu
-------------------*/
function Menu() {
    if ($.exists('.hamburger')) {
        $('.hamburger').on('click', function (e) {
            var burger = $(this);
            $(burger).toggleClass('is-active');
            $('.ms-nav').toggleClass('is-visible');
            $('.ms-header').not('.navbar-white').each(function () {
                $('.logo-light').toggleClass('active');
            });
        });
        $('.height-full-viewport').on({
            'mousewheel': function (e) {
                if (e.target.id === 'el') return;
                e.preventDefault();
                e.stopPropagation();
            }
        })
    }
}

/*------------------
    Home Slider
-------------------*/
var homeSlider;

function ms_home_slider() {
    if ($.exists('.swiper-container')) {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
            // Take the user to a different screen here.
            homeSlider = new Swiper('.swiper-container', {
                initialSlide: 0,
                loop: true,
                speed: 1500,
                grabCursor: false,
                mousewheel: true,
                keyboard: true,
                simulateTouch: false,
                parallax: false,
                effect: 'slide',
                preloadImages: false,
                lazy: {
                    loadPrevNext: true,
                },
                pagination: {
                    el: '.swiper-pagination',
                    type: 'progressbar',
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }
            });
            $('.expanded-timeline__counter span:first-child').text('1');
            $('.expanded-timeline__counter span:last-child').text(homeSlider.slides.length - 2);
            homeSlider.on('slideChange', function () {
                $('.expanded-timeline__counter span:first-child').text(homeSlider.realIndex + 1);
                beginDigits();
                setNavColor("#ffffff", "#384850");
                disableSocialLastSlide()
            });
        } else {
            homeSlider = new Swiper('.swiper-container', {
                initialSlide: 0,
                loop: true,
                speed: 1500,
                grabCursor: false,
                mousewheel: true,
                keyboard: true,
                simulateTouch: false,
                parallax: false,
                effect: 'slide',
                preloadImages: false,
                lazy: {
                    loadPrevNext: true,
                },
                pagination: {
                    el: '.swiper-pagination',
                    type: 'progressbar',
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }
            });
            $('.expanded-timeline__counter span:first-child').text('1');
            $('.expanded-timeline__counter span:last-child').text(homeSlider.slides.length - 2);
            homeSlider.on('slideChange', function () {
                $('.expanded-timeline__counter span:first-child').text(homeSlider.realIndex + 1);
                beginDigits();
                setNavColor("#ffffff", "#384850");
                disableSocialLastSlide()
            });
        }
    }
}

// Typed
var TxtRotate = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 300 - Math.random() * 100;

    if (this.isDeleting) {
        delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 2000;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    var elements = document.getElementsByClassName('txt-rotate');
    setTimeout(function () {
        for (var i = 0; i < elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-rotate');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
                new TxtRotate(elements[i], JSON.parse(toRotate), period);
            }
        }
    }, 2000);
};

new WOW().init();

//preloader
$(window).on('load', function () {
    var $preloader = $('.preloader');
    $preloader.delay(500).fadeOut('slow');

    $('#page-loader').addClass('p-hidden');
});

// swiper
function slider_slide_3() {
    if ($.exists('.swiper-container-3')) {
        var stretch =  - window.innerWidth / 40;
        stretch = window.innerWidth < 501 ? - 50 : stretch;
        var swiper = new Swiper('.swiper-container-3', {
            initialSlide: 2,
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflowEffect: {
                stretch,
                rotate: 55,
                depth: 70,
                modifier: 3,
                slideShadows: true,
            },
            pagination: {
                el: '.swiper-pagination-3',
                clickable: true,
            },
        });
    }
}

// count digits
var $counters = $('.js-counter');
$window = $(window);

function beginDigits() {
    if (homeSlider.activeIndex === 5) {
        $counters.each(function () {
            var $counter = $(this);
            if (isInViewport($counter[0])) {
                if (!$counter.hasClass('is-counting')) {
                    drawCounter($counter);
                }
            }
        });
    }
}

// add to use cssAfter, cssBefore
(function (a) {
    'use string';
    a.pseudoElements = {length: 0};
    var b = function (c) {
        if ('object' == typeof c.argument || c.argument !== void 0 && c.property !== void 0) {
            for (var d of c.elements.get()) {
                d.pseudoElements || (d.pseudoElements = {
                    styleSheet: null,
                    before: {index: null, properties: null},
                    after: {index: null, properties: null},
                    id: null
                });
                var e = function () {
                    if (null !== d.pseudoElements.id) return +d.getAttribute('data-pe--id') !== d.pseudoElements.id && d.setAttribute('data-pe--id', d.pseudoElements.id), '[data-pe--id="' + d.pseudoElements.id + '"]::' + c.pseudoElement;
                    var k = a.pseudoElements.length;
                    return a.pseudoElements.length++, d.pseudoElements.id = k, d.setAttribute('data-pe--id', k), '[data-pe--id="' + k + '"]::' + c.pseudoElement
                }();
                if (!d.pseudoElements.styleSheet) if (document.styleSheets[0]) d.pseudoElements.styleSheet = document.styleSheets[0]; else {
                    var f = document.createElement('style');
                    document.head.appendChild(f), d.pseudoElements.styleSheet = f.sheet
                }
                if (d.pseudoElements[c.pseudoElement].properties && d.pseudoElements[c.pseudoElement].index && d.pseudoElements.styleSheet.deleteRule(d.pseudoElements[c.pseudoElement].index), 'object' == typeof c.argument) {
                    if (c.argument = a.extend({}, c.argument), !d.pseudoElements[c.pseudoElement].properties && !d.pseudoElements[c.pseudoElement].index) {
                        var g = d.pseudoElements.styleSheet.rules.length || d.pseudoElements.styleSheet.cssRules.length || d.pseudoElements.styleSheet.length;
                        d.pseudoElements[c.pseudoElement].index = g, d.pseudoElements[c.pseudoElement].properties = c.argument
                    }
                    var h = '';
                    for (var i in c.argument) d.pseudoElements[c.pseudoElement].properties[i] = 'function' == typeof c.argument[i] ? c.argument[i]() : c.argument[i];
                    for (var i in d.pseudoElements[c.pseudoElement].properties) h += i + ': ' + d.pseudoElements[c.pseudoElement].properties[i] + ' !important; ';
                    d.pseudoElements.styleSheet.addRule(e, h, d.pseudoElements[c.pseudoElement].index)
                } else if (void 0 !== c.argument && void 0 !== c.property) {
                    if (!d.pseudoElements[c.pseudoElement].properties && !d.pseudoElements[c.pseudoElement].index) {
                        var g = d.pseudoElements.styleSheet.rules.length || d.pseudoElements.styleSheet.cssRules.length || d.pseudoElements.styleSheet.length;
                        d.pseudoElements[c.pseudoElement].index = g, d.pseudoElements[c.pseudoElement].properties = {}
                    }
                    d.pseudoElements[c.pseudoElement].properties[c.argument] = 'function' == typeof c.property ? c.property() : c.property;
                    var h = '';
                    for (var i in d.pseudoElements[c.pseudoElement].properties) h += i + ': ' + d.pseudoElements[c.pseudoElement].properties[i] + ' !important; ';
                    d.pseudoElements.styleSheet.addRule(e, h, d.pseudoElements[c.pseudoElement].index)
                }
            }
            return a(c.elements)
        }
        if (void 0 !== c.argument && void 0 === c.property) {
            var d = a(c.elements).get(0),
                j = window.getComputedStyle(d, '::' + c.pseudoElement).getPropertyValue(c.argument);
            return d.pseudoElements ? a(c.elements).get(0).pseudoElements[c.pseudoElement].properties[c.argument] || j : j || null
        }
        return console.error('Invalid values!'), !1
    };
    a.fn.cssBefore = function (c, d) {
        return b({elements: this, pseudoElement: 'before', argument: c, property: d})
    }, a.fn.cssAfter = function (c, d) {
        return b({elements: this, pseudoElement: 'after', argument: c, property: d})
    }
})(jQuery);

function setNavColor(colorWhite, colorDark) {
    function setActivColor(color) {
        // nav slider
        $('.swiper-button-white').css('color', color);
        $('.swiper-button-prev').cssAfter('background-color', color);
        $('.swiper-button-next').cssAfter('background-color', color);
        $('.expanded-timeline__counter').css('color', color);
        $('.swiper-pagination').css('background-color', color);
        $('.scroll-message').css('color', color);
        $('.scroll-svg').css('fill', color);

        // menu
        $('.hamburger-label').css('color', color);
        $('.hamburger-inner').css('background-color', color);
        $('.hamburger-inner').cssAfter('background-color', color);
        $('.hamburger-inner').cssBefore('background-color', color);

        // social
        $('.social-item').css('color', color);
    }

    var hexDigits = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f");

    function rgb2hex(rgb) {
        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }

    function hex(x) {
        return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
    }

    var activColor = rgb2hex($('.swiper-button-white').css('color'));
    if (homeSlider.activeIndex === 2 ||
        homeSlider.activeIndex === 3 ||
        homeSlider.activeIndex === 4 ||
        homeSlider.activeIndex === 6 ||
        homeSlider.activeIndex === 8 ||
        homeSlider.activeIndex === 10) {
        setActivColor(colorDark)
    } else if (activColor !== colorWhite) {
        setActivColor(colorWhite)
    }
}

function isInViewport(elem) {
    var docViewTop = $window.scrollTop();
    var docViewBottom = docViewTop + $window.height();
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function drawCounter(counter) {
    var $counter = counter;
    var $counter_value = $('.js-counter-value', $counter);
    var end = $counter.data('counter-end');
    var interval = $counter.data('counter-interval');
    var count = 1;

    var update = setInterval(function () {
        $counter_value.text(count);
        $counter.addClass('is-counting');
        if (count === end) {
            clearInterval(update);
            $counter.removeClass('is-counting');
        }
        count++;
    }, interval);
}

function setLine() {
    if ($.exists('.horizontal-line', '.telephone', '.arc-line')) {
        var iconHeight = $('.icon').height();
        var line = $('.horizontal-line');
        var arc = $('.arc-line');
        var width = ($(window).width() * 0.5 - $('.telephone').width()) / 2;
        var arcWidth = arc.width();
        line.width(width - arcWidth);
        line.css("left", -width + arcWidth);
        line.css("top", iconHeight / 2);
        arc.css("left", -width + 1);
        arc.css("top", iconHeight / 4);

        var lineRight = $('.horizontal-line-right');
        var arcRight = $('.arc-line-right');
        lineRight.width(width - arcWidth);
        lineRight.css("right", -width + arcWidth);
        lineRight.css("top", iconHeight / 2);
        arcRight.css("right", -width + 1);
        arcRight.css("top", iconHeight / 4);
    }
}

$('.wrap-head').click(function (event) {
    console.log('wrap-head click');

    $(this).parents("div").find("div.active").removeClass("active");
    $(this).parent().addClass("active");
    var urlImg = 'url(./assets/images/features_' + this.id + '.png)';
    $(".telephone").css('background-image', urlImg);
});

function setActiv() {
    if (window.innerWidth > 500) {
        $('#lightbulb').addClass("active")
    }
}

function disableSocialLastSlide() {
    if (homeSlider.realIndex + 1 === homeSlider.slides.length - 2){
        $('.social').hide();
    } else {
        $('.social').show();
    }
}
