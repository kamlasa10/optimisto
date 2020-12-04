@@include('./libs.js');

(function ($) {

    $('[data-camera]').each(function() {
        $(this).on('click', function() {
            $('[data-camera]').removeClass('btn--purple').addClass('btn--green')
            $(this).addClass('btn--purple')
        })
    })

    //adaptive

    if(document.documentElement.clientWidth <= 770) {
       $('.camera__wrap').append( $('.breadcrumbs .link-with-triangle'))
    }
})(jQuery);