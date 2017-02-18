$(document).ready(function() {
 
  $("#fecha1").datepicker({
      changeMonth: true,
      changeYear: true
  });
  
  $( "#importe" ).keyup(function() {
    convertir();
  });
});

var app = angular.module('chequeApp',[]);

// filtro Moneda
app.filter('moneda', function($filter) {
    return function(input) {
        return number_format(input,2);
    }
});

function number_format(amount, decimals) {
    amount += ''; // por si pasan un numero en vez de un string
    amount = parseFloat(amount.replace(/[^0-9\.]/g, '')); // elimino cualquier cosa que no sea numero o punto
    decimals = decimals || 0; // por si la variable no fue fue pasada
    // si no es un numero o es igual a cero retorno el mismo cero
    if (isNaN(amount) || amount === 0) 
        return parseFloat(0).toFixed(decimals);
    // si es mayor o menor que cero retorno el valor formateado como numero
    amount = '' + amount.toFixed(decimals);
    var amount_parts = amount.split('.'),
        regexp = /(\d+)(\d{3})/;
    while (regexp.test(amount_parts[0]))
        amount_parts[0] = amount_parts[0].replace(regexp, '$1' + ',' + '$2');
    return amount_parts.join('.');
}

app.controller("chequeCtrl", function ($scope, $http) {
    $scope.i = '1500';
    $scope.cheque = [{
          importe: '3500',
          emisionDia: '15',
          emisionMes: 'Febrero',
          emisionAnio: '2017',
          pagoDia: '30',
          pagoMes:'Abril',
          pagoAnio:'2017',
          destino:'Juan de las Pelotas',
          importeLetras1: 'TRES MIL QUINIENTOS PESOS ----',
          importeLetras2:'--------'
          }]

      $scope.aLetras = function(letras){

        $(".importeLetras1").val(letras).trigger('input');
        $(".importeLetras2").val('--------').trigger('input');

      }

});

function convertir() {
  var importe = $('#importe').val() * 1;
  if (importe <= 0 ) return;
  var letras = nn(importe);
   angular.element('#chequeCtrl').scope().aLetras(letras);
}