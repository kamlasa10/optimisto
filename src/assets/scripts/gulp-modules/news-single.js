@@include('./libs.js');

(function ($) {
    if(document.documentElement.clientWidth <= 770 && document.documentElement.clientWidth > 480) {
        $('.slider__item').each(function(i) {
            if(i === $('.slider__item').length - 1) {
                $(this).hide()
            }
        })
    }

    if(document.documentElement.clientWidth <= 480) {
        $('.news-equal__list').slick({
            variableWidth: true,
            infinite: true,
            arrows: false,
            dots: false
        })
    }

})(jQuery);