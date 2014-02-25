(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    getPriorities();
    $('#savebtn').click(createPriority);
    $('#table').on('click', '.editable', editPriority);
    $('#table').on('click', '.updatebtn', updatePriority);
    $('#table').on('click', '.delete', deleteRow);
  }

  var $removed;

  function deleteRow(){
    $removed = $(this).parent();
    var id = $(this).parent().data().id;
    var url = window.location.origin.replace(/3000/, '4000') + '/priorities/' + id;
    var type = 'DELETE';
    var success = removeFromTable;

    $.ajax({url:url, type:type, success: success});

  }
  function removeFromTable(data){
    if(data.count === 1){
      $removed.remove();
    }else{
      alert('Delete Failed');
    }
  }

  function createPriority(event){
    var name = $('#priority').val();
    var value = $('#value').val();
    var obj = {name:name, value:value};

    var url = window.location.origin.replace(/3000/, '4000')+'/priorities';
    var type = 'POST';
    var data = obj;
    var success = displayTable;

    $.ajax({url:url, type:type, data:data, success:success});

    event.preventDefault();
  }

//---- Display Functions

  function getPriorities(){
    var url = window.location.origin.replace(/[0-9]{4}/, '4000')+'/priorities';
    $.getJSON(url, displayPriorities);
  }

  function displayPriorities(data){
    for(var i=0; i<data.priorities.length; i++){
      displayTable(data.priorities[i]);
    }
  }

  function displayTable(priority){
    var $tr = $('<tr>');
    var $tdupdate = $('<td>');
    var $updatebtn = $('<button>Update</button>');
    var $tdname = $('<td>');
    var $tdvalue = $('<td>');
    var $divname = $('<div>');
    var $divval = $('<div>');
    var $divdel = $('<div>x</div>');

    $divname.addClass('editable name');
    $divval.addClass('editable value');
    $divdel.addClass('delete');

    $tr.attr('data-id', priority._id);
    $tdupdate.append($updatebtn.attr('data-id', priority._id).addClass('tiny radius alert updatebtn').hide());
    $tdname.append($divname.text(priority.name));
    $tdvalue.append($divval.text(priority.value));

    $tr.append($tdupdate, $tdname, $tdvalue, $divdel);
    $('table > tbody').append($tr);
    wrap();
  }

  function wrap(){
    $('.editable').wrap('<a href="#"></a>');
  }

//---- Update Functions

  function editPriority(){
    //$(this).parent().parent().siblings().children('.updatebtn').css('visibility', 'visible');
    $(this).closest('tr').children(':first').children().show();
    //$(this).closest('tr').children('td:nth-child(1)').css('visibility', 'visible');
    $(this).replaceWith('<input type="text" placeholder="Update" autofocus>');
    /*$(this).replaceWith('<select></select>');
    for(var i=1; i<4; i++){
      $('<select>').append('<option>'+i+'</option>');
    }
    $('<select>').prepend('<option>Select New Value</option>');*/
  }

  function updatePriority(){
    var id = $(this).data('id');
    var pname = $(this).parent().siblings().children().children('input').val();
    var pval = $(this).parent().siblings().children().children('.value').text();
    var obj = {name:pname, value:pval, _id:id};

    var url = window.location.origin.replace(/[0-9]{4}/, '4000') + '/priorities';
    var type = 'PUT';
    var data = obj;
    var success = refreshTable;

    $.ajax({url:url, type:type, data:data, sucess:success});
  }

  function refreshTable(){
    debugger;
    $('#table > tbody > tr').remove();
    getPriorities();
  }

})();

