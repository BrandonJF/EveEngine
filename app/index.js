(function() {
  var ProjectView, TaskItemView,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  $('#startEveLink').click(function() {
    return window.Eve = new EveEngine;
  });

  $('#createProjectLink').click(function() {
    return Eve.createProject();
  });

  $('#renderProjectLink').click(function() {
    return Eve.renderProject();
  });

  $('#createTaskLink').click(function() {
    return Eve.createTask();
  });

  this.EveEngine = (function(_super) {

    __extends(EveEngine, _super);

    function EveEngine() {
      EveEngine.__super__.constructor.apply(this, arguments);
    }

    EveEngine.prototype.defaults = {
      "status": "EVE ENGINE IS OFFLINE",
      "notification": null
    };

    EveEngine.prototype.initialize = function() {
      this.set({
        ProjectList: []
      });
      $("#eveStatusHeader").html("<div>EVE ENGINE IS ONLINE</div>");
      Cufon.refresh();
      this.set({
        "status": "EVE ENGINE IS ONLINE"
      });
      return console.log(this);
    };

    EveEngine.prototype.setStatus = function(status) {
      this.set({
        "status": status
      });
      status = Eve.get('status');
      $("#eveStatusHeader").html("<div>" + status + "</div>");
      return Cufon.refresh();
    };

    EveEngine.prototype.notify = function(notification) {
      $("#eveStatusHeader").html("<div>" + notification + "</div>");
      Cufon.refresh();
      return setTimeout((function() {
        $("#eveStatusHeader").html("<div>" + (Eve.get('status')) + "</div>");
        return Cufon.refresh();
      }), 2000);
    };

    EveEngine.prototype.createProject = function() {
      return Eve.get("ProjectList").push(new Project);
    };

    EveEngine.prototype.renderProject = function() {
      var projectview;
      return projectview = new ProjectView({
        model: Eve.get('ProjectList')[0]
      });
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
      "ProjectName": "Project Name Not Set"
    };

    Project.prototype.model = Task;

    Project.prototype.initialize = function() {
      console.log(this);
      Eve.notify("New project created...");
      console.log("The new Project " + this.ProjectName);
      return this.fetch();
    };

    return Project;

  })(Backbone.Collection.extend({
    "ProjectName": "projectName"
  }));

  ProjectView = (function(_super) {

    __extends(ProjectView, _super);

    function ProjectView() {
      this._click = __bind(this._click, this);
      ProjectView.__super__.constructor.apply(this, arguments);
    }

    ProjectView.prototype.className = 'ProjectViewClass';

    ProjectView.prototype.tagName = 'div';

    ProjectView.prototype.id = "ProjectViewDiv";

    ProjectView.prototype.el = $("#dataDisplayContent");

    ProjectView.prototype.events = {
      click: '_click'
    };

    ProjectView.prototype.initialize = function() {
      Eve.notify("Rendering project...");
      this.render();
      this.model.bind('change', this.render, this);
      return this.model.bind('reset', this.render, this);
    };

    ProjectView.prototype.render = function() {
      var Project, RenderTarget;
      RenderTarget = this.el;
      console.log("attempting render");
      console.log(this.model);
      Project = this.model;
      Project.each(function(task) {
        var html;
        task = task.toJSON();
        html = ich.taskListItemTemplate(task);
        return $(RenderTarget).append(html);
      });
      return this;
    };

    ProjectView.prototype._click = function() {
      return console.log(this.model);
    };

    return ProjectView;

  })(Backbone.View);

  TaskItemView = (function(_super) {

    __extends(TaskItemView, _super);

    function TaskItemView() {
      this._click = __bind(this._click, this);
      TaskItemView.__super__.constructor.apply(this, arguments);
    }

    TaskItemView.prototype.className = 'taskListItem';

    TaskItemView.prototype.tagName = 'div';

    TaskItemView.prototype.id = "taskItem" + Math.random();

    TaskItemView.prototype.el = $("#dataDisplayContent");

    TaskItemView.prototype.events = {
      click: '_click'
    };

    TaskItemView.prototype.initialize = function() {
      this.model.bind('change', this.render, this);
      return this.model.bind('reset', this.render, this);
    };

    TaskItemView.prototype.render = function() {
      var Project, RenderTarget;
      RenderTarget = this.el;
      console.log("attempting render");
      console.log(this.model);
      Project = this.model;
      Project.each(function(task) {
        var html;
        task = task.toJSON();
        html = ich.taskListItemTemplate(task);
        return $(RenderTarget).append(html);
      });
      return this;
    };

    TaskItemView.prototype._click = function() {
      return console.log(this.model);
    };

    return TaskItemView;

  })(Backbone.View);

}).call(this);
