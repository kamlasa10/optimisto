@@include('./libs.js');

(function ($) {
    $('.gallery__wrap').on('init afterChange', (_, slick, currentSlide = 0) => {
        $('.gallery__controls-btn .gallery__current').text(`0${currentSlide + 1} /`)
        $('.gallery__controls-btn .gallery__total').text(` 0${slick.$slides.length}`)
    })

    const coord = document.documentElement.clientWidth / 2
    let isFirst = true
    let flag 

    document.addEventListener('mouseenter', (e) => {
        if(isFirst) {
            flag = e.pageX < coord ? true : false
            isFirst = false
        }
    })

    document.addEventListener('mousemove', (e) => {
        if(e.pageX < coord) {
            if(flag) {
                $('.gallery__controls-btn').removeClass('gallery__controls-btn--show')
                $('.gallery__controls-btn-left').addClass('gallery__controls-btn--show')
                flag = false
            }
        } else {
            if(!flag) {
                $('.gallery__controls-btn').removeClass('gallery__controls-btn--show')
                $('.gallery__controls-btn-right').addClass('gallery__controls-btn--show')
                flag = true
            }
        }
    })

    $('.gallery__wrap').slick({
        arrows: false,
    })

    $('.gallery__controls-btn-left').click(() => {
        $('.gallery__wrap').slick('slickPrev')
    })

    $('.gallery__controls-btn-right').click(() => {
        $('.gallery__wrap').slick('slickNext')
    })

})(jQuery);