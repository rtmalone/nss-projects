(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    //gameTimer();
  }
/*
  var timer;
  var start = 30;

  function gameTimer(){
    clearInterval();
    alert('time is a running!');
    timer = setInterval(timerCount, 1000);
  }

  function timerCount(){
    if(start !== 0){
      start--;
      $('#timer').text(start);
    } else {
      clearInterval(timer);
      alert('loser');
    }
  }

  function match(){
    var guess1 = $(this).data('id');
    debugger;
  }
*/


})();

