@@include('./libs.js');

(function ($) {
    $('.js-tour__intro-close').click(() => {
        $('.tour__intro').fadeOut(300)
    })

    $('.js-tour___details-btn').click(() => {
        $('.tour__details-content').addClass('tour__details-content--show')
    })

    $('.js-tour__details-close').click(() => {
        $('.tour__details-content').removeClass('tour__details-content--show')
    })

    // adaptive

    if(document.documentElement.clientWidth <= 480) {
        $('.footer').hide()
        $('.fixed-content').hide()
    }
})(jQuery);