$(document).ready(function () {
  // Uso de método load()
  $("#cargar").click(function () {
    restablecerOpacidad();
    $("#contenedor").load("http://andreihelo.github.io/").animate({opacity: "0.2"}, "slow");
  });

  // Uso de método ajax()
  $("#ajax").click(function () {
    $.ajax({
      url: "https://andreihelo-restful-api.herokuapp.com/students",
      success: function (result, status, xhr) {
        restablecerOpacidad();
        /*
         * Sabemos que la respuesta se trata de contenido en formato JSON y que
         * consiste en un arreglo de objetos.
         * El resultado ha sido convertido automáticamente a objeto JavaScript
         * por lo que para desplegarlo solo como texto debemos convertirlo primero.
         */
        $("#contenedor").text(JSON.stringify(result));

        /*
         * Para comprobar que se trata de un objeto JavaScript basta con utilizar
         * el primer elemento del arreglo, el cual corresponde a un objeto y a
         * partir de ahí utilizar sus propiedades.
         */
        console.log(
          "Matrícula: " + result[0].registration_number + "\n" +
          "Nombre: " + result[0].name + "\n" +
          "Apellido: " + result[0].last_name
        );
      }
    });
  });

  // Uso de método ajax() con método HTTP POST
  $("#guardar").click(function () {
    /*
     * Para dar de alta un nuevo estudiante, la documentación del API nos indica
     * que debemos enviar sus datos mediante el método POST.
     * Creamos el objeto JavaScript con sus propiedades correspondientes.
     */
    var estudiante = {
      "registration_number" : 123456,
      "name"                : "Juanito",
      "last_name"           : "Escarcha",
      "status"              : "Creado desde AJAX"
    };

    $.ajax({
      url: "https://andreihelo-restful-api.herokuapp.com/students",
      /*
       * Indicamos el método a utilizar, ya que de manera predeterminada implementa
       * el método GET.
       */
      method: "POST",
      /*
       * Aquí procedemos a enviar los datos del estudiante tal cual.
       */
      data: estudiante,
      success: function (result, status, xhr) {
        /*
         * Sabemos que la respuesta se trata de contenido en formato JSON.
         * El resultado ha sido convertido automáticamente a objeto JavaScript
         * por lo que para desplegarlo solo como texto debemos convertirlo primero.
         */
        $("#contenedor").text(JSON.stringify(result));
      }
    });
  });

  // Reestablece la opacidad del contenedor.
  function restablecerOpacidad() {
    $("#contenedor").css("opacity", 1);
  }
});
