$(document).ready(function(){
    $(".owl-carousel-1").owlCarousel({
        lazyLoad: true,
        dots: false,
        loop: true,
        nav: true,

        responsive : {
            // breakpoint from 0 up
            0 : {
                items : 1,
            },
            // breakpoint from 480 up
            480 : {
                items : 2,
                
            },
            // breakpoint from 768 up
            768 : {
                items: 1,
                stagePadding: 80
            },
            992 : {
                items: 2,
                stagePadding: 0
            },
            1200 : {
                items: 3,
            }
        }
    });

    $(".owl-carousel-2").owlCarousel({
        lazyLoad: true,
        loop: true,
        dots: false,
        nav: false,

        responsive : {
            // breakpoint from 0 up
            0 : {
                items : 1,
            },
            // breakpoint from 480 up
            680 : {
                items : 2,
                
            },
            // breakpoint from 768 up
            992 : {
                items: 3,
            }
        }
    });

    $('.scroll-nav').on('click', function(event) {
        const to = $("#"+$(this).attr('data-target')).offset().top;
        $("html, body").animate({scrollTop: to}, 500);
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
    })

    axios.get('https://jsonplaceholder.typicode.com/todos/1')
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error);
    })

      
  });

 