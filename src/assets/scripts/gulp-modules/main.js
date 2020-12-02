@@include('./libs.js');

(function ($) {
  const mainScreanTimeline = gsap.timeline({delay: 0.1})

  mainScreanTimeline.from('.header', {
    duration: 0.7,
    translateY: '-130%'
  })

  if(!$(document.body).attr('id') === 'index-page') {
    document.addEventListener('DOMContentLoaded', () => {
      const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".js-scroll-container"),
        smooth: true,
        smoothMobile: false,
        inertia: 1.1
      });

      ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
    })
  }

  if($('.intro')[0]) {
    $('body').addClass('isHidden')
  }

  $('.js-intro__btn').click(() => {
    $('.circle').remove()
    $('#slider-2').remove()
    $('#slider-1').fadeOut(400, () => {
      gsap.from('.promo', {
        duration: 0.6,
        opacity: 0,
        translateY: '-60'
      })
    })
  })

  $('#slider-1').clone().removeAttr('id').attr('id', 'slider-2').appendTo('body');
  $('#slider-2').on('init afterChange', (_, slick, currentSlide = 0) => {
    const current = $(slick.$slides[currentSlide])
    current.find('.intro__wrap').hide()
  })

  $('#slider-1').on('init afterChange', (_,slick,currentSlide = 0) => {
    const current = $(slick.$slides[currentSlide])

    current.find('.intro__promo-status-current').text(`0${currentSlide + 1} / `)
    current.find('.intro__promo-status-total').text(`0${slick.$slides.length}`)
    current.find('.intro__wrap').show()

    slick.$slides.each(function(i) {
      const dots = $(this).find('.slick-dots li')
      dots.eq(currentSlide).addClass('slick-active')
    })
    $('body').removeClass('down')
  })

  $('#slider-1').slick({
    dots: true,
    arrows: false,
    asNavFor: '#slider-2',
    appendDots: $('.intro-controls__dots')
  })

  $('#slider-2').slick({
    fade: true,
    arrows: false,
    speed: 300,
    asNavFor:
      '#slider-1',
    dots: false
  });

  $('#slider-1 image').removeAttr('mask');

  $(window).on('resize', function () {
    $('#donutmask circle').attr({
      cx: $(window).width() / 2,
      cy: $(window).height() / 2
    });
    $('#donutmask #outer').attr({
      r: $(window).height() / 2.6
    });
    $('#donutmask #inner').attr({
      r: $(window).height() / 4.5
    });
  }).resize();

  $('.intro-controls__dots .slick-dots').each(function (i) {
    $(this).children().each(function (i) {
      $(this).find('button').on('click', () => {
        $('body').addClass('down')
        $('#slider-2').slick('slickGoTo', i)
      })
    })
  })

  $('.intro-controls__left').click(() => {
    $('body').addClass('down');
    $('#slider-2').slick('slickPrev')
  })

  $('.slider-controls__block').click(() => {
    $('body').addClass('down');
    $('#slider-2').slick('slickNext')
  })

})(jQuery);