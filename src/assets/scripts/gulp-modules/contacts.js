@@include('./libs.js');

(function ($) {
    if(document.documentElement.clientWidth <= 1025) {
        $('.contacts').append($('.footer'))
    }

})(jQuery);