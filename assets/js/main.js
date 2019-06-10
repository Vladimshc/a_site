(function(window) {

    'use strict';

    $.exists = function(selector) {
        return ($(selector).length > 0);
    };

    window.onpageshow = function(event) {
      if (event.persisted) {
          PageTransition(); 
      }
    };

    // All Funtions
    PageTransition();
    Menu();
    ms_home_slider();
    // Sort();
    // UniteGallery();
    // ValidForm();
    slider_slide_3();
    slider_slide_5();
    slider_slide_6_tel();
    slider_slide_9_tel();
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
        duration: 1000,
        easing: 'easeInOutCubic',
        complete: function(preload) {
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
        complete: function(preload) {
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
    $(document).on('click', '[data-type="page-transition"]', function(e) {
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
                complete: function(preload) {
                    window.location.href = url;
                }
            });
        }
    });
}

/*------------------
    Menu
-------------------*/
function Menu() {
    if ($.exists('.hamburger')) {
        $('.hamburger').on('click', function(e) {
            var burger = $(this);
            $(burger).toggleClass('is-active');
            $('.ms-nav').toggleClass('is-visible');
            $('.ms-header').not('.navbar-white').each(function() {
                $('.logo-light').toggleClass('active');
            });
        });
        $('.height-full-viewport').on({'mousewheel': function(e) {
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
                    loop: true,
                    speed: 0,
                    grabCursor: false,
                    mousewheel: true,
                    keyboard: true,
                    simulateTouch: false,
                    parallax: true,
                    effect: 'slide',
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
                $('.expanded-timeline__counter span:last-child').text(homeSlider.slides.length - 1);
                homeSlider.on('slideChange', function () {
                    $('.expanded-timeline__counter span:first-child').text(homeSlider.activeIndex);
                });
            } else {
                homeSlider = new Swiper('.swiper-container', {
                    loop: true,
                    speed: 1000,
                    grabCursor: false,
                    mousewheel: true,
                    keyboard: true,
                    simulateTouch: false,
                    parallax: true,
                    effect: 'slide',
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
                });
            }
        }
    }

/*------------------
 Sort
-------------------*/
function Sort() {
    if ($.exists('.filtr-container')) {
        $('.filtr-container').filterizr();
        $('.filtr-btn li').on('click', function() {
            $('.filtr-btn li').removeClass('active');
            $(this).addClass('active');
        });
    }
}
/*------------------
 Unite-Gallery
-------------------*/
function UniteGallery() {
    if ($.exists('#gallery')) {
        $('#gallery').unitegallery({
            gallery_theme: 'tiles',
            tiles_type: "justified",
            tiles_col_width: 400,
            tiles_justified_row_height: 400,
            tiles_justified_space_between: 30,
            // tile_overlay_color: "#000",
            tile_overlay_opacity: 0.7,
            tile_enable_icons: false,
            tile_textpanel_position: "inside_bottom",
        });
    }
}
/*------------------
 Form Validation
-------------------*/
function ValidForm() {
    if ($.exists('#validForm')) {
        $('.form-control').focus(function() {
            $(this).prev('.control-label').addClass('active');
        });
        $('.form-control').focusout(function() {
            $(this).prev('.control-label').removeClass('active');
        });
        $("#validForm").validate({
            ignore: ":hidden",
            rules: {
                name: {
                    required: true,
                    minlength: 2,
                    maxlength: 16,
                },
                email: {
                    required: true,
                    email: true,
                },
                subject: {
                    required: true,
                    minlength: 4,
                    maxlength: 32,
                },
                message: {
                    required: true,
                    minlength: 16,
                },
            },
            messages: {
                name: {
                    required: "<span>Please enter your name</span>",
                    minlength: "<span>Your name must consist of at least 2 characters</span>",
                    maxlength: "<span>The maximum number of characters - 24</span>",
                },
                email: {
                    required: "<span>Please enter your email</span>",
                    email: "<span>Please enter a valid email address.</span>",
                },
                subject: {
                    required: "<span>Please enter your subject</span>",
                    minlength: "<span>Your name must consist of at least 2 characters</span>",
                    maxlength: "<span>The maximum number of characters - 16</span>",
                },
                message: {
                    required: "<span>Please write me message</span>",
                    minlength: "<span>Your message must consist of at least 16 characters</span>",
                    maxlength: "<span>The maximum number of characters - 100 </span>",
                },
            },
            submitHandler: function(form) {
                $.ajax({
                    type: "POST",
                    url: "contact.php",
                    data: $(form).serialize(),
                    beforeSend: function() {
                        // do something
                    },
                    success: function(data) {
                        if (data == "Email sent!");
                        $('input, textarea').val('');
                        $('.form-group').blur();
                        // do something
                    }
                });
                return false;
            }
        });
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
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-rotate');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
};

new WOW().init();

// header screenshots slider
jQuery('.header-slider-tel').owlCarousel({
    animateOut: 'fadeOut',
    mouseDrag: false,
    loop: true,
    navText: [''],
    items: 1,
    autoplay: true,
    smartSpeed: 450
});

//preloader
$(window).on('load', function () {
    var $preloader = $('.preloader');
    $preloader.delay(500).fadeOut('slow');
});

// swiper
function slider_slide_3() {
    if ($.exists('.swiper-container-3')) {
        var swiper = new Swiper('.swiper-container-3', {
            initialSlide: 2,
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflowEffect: {
                rotate: 55,
                stretch: -50,
                depth: 70,
                modifier: 3,
                slideShadows : true,
            },
            pagination: {
                el: '.swiper-pagination-3',
                clickable: true,
            },
        });
    }
}

function slider_slide_5() {
    if ($.exists('.swiper-container-5')) {
        var swiper = new Swiper('.swiper-container-5', {
            initialSlide: 1,
            pagination: {
                el: '.swiper-pagination-5',
                clickable: true,
            },
        });
    }
}

function slider_slide_6_tel() {
    if ($.exists('.swiper-container-6-tel')) {
        var swiper = new Swiper('.swiper-container-6-tel', {
            initialSlide: 0,
            pagination: {
                el: '.swiper-pagination-6-tel',
                clickable: true,
            },
        });
    }
}

function slider_slide_9_tel() {
    if ($.exists('.swiper-container-9-tel')) {
        var swiper = new Swiper('.swiper-container-9-tel', {
            initialSlide: 0,
            pagination: {
                el: '.swiper-pagination-9-tel',
                clickable: true,
            },
        });
    }
}

// count digits
var $counters = $('.js-counter');
$window = $(window);

$window.bind('mousewheel DOMMouseScroll', function(event){
    if (homeSlider.activeIndex === 7 ) {
        $counters.each(function () {
            var $counter = $(this);
            if (isInViewport($counter[0])) {
                if (!$counter.hasClass('is-counting')) {
                    drawCounter($counter);
                }
            }
        });
    }
});

$('.swiper-button-white').click(function() {
    if (homeSlider.activeIndex === 7 ) {
        $counters.each(function () {
            var $counter = $(this);
            if (isInViewport($counter[0])) {
                if (!$counter.hasClass('is-counting')) {
                    drawCounter($counter);
                }
            }
        });
    }
});


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

function setLine () {
    if ($.exists('.horizontal-line', '.telephone', '.arc-line')) {
        var iconHeight = $('.icon').height();
        var line = $('.horizontal-line');
        var arc = $('.arc-line');
        var width = ($( window ).width() * 0.5 - $('.telephone').width()) / 2;
        var arcWidth = arc.width();
        line.width( width - arcWidth );
        line.css("left", -width + arcWidth);
        line.css("top", iconHeight / 2);
        arc.css("left", -width + 1);
        arc.css("top", iconHeight / 4);

        var lineRight = $('.horizontal-line-right');
        var arcRight = $('.arc-line-right');
        lineRight.width( width - arcWidth );
        lineRight.css("right", - width + arcWidth);
        lineRight.css("top", iconHeight / 2);
        arcRight.css("right", -width + 1);
        arcRight.css("top", iconHeight / 4);
    }
}

$('.wrap-head').click(function(event) {
    $(this).parents("div").find("div.active").removeClass("active");
    $(this).parent().addClass("active");
    var urlImg = 'url(./assets/images/features_' + this.id + '.png)';
    $(".telephone").css('background-image', urlImg);
});

function setActiv() {
    if (window.innerWidth > 500 ) {
        $('#lightbulb').addClass("active")
    }
}