$(document).ready(function() {

  // scroll

  var offsetQuienSoy = $('#quien-soy').offset();
  var offSetEstudios = $('#estudios').offset();
  var offSetExperiencia = $('#experiencia').offset();
  var offSetSobreMi = $('#sobre-mi').offset();

  function deleteActiveClass(){
    $('.navbar-link').attr('class', 'navbar-link');
  }

  $(window).scroll(function() {
    if (window.pageYOffset <= offsetQuienSoy.top-50) {
        deleteActiveClass();
        $("a[href$='#']").attr('class', 'navbar-link active');
      }
    if (window.pageYOffset >= offsetQuienSoy.top-50 ) {
        deleteActiveClass();
        $("a[href$='quien-soy']").attr('class', 'navbar-link active');
      }
    if (window.pageYOffset >= offSetEstudios.top-50) {
        deleteActiveClass();
        $("a[href$='estudios']").attr('class', 'navbar-link active');
      }
    if (window.pageYOffset >= offSetExperiencia.top-50) {
        deleteActiveClass();
        $("a[href$='experiencia']").attr('class', 'navbar-link active');
      }
    if (window.pageYOffset >= offSetSobreMi.top-50) {
        deleteActiveClass();
        $("a[href$='sobre-mi']").attr('class', 'navbar-link active');
    }
  });

//BUTTON SCROLL DOWN-UP

  $("#btn-scroll-down").click(function(event){
    $("html, body").animate({ scrollTop: $(document).height()-$(window).height() }, 2500)});
  $("#btn-scroll-up").click(function(event){
    $("html, body").animate({ scrollTop: 0 }, 2500)});


//OPACITY NAVBAR

 window.addEventListener('scroll', changeOpacityMenu);

  function changeOpacityMenu() {
      if (window.pageYOffset >= 242) {
          document.getElementById('navbar-id').style.opacity = '1';
      } else {
          document.getElementById('navbar-id').style.opacity = '0.5';
      }
  }

//CHANGE SELECTION NAVBAR

  var navbarLink = $('.navbar-link');
  for (var i = 0; i < navbarLink.length; i++) {
      navbarLink[i].addEventListener('click', function(event) {
            deleteActiveClass();
            var ayuda =  window.pageYOffset + 10;
            $(this).attr('class', 'navbar-link active');
          })
      };
});
