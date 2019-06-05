$(document).ready(function () {
    $(".owl-carousel-1").owlCarousel({
        lazyLoad: true,
        dots: false,
        loop: true,
        nav: true,

        responsive: {
            // breakpoint from 0 up
            0: {
                items: 1,
            },
            // breakpoint from 480 up
            480: {
                items: 2,

            },
            // breakpoint from 768 up
            768: {
                items: 1,
                stagePadding: 80
            },
            992: {
                items: 2,
                stagePadding: 0
            },
            1200: {
                items: 3,
            }
        }
    });

    $(".owl-carousel-2").owlCarousel({
        lazyLoad: true,
        loop: true,
        dots: false,
        nav: false,

        responsive: {
            // breakpoint from 0 up
            0: {
                items: 1,
            },
            // breakpoint from 480 up
            680: {
                items: 2,

            },
            // breakpoint from 768 up
            992: {
                items: 3,
            }
        }
    });

    $('.scroll-nav').on('click', function (event) {
        const to = $("#" + $(this).attr('data-target')).offset().top;
        $("html, body").animate({ scrollTop: to }, 500);
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
    })



    $('#form-sign-up').on('submit', function (e) {
        e.preventDefault();
        let html = '';
        let spinner = $('.lds-spinner');
        let ul = $('#modal-form ul');
        let form = $(this);
        spinner.css('display', 'block');
        ul.html('');
        $('#modal-form').modal('show');



        axios.post('http://localhost:3000/api/clients', getFormData($(this)))
            .then(function () {
                html = `<li class="text-center text-success list-group-item">Your account has been successfully created. 
                An email has been sent to you to activate it</li>`;
                form.trigger('reset');
                
            }).catch(function (error) {
                let errors = error.response.data.errors;
                Object.keys(errors).forEach(key => {
                    let value = errors[key];
                    html += `<li class=" text-danger list-group-item">${value.message}</li>`
                })
            }).finally(() => {
                ul.html(html);
                spinner.css('display', 'none');
            });
    })

    setVilles();

});

function getFormData($form) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function (n, i) {
        indexed_array[n['name']] = n['value'];
    });

    indexed_array.store = {
        name: indexed_array.storeName,
        shortName: indexed_array.shortStoreName
    }
    indexed_array.storeName = undefined;
    indexed_array.shortStoreName = undefined;
    return indexed_array;
}

async function setVilles() {
    try {
        let villes = await axios.get('http://localhost:3000/api/villes/client', { mode: 'no-cors' })
        let html = '';
        for (let item of villes.data) {
            html += `<option value='${item._id}'>${item.name}</option>`;
        }

        let villeR = `<option selected disabled class="text-secondary">Ville Ramassage</option>`;
        let villeI = `<option selected disabled class="text-secondary">Ville Inscription</option>`;
        $('#villeRamassage').html(villeR + html);
        $('#villeInscription').html(villeI + html);
    } catch (error) {
        console.log(error)
    }

}
