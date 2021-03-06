$(document).ready(function () {

///////////////////////AJAX////////////////////////////

      var mensaje = $('#mensaje');
      var nombre = $('#name');
      var loader = $('.loader');
      var comentarios = [];
      var comentariosContainer = $('#commentsContainer');
      var url = 'http://localhost:8000/api/';
      var ok = 0;

      var drawComments = function () {
        comentariosContainer.empty();

        if (comentarios == 0 && ok == 1) {
          comentariosContainer.append("<li>* No tienes comentarios</li>");
        }else {
          var contentToAdd = '';
          for (var i = 0; i < comentarios.length; i++) {
            contentToAdd += '<div id="li-name">' + comentarios[i].name + '</div>' + '<li id="li-comment">' + comentarios[i].comentario + '<button class="delete" data-comment-id="' + comentarios[i].id + '">&times;</button></li>';
          }
          comentariosContainer.append(contentToAdd);
        }
      }
      drawComments();

    ///////////////////////GET////////////////////////////


      var getComentarios = function () {
        var success = function (data) {
          comentarios = data;
          drawComments();
        }

        var complete = function () {
          loader.hide();
           ok = 1;
           drawComments();
        }

        $.ajax({
          type: "GET",
          url: url + 'contact',
          success: success,
          complete: complete
        })
        .fail(function (error) {
    			console.error("Error al cargar comentarios.", error);
    		});
      }

///////////////////////POST////////////////////////////


      var createComment = function (comment,name) {
        var success = function (data) {
          console.log(data);
          mensaje.val('');
          nombre.val('');


          comentarios.push(data);
          drawComments();
        }
        var data = {
          'comentario': comment,
          'name': name
       };
       var complete = function () {
         alert('Mensaje enviado, gracias')
       }


        $.ajax({
          type: 'POST',
          url: url + 'contact',
          data: data,
          success: success,
          complete: complete

        })
        .fail(function (error) {
    			console.error("Error al enviar comentario.", error);
    		});
      }


///////////////////////DELETE////////////////////////////


      var deleteComment = function(id) {
        var success = function(data) {
          comentarios = $.grep(comentarios, function(item){ //GREP: BUSCA Y FILTRA
    				return item.id != id;
          })
          drawComments();
        }

    		$.ajax({
    			type: "DELETE",
    			url: url + "contact/" + id,
          success: success
    		})

        .fail(function(error) {
    			console.error("Error eliminando comentario", error);
    		})
    	}

///////////////////////EVENTS////////////////////////////


      $('#sendNewComment').on('click', function (event) {
        if (mensaje.val() != '  ') {
          event.preventDefault();
          createComment(mensaje.val(), nombre.val());
        }
      })

      $(document).on("click", ".delete", function(event){
        var id = $(this).data('commentId');
        deleteComment(id);
      });

    setTimeout(function() {
      getComentarios();
    }, 1500);
});
