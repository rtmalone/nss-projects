(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    getGadgets();
    getUsers();
    $('#createUser').click(createUser);
    $('#createGadget').click(createGadget);
  }

//---- Create Functions

  function createUser(event){
    var data = $('#userForm').serialize();
    var url = window.location.origin.replace(/[0-9]{4}/, '4000') + '/users';
    var type = 'POST';
    var success = newUser;

    $.ajax({data:data, url:url, type:type, success:success});

    event.preventDefault();
  }

  function newUser(user){
    $('#userForm input').val('');
    displayUser(user);
  }

  function createGadget(event){
    var data = $('#gadgetForm').serialize();
    var url = window.location.origin.replace(/[0-9]{4}/, '4000') + '/gadgets';
    var type = 'POST';
    var success = newGadget;

    $.ajax({data:data, url:url, type:type, success:success});

    event.preventDefault();
  }

  function newGadget(gadget){
    $('#gadgetForm input').val('');
    displayGadget(gadget);
  }

//---- Display Functions

  function getGadgets(){
    var url = window.location.origin.replace(/[0-9]{4}/, '4000') + '/gadgets';
    $.getJSON(url, displayGadgets);
  }

  function displayGadgets(data){
    for(var i=0; i<data.gadgets.length; i++){
      displayGadget(data.gadgets[i]);
    }
  }

  function displayGadget(gadget){
    var $tr = $('<tr>');
    var $tdbuy = $('<td>');
    var $buybtn = $('<button>Buy</button>');
    var $tdgadget = $('<td>');
    var $tdprice = $('<td>');
    var $tdstock = $('<td>');
    var $tduser = $('<td>');
    var $userdrpdwn = $('<select>');
    var $tdqty = $('<td>');
    var $qtydrpdwn = $('<select>');
    var $tdsubmit = $('<td>');
    var $orderbtn = $('<button>Order</button>');

    $tdbuy.append($buybtn.addClass('tiny radius'));
    $tdgadget.text(gadget.name).attr('data-name', gadget.name);
    $tdprice.text(gadget.price).attr('data-price', gadget.price);
    $tdstock.text(gadget.stock).attr('data-qty', gadget.stock);
    $tduser.append($userdrpdwn.addClass('userlist').css('visibility', 'hidden'));
    $tdqty.append($qtydrpdwn.addClass(gadget._id).css('visibility', 'hidden'));
    $tdsubmit.append($orderbtn.addClass('tiny radius alert').css('visibility', 'hidden'));
    //$tdpurchases.text(data.movies[i].runtime).attr('data-rating', data.movies[i].runtime);

    $tr.append($tdbuy, $tdgadget, $tdprice, $tdstock, $tduser, $tdqty, $tdsubmit);
    $('#gadgetTable > tbody').prepend($tr);
    popQtyList(gadget);
  }

  function getUsers(){
    var url = window.location.origin.replace(/[0-9]{4}/, '4000') + '/users';
    $.getJSON(url, displayUsers);
  }

  function displayUsers(data){
    for(var i=0; i<data.users.length; i++){
      displayUser(data.users[i]);
    }
  }

  function displayUser(user){
    var $tr = $('<tr>');
    var $tduser = $('<td>');
    var $tdbalance = $('<td>');
    var $tdpurchases = $('<td>');

    $tduser.text(user.name).attr('data-name', user.name);
    $tdbalance.text(user.balance).attr('data-balance', user.balance);
    //$tdpurchases.text(data.movies[i].runtime).attr('data-rating', data.movies[i].runtime);

    $tr.append($tduser, $tdbalance, $tdpurchases);
    $('#userTable > tbody').prepend($tr);
    popUserList(user.name);
  }

//---- Populate Drop Downs

  function popUserList(name){
    var $option = $('<option>');
    $option.text(name);
    $('.userlist').append($option);
  }

  function popQtyList(gadget){
    var num = gadget.stock + 1;
    var qtyArray = _.range(1, num);
    for(var i=0; i<qtyArray.length; i++){
      var $option = $('<option>');
      $option.text(qtyArray[i]);
      $('.'+gadget._id).append($option);
    }
  }

})();

