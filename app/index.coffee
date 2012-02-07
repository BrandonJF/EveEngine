# Index File Written in CoffeScript
jsonData = [
   {
      "id":1,
      "name":"FirstTask",
      "project":"Project Alpha",
      "notes":"This is some test data for a mock task"
   }
]

class @EveEngine extends Backbone.Model
	initialize:->
		$("#eveStatusHeader").html("<div>EVE ENGINE IS ONLINE</div>")
		Cufon.refresh()
		console.log @.toJSON()
	createProject:->
		ProjectAlpha = new Project



class @Task extends Backbone.Model
	defaults:
	
		name: "Name Not Set"
		project: "Project Not Set"
		notes: "Notes Not Set"
	initialize:->
		alert "New Task Created"
		console.log @.toJSON()
	sayName:->
		console.log @


class @Project extends Backbone.Collection 
	localStorage: new Store("ProjectStorage")
	defaults:
		name: "Project Name Not Set"
	model: Task
	initialize:->
		@name = prompt "What is the name of the project?"
		alert "New Project Created"
		console.log @	
		@save()

#EVE Engine Logic

#Create a new collection of Tasks
$('#startEveLink').click -> window.Eve = new EveEngine
$('#createProjectLink').click -> Eve.createProject()
$('#createTaskLink').click -> 
	TaskOne = new Task
	TaskTwo = new Task

	
	
