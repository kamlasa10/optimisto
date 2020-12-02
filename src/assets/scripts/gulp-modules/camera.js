@@include('./libs.js');

(function ($) {
    $('.header').addClass('header--dark')
    const img = $('.header .logo img')
    img.attr('src', './assets/images/logo-dark.svg')

    $('[data-camera]').each(function() {
        $(this).on('click', function() {
            $('[data-camera]').removeClass('btn--purple').addClass('btn--green')
            $(this).addClass('btn--purple')
        })
    })
})(jQuery);