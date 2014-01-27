(function (){

  'use strict';

  $(document).ready(init);

  function init(){
    $('#play').click(setBoard);
  }
  var alphabet = ['A','B','C','D','E','F','G','H','I',
    'J','K','L','M','N','O','P','Q','R','S','T','U',
    'V','W','X','Y','Z'];
  var cells = ['cell1','cell2','cell3','cell4','cell5',
    'cell6','cell7','cell8','cell9','cell10',
    'cell11','cell12','cell13','cell14','cell15',
    'cell16','cell17','cell18','cell19','cell20'];
  var slctLetters = [];

  function setBoard(){

    function randomLetters(){
      var rnum = Math.floor(Math.random() * alphabet.length);
      return rnum;
    }

    function randomNums(){
      var rnum = Math.floor(Math.random() * cells.length);
      return rnum;
    }

    function randomLttr(){
      var rnum = Math.floor(Math.random() * slctLetters.length);
      return rnum;
    }

    for (var i=10; i>0; i--){
      var number = randomLetters(alphabet.length - 1);
      var chosen = alphabet[number];
      slctLetters.push(chosen);
      alphabet.splice(number, 1);
    }

    console.log(slctLetters);

    var object = {};

    for (var i2=10; i2>0; i2--){
      var firstCell = randomNums(cells.length - 1);
      var idOne = cells[firstCell];
      var letter = randomLttr(slctLetters.length - 1);
      object[idOne] = slctLetters[letter];
      cells.splice(firstCell, 1);

      var secondCell = randomNums(cells.length - 1);
      var idTwo = cells[secondCell];
      object[idTwo] = slctLetters[letter];
      cells.splice(secondCell, 1);
      slctLetters.splice(letter, 1);
    }
    console.log(object);

    //for (var key in object) {
    //  var text = object[key];
   // }

   // for (var ic=1; ic<21; ic++){
   //   var text = object.text(ic);
   //   $('.cell').append(text);
   // }
  }
})();
