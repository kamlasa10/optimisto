(function($) {

    function createCircle() {
        $('.circle-animated').remove()
        const circle = $(`<div class="circle-animated"></div>`)
        if(document.documentElement.clientWidth > 1100) {
            circle.css({width: document.documentElement.clientWidth * 1.2, height: document.documentElement.clientWidth * 1.5})
        } else if(document.documentElement.clientWidth <= 1030 && document.documentElement.clientWidth >= 810) {
            circle.css({width: document.documentElement.clientWidth * 1.4, height: document.documentElement.clientWidth * 1.7})
        } else if(document.documentElement.clientWidth <= 800 && document.documentElement.clientWidth > 480) {
            circle.css({width: document.documentElement.clientWidth * 1.2, height: document.documentElement.clientWidth * 2})
        }
        $('body').append(circle)
    
        return circle
      }

      $('.features__item').each(function() {
        $(this).find('.features__right').addClass('features__right--animate')
        $(this).find('.features__content').addClass('features__content--animate')
      })
    

    $('.features__wrap').on('init afterChange', (_,slick,currentSlide = 0) => {
        if(document.documentElement.clientWidth <= 775) {
        } else {
          $(slick.$slides).each(function () {
            $(this).find('.features__right').removeClass('features__right--animate')
            $(this).find('.features__content').removeClass('features__content--animate')
          })
        }

        const current = $(slick.$slides[currentSlide])

        if(document.documentElement.clientWidth > 800) {
          current.find('.features__right').addClass('features__right--animate')
          current.find('.features__content').addClass('features__content--animate')
        }
    
        slick.$slides.each(function(i) {
          const dots = $(this).find('.slick-dots li')
          dots.eq(currentSlide).addClass('slick-active')
        })
      })

      $('.features__wrap').slick({
        arrows: false,
        dots: true,
        appendDots: $('.features-controls__dots'),
        slidesToShow: 1,
        fade: true,
        infinite: false,
        waitForAnimate: false,
        responsive: [
          {
            breakpoint: 770,
            settings: {
              slidesToShow: 1,
              fade: false
            }
          },
        ]
      })

      $('.features-controls__left').click(() => {
        if(document.documentElement.clientWidth > 800) {
          const circle = createCircle()
          setTimeout(() => {
            circle.css({zIndex: 20})
            circle.addClass('circle-animated--start')
            setTimeout(() => {
              $('.features__wrap').slick('slickPrev')
              setTimeout(() => circle.remove(), 500)
            }, 300)
          }, 50)
        }else {
          $('.features__wrap').slick('slickPrev')
        }
      })

      $('.features-controls__right').click(() => {
        if(document.documentElement.clientWidth > 800) {
          const circle = createCircle()
          setTimeout(() => {
            circle.css({zIndex: 20})
            circle.addClass('circle-animated--start')
            setTimeout(() => {
              $('.features__wrap').slick('slickNext')
              setTimeout(() => circle.remove(), 500)
            }, 300)
          }, 50)
        }else {
          $('.features__wrap').slick('slickNext')
        }
      })

      $('.features-controls__dots .slick-dots').each(function (i) {
        $(this).children().each(function (i) {
          $(this).find('button').on('click', () => {
            const circle = createCircle()
        setTimeout(() => {
          circle.css({zIndex: 5})
          circle.addClass('circle-animated--start')
          setTimeout(() => {
            circle.remove()
            $('#slider-2').slick('slickGoTo', i)
          }, 500)
        }, 150)
          })
        })
      })


    // adaptive 

    if(document.documentElement.clientWidth <= 770) {
      $('.features').append($('.more__leaflet'))
    }

    if(document.documentElement.clientWidth <= 480) {
        $('.promo__left').before($('.promo__title'))
        $('.promo').append($('.promo__right-decor'))
    }
})(jQuery)