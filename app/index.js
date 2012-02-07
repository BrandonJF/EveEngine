(function() {
  var jsonData,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  jsonData = [
    {
      "id": 1,
      "name": "FirstTask",
      "project": "Project Alpha",
      "notes": "This is some test data for a mock task"
    }
  ];

  this.EveEngine = (function(_super) {

    __extends(EveEngine, _super);

    function EveEngine() {
      EveEngine.__super__.constructor.apply(this, arguments);
    }

    EveEngine.prototype.initialize = function() {
      $("#eveStatusHeader").html("<div>EVE ENGINE IS ONLINE</div>");
      Cufon.refresh();
      return console.log(this.toJSON());
    };

    EveEngine.prototype.createProject = function() {
      var ProjectAlpha;
      return ProjectAlpha = new Project;
    };

    return EveEngine;

  })(Backbone.Model);

  this.Task = (function(_super) {

    __extends(Task, _super);

    function Task() {
      Task.__super__.constructor.apply(this, arguments);
    }

    Task.prototype.defaults = {
      name: "Name Not Set",
      project: "Project Not Set",
      notes: "Notes Not Set"
    };

    Task.prototype.initialize = function() {
      alert("New Task Created");
      return console.log(this.toJSON());
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

    Project.prototype.localStorage = new Store("ProjectStorage");

    Project.prototype.defaults = {
      name: "Project Name Not Set"
    };

    Project.prototype.model = Task;

    Project.prototype.initialize = function() {
      this.name = prompt("What is the name of the project?");
      alert("New Project Created");
      console.log(this);
      return this.save();
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
    var TaskOne, TaskTwo;
    TaskOne = new Task;
    return TaskTwo = new Task;
  });

}).call(this);
