# Index File Written in CoffeScript
class @EveEngine extends Backbone.Model
	initialize:->
		@.set({ProjectList: []})
		$("#eveStatusHeader").html("<div>EVE ENGINE IS ONLINE</div>")
		Cufon.refresh()
		console.log @
	createProject:->
		@ProjectAlpha = new Project

class @Task extends Backbone.Model
	initialize:->
		console.log "New Task Fetched"
	sayName:->
		console.log @

class @Project extends Backbone.Collection 
	url: "http://devdashapi.atomicflowtech.com/api/tasks"
	defaults:
		name: "Project Name Not Set"
	model: Task
	initialize:->
		@name = prompt "What is the name of the project?"
		console.log "New Project Created"
		Eve.get("ProjectList").push(@)
		@.fetch()

#EVE Engine Logic

#Create a new collection of Tasks
$('#startEveLink').click -> window.Eve = new EveEngine
$('#createProjectLink').click -> Eve.createProject()
$('#createTaskLink').click -> Eve.createTask()

	
	
