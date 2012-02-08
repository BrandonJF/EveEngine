# Index File Written in CoffeScript
class @EveEngine extends Backbone.Model
	initialize:->
		@.set({ProjectList: []})
		$("#eveStatusHeader").html("<div>EVE ENGINE IS ONLINE</div>")
		Cufon.refresh()
		console.log @
	createProject:->
		# ProjectAlpha = new Project
		Eve.get("ProjectList").push(new Project)
	renderTasks:->
		taskitemlistview = new TaskItemListView({model:Eve.get('ProjectList')[0]})
		taskitemlistview.render()



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
		#@name = prompt "What is the name of the project?"
		console.log "New Project Created"
		@.fetch()

class TaskItemListView extends Backbone.View
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
		el = @el
		console.log  "attempting render"
		console.log @model
		_.each(@model.models, (task)->
			task = task.toJSON()
			html = ich.taskListItemTemplate(task)
			$(el).append(html)	)
			#$('#dataDisplayContent').append(@el))
		#task = Eve.get('ProjectList')[0].get('94').toJSON()
		#task = @model.toJSON()
		#html = ich.taskListItemTemplate(task)
		#console.log html
		#$(@el).append(html)
		# $('#dataDisplayContent').append(@el)
		return @
	_click:=>
		console.log @.model

#EVE Engine Logic

#Create a new collection of Tasks
$('#startEveLink').click -> window.Eve = new EveEngine
$('#createProjectLink').click -> Eve.createProject()
$('#createTaskLink').click -> Eve.createTask()
$('#renderTaskViewLink').click -> Eve.renderTasks()

	
	
