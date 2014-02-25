(function(){

  'use strict';

  $(document).ready(initialize);

  var priorities;
  var query = {limit:5, page:1, direction:1};

  function initialize(){
    $(document).foundation();
    $('#task').submit(submitTask);
    $('#addtaskbtn').click(showTaskInput);
    $('#tasks').on('click', 'input[type="checkbox"]', taskChanged);
    $('#tasks').on('click', '.filter', filterTasks);
    $('#tasks').on('click', '.sort', sortTasks);
    $('#prev').click(clickPrev);
    $('#next').click(clickNext);
    populatePriorities();
    getAllTasks();
  }

  function showTaskInput(){
    $('#task').slideToggle('slow');
  }

  function sortTasks(event){
    if($(this).hasClass('isComplete')){
      query.sort = 'isComplete';
    }else{
      query.sort = 'dueDate';
    }

    query.direction *= -1;
    generateQuery();
    event.preventDefault();
  }

  function filterTasks(event){
    if($(this).hasClass('priorityId')){
      query.filterName = 'priorityId';
      query.filterValue = $(this).data('priority-id');
    }else{
      query.filterName = 'tags';
      query.filterValue = $(this).text();
    }

    generateQuery();
    event.preventDefault();
  }

  function clickPrev(){
    if(query.page > 1){query.page--;}
    query.limit = $('#limit').val() * 1 || query.limit;
    generateQuery();
  }

  function clickNext(){
    query.page++;
    query.limit = $('#limit').val() * 1 || query.limit;
    generateQuery();
  }

  function generateQuery(){
    var url = generateUrl('/tasks');
    var data = query;
    var type = 'GET';
    var success = addTasksToTable;

    $.ajax({data:data, url:url, type:type, success:success});
  }

  function taskChanged(){
    var id = $(this).parent().parent().data('task-id');
    var url = generateUrl('/tasks/toggle/' + id);
    var type = 'PUT';

    $.ajax({url:url, type:type});
  }

  function getAllTasks(){
    var url = generateUrl('/tasks');
    var type = 'GET';
    var success = addTasksToTable;

    $.ajax({url:url, type:type, success:success});
  }

  function submitTask(event){
    var data = $(this).serialize();
    var url = generateUrl('/tasks');
    var type = 'POST';
    var success = addTaskToTable;

    $.ajax({data:data, url:url, type:type, success:success});

    event.preventDefault();
  }

  function addTasksToTable(payload){
    $('#tasks > tbody').empty();
    $('#page').text(query.page);

    for(var i = 0; i < payload.tasks.length; i++){
      addTaskToTable(payload.tasks[i]);
    }
  }

  function addTaskToTable(task){
    var $row = $('<tr>');
    var $isComplete = $('<td>');
    var $title = $('<td>');
    var $dueDate = $('<td>');
    var $priority = $('<td>');
    var $tags = $('<td>');

    $row.attr('data-task-id', task._id);

    var $checkbox = $('<input type="checkbox">');
    $checkbox.attr('checked', task.isComplete);
    $isComplete.append($checkbox);

    $title.text(task.title);

    var date = moment(task.dueDate).format('L');
    $dueDate.text(date);

    var priority = _.find(priorities, function(p){return p._id === task.priorityId;});
    $priority.append('<a data-priority-id="'+priority._id+'" class="filter priorityId" href="#">'+priority.name+'</a>');

    for(var i = 0; i < task.tags.length; i++){
      var tag = task.tags[i];
      $tags.append('<a class="filter tags" href="#">'+tag+'</a>');
    }

    $row.append($isComplete, $title, $dueDate, $priority, $tags);
    $('#tasks > tbody').append($row);
  }

  function populatePriorities(){
    var url = generateUrl('/priorities');
    var type = 'GET';
    var success = addPrioritiesToSelect;

    $.ajax({url:url, type:type, success:success});
  }

  function addPrioritiesToSelect(payload){
    priorities = payload.priorities;

    for(var i = 0; i < payload.priorities.length; i++){
      var priority = payload.priorities[i];
      $('select').append('<option value="'+priority._id+'">'+priority.name+'</option>');
    }
  }

  function generateUrl(path){
    var url = window.location.origin.replace(/[0-9]{4}/, '4000');
    url += path;
    return url;
  }

})();

