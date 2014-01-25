(function (){

  'use strict';

  $(document).ready(init);

  function init(){
    $('#play').click(randomNums);
  }

  function randomNums(){
    var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXTZ';
    var stringLen = 10;
    var randomStr = '';
    for (var i=0; i<stringLen; i++) {
      var rnum = Math.floor(Math.random() * alphabet.length);
      randomStr += alphabet.substring(rnum,rnum+1);
    }
    debugger;

    uniqueStr();

    console.log(randomStr);
    function uniqueStr(randomStr){
      var unique = '';
      for(var i=0; i<10; i++){
        if(unique.indexOf(randomStr[i]) === -1){
          unique += randomStr[i];
        }
        console.log(unique);
      }
    }
  }


})();
