(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $('#countries').on('click', '.name', defineCountry);
    $('#flags').on('click', '.flag', defineFlag);
    $('#match').click(match);
    gameTimer();
  }

  var timer;
  var start = 30;
  var country;
  var flag;
  var matches = 0;

  function gameTimer(){
    clearInterval();
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

  function defineCountry(){
    $('.name').removeClass('selected');
    if($(this).hasClass('matched')){
      return;
    } else {
      country = $(this).text();
      console.log(country);
      $(this).addClass('selected');
    }
  }

  function defineFlag(){
    $('.flag').parent().removeClass('selected');
    var temp = $(this).attr('class').toString();
    if($(this).parent().hasClass('matched')){
      return;
    } else {
      flag = temp.slice(-2);
      console.log(flag);
      $(this).parent().addClass('selected');
    }
  }

  function match(){
    var url = '/match?country='+country+'&flag='+flag;
    console.log(url);
    var type = 'GET';
    var success = confirmMatch();

    $.ajax({url:url, type:type, success:success});
  }

  function confirmMatch(data){
    console.log(data);
    var country = data.country;
    var flag = data.flag;

    if( country === false && flag === false){
      return;
    } else {
      matches += 1;
      $('.selected').addClass('matched');
      $('.matched').removeClass('selected');
    }
  }

})();

