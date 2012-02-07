(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

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
      return this.ProjectAlpha = new Project;
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
      this.name = prompt("What is the name of the project?");
      console.log("New Project Created");
      Eve.get("ProjectList").push(this);
      return this.fetch();
    };

    return Project;

  })(Backbone.Collection);

  $('#startEveLink').click(function() {
    return window.Eve = new EveEngine;
  });

  $('#createProjectLink').click(function() {
    return Eve.createProject();
  });

  $('#createTaskLink').click(function() {
    return Eve.createTask();
  });

}).call(this);
