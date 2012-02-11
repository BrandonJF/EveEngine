# Index File Written in CoffeScript

#EVE Engine Logic
#Create a new collection of Tasks
$('#startEveLink').click -> window.Eve = new EveEngine
$('#createProjectLink').click -> Eve.createProject()
$('#renderProjectLink').click -> Eve.renderProject()
$('#createTaskLink').click -> Eve.createTask()




class @EveEngine extends Backbone.Model
	defaults:
		"status": "EVE ENGINE IS OFFLINE"
		"notification": null
	initialize:->
		#Adds an array ProjectList to EveEngine that holds current projects.
		@.set({ProjectList: []})
		#Sets the status header of on the notification bar.
			#$("#eveStatusHeader").html("<div>EVE ENGINE IS ONLINE</div>")
		$("#eveStatusHeader").html("<div>EVE ENGINE IS ONLINE</div>")
		Cufon.refresh()
		@set("status": "EVE ENGINE IS ONLINE")
		#Let's make sure that Cufon renders the status into our pretty font.
		
		console.log @
	setStatus:(status)->
		@set({"status": status})
		status = Eve.get('status')
		$("#eveStatusHeader").html("<div>#{status}</div>")
		Cufon.refresh()
	notify:(notification)->
		$("#eveStatusHeader").html("<div>#{notification}</div>")
		Cufon.refresh()
		setTimeout (-> $("#eveStatusHeader").html("<div>#{Eve.get('status')}</div>");Cufon.refresh(); ),2000
		
	createProject:->
		#Create a new project and add it to the project array in the engine.
		Eve.get("ProjectList").push(new Project)
	renderProject:->
		projectview = new ProjectView({model:Eve.get('ProjectList')[0]})



class @Task extends Backbone.Model
	initialize:->
		console.log "New Task Fetched"

	sayName:->
		console.log @

class @Project extends Backbone.Collection.extend({"ProjectName":"projectName"}) 
	url: "http://devdashapi.atomicflowtech.com/api/tasks"
	defaults:
		"ProjectName": "Project Name Not Set"
	model: Task
	initialize:->
		#@.set name = prompt "What is the name of the project?"
		console.log @
		Eve.notify("New project created...")
		console.log "The new Project #{@ProjectName}"
		@.fetch()

class ProjectView extends Backbone.View
	className:'ProjectViewClass'
	tagName: 'div'
	id:"ProjectViewDiv"
	el: $("#dataDisplayContent")
	events:
		click: '_click'
	
	initialize:->
		Eve.notify("Rendering project...")
		@render()
		@model.bind('change',@render, @)
		@model.bind('reset', @render, @);

	render:->
		RenderTarget = @el
		console.log  "attempting render"
		console.log @model
		Project = @model
		Project.each((task)->
			task = task.toJSON()
			html = ich.taskListItemTemplate(task)
			$(RenderTarget).append(html))
		return @
	_click:=>
		console.log @.model

class TaskItemView extends Backbone.View
	className:'taskListItem'
	tagName: 'div'
	id:"taskItem" + Math.random() 
	el: $("#dataDisplayContent")
	events:
		click: '_click'
	
	initialize:->
		@model.bind('change',@render, @)
		@model.bind('reset', @render, @);

	render:->
		RenderTarget = @el
		console.log  "attempting render"
		console.log @model
		Project = @model
		Project.each((task)->
			task = task.toJSON()
			html = ich.taskListItemTemplate(task)
			$(RenderTarget).append(html))
		return @
	_click:=>
		console.log @.model



	
	
