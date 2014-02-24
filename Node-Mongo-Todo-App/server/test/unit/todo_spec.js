/* jshint expr:true */

'use strict';

var expect = require('chai').expect;
var Priority;
var Todo;
var p1, p2, p3;

describe('Todo', function(){

  before(function(done){
    var connect = require('../../app/lib/mongodb-connection-pool');
    connect('todo-test', function(){
      Priority = global.nss.Priority;
      Todo = global.nss.Todo;
      done();
    });
  });

  beforeEach(function(done){
    p1 = new Priority({name:'High', value: '10'});
    p2 = new Priority({name:'Medium', value: '5'});
    p3 = new Priority({name:'Low', value: '1'});
    global.nss.db.dropDatabase(function(err, result){
      p1.save(function(){
        p2.save(function(){
          p3.save(function(){
            done();
          });
        });
      });
    });
  });
  // ------------------------------------------------------------------------ //
  describe('new', function(){
    it('should create a new Todo', function(){
      var obj = {isComplete:'true', task:'Sweeping', priorityId:p1._id, dueDate:'02/20/2014', tags:['sweep','chore']};
      var t1 = new Todo(obj);
      expect(t1).to.be.instanceof(Todo);
      expect(t1).to.have.property('task').and.equal('Sweeping');
      expect(t1).to.have.property('priorityId').and.be.ok;
      expect(t1).to.have.property('tags').and.have.length(2);
    });
  });
  // ------------------------------------------------------------------------ //
  describe('#save', function(){
    it('should save a Todo object into the database', function(done){
      var obj = {isComplete:'true', task:'Sweeping', priorityId:p1._id, dueDate:'02/20/2014', tags:['sweep','chore']};
      var t1 = new Todo(obj);
      t1.save(function(err){
        expect(err).to.be.null;
        expect(t1).to.be.instanceof(Todo);
        expect(t1.task).to.equal('Sweeping');
        expect(t1).to.have.property('_id').and.be.ok;
        done();
      });
    });
    /*
    it('should not create duplicate todos based on Id', function(done){
      var obj = {isComplete:'true', task:'Sweeping', priorityId:p1._id, dueDate:'02/20/2014', tags:['sweep','chore'], _id:'30000'};
      var t1 = new Todo(obj);
      var t2 = new Todo(obj);

      t1.save(function(){
        t2.save(function(){
          expect(t2._id).to.be.undefined;
          done();
        });
      });
    });
  });
  */
  
    it('should update an existing todo', function(done){
      var obj = {isComplete:'true', task:'Sweeping', priorityId:p1._id, dueDate:'02/20/2014', tags:['sweep','chore']};
      var t1 = new Todo(obj);

      t1.save(function(){
        t1.task = 'Mowing';
        t1.tags = ['yardwork', 'home'];
        var oldId = t1._id.toString();
        t1.save(function(){
          Todo.findById(oldId, function(todo){
            expect(todo.task).to.equal('Mowing');
            expect(todo.tags).to.deep.equal(['yardwork', 'home']);
            done();
          });
        });
      });
    });
  });
  // ------------------------------------------------------------------------ //
  describe('.findAll', function(){
    it('should return all Todos in the datbase', function(done){
      var obj1 = {isComplete:'true', task:'Sweeping', priorityId:p1._id, dueDate:'02/20/2014', tags:['sweep','chore']};
      var t1 = new Todo(obj1);
      var obj2 = {isComplete:'false', task:'Mowing', priorityId:p2._id, dueDate:'02/20/2014', tags:['sweep','chore']};
      var t2 = new Todo(obj2);
      var obj3 = {isComplete:'true', task:'Cleaning', priorityId:p3._id, dueDate:'02/20/2014', tags:['sweep','chore']};
      var t3 = new Todo(obj3);
      t1.save(function(){
        t2.save(function(){
          t3.save(function(){
            Todo.findAll(function(todos){
              expect(todos).to.have.length(3);
              done();
            });
          });
        });
      });
    });
  });

  // ------------------------------------------------------------------------ //
  describe('.findByComplete', function(){
    it('should find the Todo by isComplete', function(done){
      var obj1 = {isComplete:true, task:'Sweeping', priorityId:p1._id.toString(), dueDate:'02/20/2014', tags:['sweep','chore']};
      var t1 = new Todo(obj1);
      var obj2 = {isComplete:false, task:'Mowing', priorityId:p2._id.toString(), dueDate:'02/20/2014', tags:['sweep','chore']};
      var t2 = new Todo(obj2);
      var obj3 = {isComplete:true, task:'Cleaning', priorityId:p3._id.toString(), dueDate:'02/20/2014', tags:['sweep','chore']};
      var t3 = new Todo(obj3);
      
      t1.save(function(){
        t2.save(function(){
          t3.save(function(){
            Todo.findByComplete(true, function(todos){
              debugger;
              expect(todos[1].isComplete).to.equal(true);
              expect(todos).to.have.length(2);
              done();
            });
          });
        });
      });
    });
  });

  describe('.findById', function(){
    it('should find the Todo by its id', function(done){
      var obj1 = {isComplete:true, task:'Sweeping', priorityId:p1._id.toString(), dueDate:'02/20/2014', tags:['sweep','chore']};
      var t1 = new Todo(obj1);
      var obj2 = {isComplete:false, task:'Mowing', priorityId:p2._id.toString(), dueDate:'02/20/2014', tags:['sweep','chore']};
      var t2 = new Todo(obj2);
      var obj3 = {isComplete:true, task:'Cleaning', priorityId:p3._id.toString(), dueDate:'02/20/2014', tags:['sweep','chore']};
      var t3 = new Todo(obj3);

      t1.save(function(){
        t2.save(function(){
          t3.save(function(){
            var id = t2._id.toString();
            Todo.findById(id, function(foundTodo){
              expect(foundTodo).to.be.instanceof(Todo);
              expect(foundTodo._id.toString()).to.equal(id);
              done();
            });
          });
        });
      });
    });
  });

  describe('.findByPriority', function(){
    it('should find the Todo by its Priority', function(done){
      var obj1 = {isComplete:true, task:'Sweeping', priorityId:p1._id.toString(), dueDate:'02/20/2014', tags:['sweep','chore']};
      var t1 = new Todo(obj1);
      var obj2 = {isComplete:false, task:'Mowing', priorityId:p2._id.toString(), dueDate:'02/20/2014', tags:['sweep','chore']};
      var t2 = new Todo(obj2);
      var obj3 = {isComplete:true, task:'Cleaning', priorityId:p3._id.toString(), dueDate:'02/20/2014', tags:['sweep','chore']};
      var t3 = new Todo(obj3);

      t1.save(function(){
        t2.save(function(){
          t3.save(function(){
            var id = t2.priorityId.toString();
            Todo.findByPriority(id, function(foundTodo){
              expect(foundTodo.priorityId.toString()).to.equal(id);
              expect(foundTodo.task).to.equal('Mowing');
              done();
            });
          });
        });
      });
    });
  });

  describe('.deleteById', function(){
    it('should delete the todo by its id from the db', function(done){
      var obj1 = {isComplete:true, task:'Sweeping', priorityId:p1._id.toString(), dueDate:'02/20/2014', tags:['sweep','chore']};
      var t1 = new Todo(obj1);
      var obj2 = {isComplete:false, task:'Mowing', priorityId:p2._id.toString(), dueDate:'02/20/2014', tags:['sweep','chore']};
      var t2 = new Todo(obj2);
      var obj3 = {isComplete:true, task:'Cleaning', priorityId:p3._id.toString(), dueDate:'02/20/2014', tags:['sweep','chore']};
      var t3 = new Todo(obj3);

      t1.save(function(){
        t2.save(function(){
          var id = t2._id.toString();
          t3.save(function(){
            Todo.deleteById(id, function(numberRemoved){
              Todo.findById(id, function(foundTodo){
                expect(numberRemoved).to.equal(1);
                expect(foundTodo).to.be.null;
                done();
              });
            });
          });
        });
      });
    });
  });

  describe('.findByTag', function(){
    it('should find the todo(s) by its tags', function(done){
      var obj1 = {isComplete:true, task:'Sweeping', priorityId:p1._id.toString(), dueDate:'02/20/2014', tags:['sweep','chore']};
      var t1 = new Todo(obj1);
      var obj2 = {isComplete:false, task:'Mowing', priorityId:p2._id.toString(), dueDate:'02/20/2014', tags:['sweep','Thursday']};
      var t2 = new Todo(obj2);
      var obj3 = {isComplete:true, task:'Cleaning', priorityId:p3._id.toString(), dueDate:'02/20/2014', tags:['Home','chore']};
      var t3 = new Todo(obj3);

      t1.save(function(){
        t2.save(function(){
          t3.save(function(){
            Todo.findByTag('Home', function(foundTodo1){
              Todo.findByTag('Thursday', function(foundTodo2){
                expect(foundTodo1.tags).to.include('Home');
                expect(foundTodo2.tags).to.include('Thursday');
                done();
              });
            });
          });
        });
      });
    });
  });

  describe('.sortByDueDate', function(){
    it('should return Due Dates sorted', function(done){
      var obj1 = {isComplete:true, task:'Sweeping', priorityId:p1._id.toString(), dueDate:'02/21/2014', tags:['sweep','chore']};
      var t1 = new Todo(obj1);
      var obj2 = {isComplete:false, task:'Mowing', priorityId:p2._id.toString(), dueDate:'02/20/2014', tags:['sweep','Thursday']};
      var t2 = new Todo(obj2);
      var obj3 = {isComplete:true, task:'Cleaning', priorityId:p3._id.toString(), dueDate:'02/22/2014', tags:['Home','chore']};
      var t3 = new Todo(obj3);
      
      t1.save(function(){
        t2.save(function(){
          t3.save(function(){
            Todo.sortByDueDate(function(foundTodos){
              console.log(foundTodos);
              done();
            });
          });
        });
      });
    });
  });
  
  describe('.sortByPriority', function(){
    it('should return priorities sorted', function(done){
      var obj1 = {isComplete:true, task:'Sweeping', priorityId:p1._id.toString(), dueDate:'02/21/2014', tags:['sweep','chore']};
      var t1 = new Todo(obj1);
      var obj2 = {isComplete:false, task:'Mowing', priorityId:p2._id.toString(), dueDate:'02/20/2014', tags:['sweep','Thursday']};
      var t2 = new Todo(obj2);
      var obj3 = {isComplete:true, task:'Cleaning', priorityId:p3._id.toString(), dueDate:'02/22/2014', tags:['Home','chore']};
      var t3 = new Todo(obj3);
      
      t1.save(function(){
        t2.save(function(){
          t3.save(function(){
            Todo.sortByPriority(function(foundTodos){
              console.log(foundTodos);
              done();
            });
          });
        });
      });
    });
  });

// ------------------------------------------------------------------------ //
/*
  describe('.deleteById', function(){
    it('should delete the todo by its id from the datbase', function(done){
      var p1 = new Todo({name:'High', value:'10'});
      var p2 = new Todo({name:'Medium', value:'5'});
      var p3 = new Todo({name:'Low', value:'1'});

      p1.save(function(){
        p2.save(function(){
          var id = p2._id.toString();
          p3.save(function(){
            Todo.deleteById(id, function(numberRemoved){
              Todo.findById(id, function(foundTodo){
                expect(numberRemoved).to.equal(1);
                expect(foundTodo).to.be.null;
                done();
              });
            });
          });
        });
      });
    });
  });
  */
});

