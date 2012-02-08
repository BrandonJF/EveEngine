(function() {
  var TaskItemListView,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.EveEngine = (function(_super) {

    __extends(EveEngine, _super);

    function EveEngine() {
      EveEngine.__super__.constructor.apply(this, arguments);
    }

    EveEngine.prototype.initialize = function() {
      this.set({
        ProjectList: []
      });
      $("#eveStatusHeader").html("<div>EVE ENGINE IS ONLINE</div>");
      Cufon.refresh();
      return console.log(this);
    };

    EveEngine.prototype.createProject = function() {
      return Eve.get("ProjectList").push(new Project);
    };

    EveEngine.prototype.renderTasks = function() {
      var taskitemlistview;
      taskitemlistview = new TaskItemListView({
        model: Eve.get('ProjectList')[0]
      });
      return taskitemlistview.render();
    };

    return EveEngine;

  })(Backbone.Model);

  this.Task = (function(_super) {

    __extends(Task, _super);

    function Task() {
      Task.__super__.constructor.apply(this, arguments);
    }

    Task.prototype.initialize = function() {
      return console.log("New Task Fetched");
    };

    Task.prototype.sayName = function() {
      return console.log(this);
    };

    return Task;

  })(Backbone.Model);

  this.Project = (function(_super) {

    __extends(Project, _super);

    function Project() {
      Project.__super__.constructor.apply(this, arguments);
    }

    Project.prototype.url = "http://devdashapi.atomicflowtech.com/api/tasks";

    Project.prototype.defaults = {
      name: "Project Name Not Set"
    };

    Project.prototype.model = Task;

    Project.prototype.initialize = function() {
      console.log("New Project Created");
      return this.fetch();
    };

    return Project;

  })(Backbone.Collection);

  TaskItemListView = (function(_super) {

    __extends(TaskItemListView, _super);

    function TaskItemListView() {
      this._click = __bind(this._click, this);
      TaskItemListView.__super__.constructor.apply(this, arguments);
    }

    TaskItemListView.prototype.className = 'taskListItem';

    TaskItemListView.prototype.tagName = 'div';

    TaskItemListView.prototype.id = "taskItem" + Math.random();

    TaskItemListView.prototype.el = $("#dataDisplayContent");

    TaskItemListView.prototype.events = {
      click: '_click'
    };

    TaskItemListView.prototype.initialize = function() {
      this.model.bind('change', this.render, this);
      return this.model.bind('reset', this.render, this);
    };

    TaskItemListView.prototype.render = function() {
      var el;
      el = this.el;
      console.log("attempting render");
      console.log(this.model);
      _.each(this.model.models, function(task) {
        var html;
        task = task.toJSON();
        html = ich.taskListItemTemplate(task);
        return $(el).append(html);
      });
      return this;
    };

    TaskItemListView.prototype._click = function() {
      return console.log(this.model);
    };

    return TaskItemListView;

  })(Backbone.View);

  $('#startEveLink').click(function() {
    return window.Eve = new EveEngine;
  });

  $('#createProjectLink').click(function() {
    return Eve.createProject();
  });

  $('#createTaskLink').click(function() {
    return Eve.createTask();
  });

  $('#renderTaskViewLink').click(function() {
    return Eve.renderTasks();
  });

}).call(this);
