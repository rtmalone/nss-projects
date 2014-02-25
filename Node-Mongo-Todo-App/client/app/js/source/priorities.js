(function(){

  'use strict';

  $(document).ready(initialize);

  var priorities = [];

  function initialize(){
    $(document).foundation();
    $('#priority').submit(submitPriority);
    $('#priorities').on('click', '.delete', deletePriority);
    $('#priorities').on('click', '.update', updatePriority);
    $('#priorities').on('click', '.edit', editPriority);
    getAllPriorities();
  }

  function editPriority(){
    var text = $(this).text();
    $(this).text('');
    $(this).append('<input autofocus type="text" value="'+text+'">');
    $(this).siblings().last().children().show();
  }

  function updatePriority(){
    var name = $(this).parent().siblings().first().children().val() || $(this).parent().siblings().first().text();
    var value = $(this).parent().siblings().first().next().children().val() || $(this).parent().siblings().first().next().text();
    var id = $(this).parent().parent().data('priority-id');
    var url = generateUrl('/priorities/' + id);
    var type = 'PUT';
    var data = {_id:id, name:name, value:value};
    var success = updatePriorityInTable;
    $.ajax({data:data, url:url, type:type, success:success});
  }

  function updatePriorityInTable(priority){
    var $row = $('#priorities > tbody > tr[data-priority-id="'+priority._id+'"]');
    $row.children().first().text(priority.name);
    $row.children().first().next().text(priority.value);
    $row.children().last().children().hide();
  }

  function deletePriority(){
    var id = $(this).parent().parent().data('priority-id');
    var url = generateUrl('/priorities/' + id);
    var type = 'DELETE';
    var success = removePriorityFromTable;
    $.ajax({url:url, type:type, success:success});
  }

  function removePriorityFromTable(payload){
    $('#priorities > tbody > tr[data-priority-id="'+payload.id+'"]').remove();
  }

  function getAllPriorities(){
    var url = generateUrl('/priorities');
    var type = 'GET';
    var success = addPrioritiesToTable;

    $.ajax({url:url, type:type, success:success});
  }

  function submitPriority(event){
    var data = $(this).serialize();
    var url = generateUrl('/priorities');
    var type = 'POST';
    var success = addPriorityToTable;

    $.ajax({data:data, url:url, type:type, success:success});

    $('#priority input').val('');
    $('input[name="name"]').focus();

    event.preventDefault();
  }

  function addPrioritiesToTable(payload){
    for(var i = 0; i < payload.priorities.length; i++){
      addPriorityToTable(payload.priorities[i]);
    }
  }

  function addPriorityToTable(priority){
    if(!priority._id){return;}
    priorities.push(priority);

    var $row = $('<tr>');
    var $nam = $('<td>');
    var $val = $('<td>');
    var $del = $('<td>');
    var $sav = $('<td>');

    $row.attr('data-priority-id', priority._id);
    $nam.addClass('edit').text(priority.name);
    $val.addClass('edit').text(priority.value);
    $del.append('<button style="margin:0px;padding:7px;" class="delete alert tiny radius">x</button>');
    $sav.append('<button style="margin:0px;padding:7px;" class="update tiny radius">Update</button>');

    $row.append($nam, $val, $del, $sav);
    $('#priorities > tbody').prepend($row);
  }

  function generateUrl(path){
    var url = window.location.origin.replace(/[0-9]{4}/, '4000');
    url += path;
    return url;
  }

})();

