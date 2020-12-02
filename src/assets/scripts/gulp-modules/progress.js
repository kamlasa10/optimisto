@@include('./libs.js');

(function ($) {

    $('.date__item').each(function () {
        $(this).on('click', (e) => {
            const current = $(e.currentTarget)
            const newText = $(e.target).text()

            current.find('.date__current').text(newText)
        })
    })

    $('.gallery__preview-content-show').hide()

    $('.gallery__preview-content-show').click(() => {
        $('.gallery__preview-content').addClass('gallery__preview-content--show')
    })

    $('.js-gallery__preview-content-btn-close').click(() => {
        $('.gallery__preview-content').removeClass('gallery__preview-content--show')
    })

    const data = {
        imgs: [
            {src: './assets/images/progress-img.jpg'},
            {src: './assets/images/progress-img.jpg'},
            {src: './assets/images/progress-img.jpg'},
            {src: './assets/images/progress-img.jpg'}
        ]
    }
    $('.header').addClass('header--dark')
    const img = $('.header .logo img')
    img.attr('src', './assets/images/logo-dark.svg')

    $('.slider__wrap').slick({
        slidesToShow: 4.4,
        slidesToScroll: 1,
        infinite: false,
        arrows: false,
        responsive: [
            {
              breakpoint: 1370,
              settings: {
                slidesToShow: 3.4,
              }
            },
          ]
    })

    $('.slider-control-left').click(() => {
        $('.slider__wrap').slick('slickPrev')
    })

    $('.slider-control-right').click(() => {
        $('.slider__wrap').slick('slickNext')
    })
})(jQuery);