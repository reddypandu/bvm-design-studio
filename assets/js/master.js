/*
*
* JS Script
*/

(function ($) {
    "use strict";

    $(function () { // document ready shorthand

        // Cache commonly used selectors
        var $window = $(window);
        var $sticky = $('.sticky-top');
        var $backToTop = $('.back-to-top');
        var $spinner = $('#spinner');
        var $portfolioFilters = $('#portfolio-flters');
        var $portfolioContainer = $('.portfolio-container');

        // Spinner
        var spinner = function () {
            setTimeout(function () {
                if ($spinner.length) {
                    $spinner.removeClass('show');
                }
            }, 1);
        };
        spinner();

        // Initiate WOW.js
        if (typeof WOW === 'function') {
            new WOW().init();
        }

        // Single scroll listener for sticky navbar + back-to-top
        $window.on('scroll', function () {
            var scrollTop = $window.scrollTop();

            if (scrollTop > 300) {
                $sticky.addClass('shadow-sm').css('top', '0px');
                $backToTop.stop(true, true).fadeIn('slow');
            } else {
                $sticky.removeClass('shadow-sm').css('top', '-100px');
                $backToTop.stop(true, true).fadeOut('slow');
            }
        });

        // Back to top click (use .on)
        $backToTop.on('click', function (e) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: 0 }, 500, 'easeInOutExpo');
            return false;
        });

        // Facts counter
        if ($.fn.counterUp) {
            $('[data-toggle="counter-up"]').counterUp({
                delay: 10,
                time: 2000
            });
        }

        // Header carousel
        if ($.fn.owlCarousel) {
            $(".header-carousel").owlCarousel({
                autoplay: true,
                smartSpeed: 1500,
                loop: true,
                nav: false,
                dots: true,
                items: 1,
                dotsData: true
            });

            // Testimonials carousel
            $(".testimonial-carousel").owlCarousel({
                autoplay: true,
                smartSpeed: 1000,
                center: true,
                dots: false,
                loop: true,
                nav: true,
                navText: [
                    '<i class="bi bi-arrow-left"></i>',
                    '<i class="bi bi-arrow-right"></i>'
                ],
                responsive: {
                    0: { items: 1 },
                    768: { items: 2 }
                }
            });
        }

        // Portfolio isotope and filter (use .on for clicks)
        if ($.fn.isotope && $portfolioContainer.length) {
            var portfolioIsotope = $portfolioContainer.isotope({
                itemSelector: '.portfolio-item',
                layoutMode: 'fitRows'
            });

            $portfolioFilters.on('click', 'li', function () {
                $portfolioFilters.find('li').removeClass('active');
                $(this).addClass('active');

                var filterValue = $(this).data('filter') || '*';
                portfolioIsotope.isotope({ filter: filterValue });
            });
        }

        // Contact form - already uses .on('submit')
        $('#contact-form').on('submit', function (e) {
            e.preventDefault();

            var $form = $(this);
            var $messages = $('.messages');

            $.ajax({
                type: "POST",
                url: "assets/php/contact-form.php",
                data: $form.serialize(),
                dataType: "json"
            }).done(function (response) {
                var alertClass = response.class || 'alert alert-info';
                var message = response.message || 'No response message';
                var alertBox = '<div class="' + alertClass + '">' + message + '</div>';

                $messages.html(alertBox);

                if (response.class === 'alert alert-success') {
                    $form[0].reset();
                }
            }).fail(function () {
                $messages.html('<div class="alert alert-danger">Something went wrong. Please try again later.</div>');
            });
        });

        // Newsletter form - bind with .on('submit') to preferred form ID
        // Make sure your newsletter form HTML uses id="newsletterForm" and successMessage is an element with id="successMessage"
        $('#newsletterForm').on('submit', function (e) {
            e.preventDefault();

            var $emailInput = $(this).find('#emailInput');
            var email = ($emailInput.val() || '').trim();
            var $messageBox = $('#successMessage');

            $messageBox.removeClass('d-none alert-danger alert-success');

            if (email !== '') {
                $messageBox.addClass('alert alert-success').text('✅ Signup successful!').removeClass('d-none');
            } else {
                $messageBox.addClass('alert alert-danger').text('⚠️ Please enter a valid email.').removeClass('d-none');
            }
        });

    }); // end document ready

})(jQuery);


