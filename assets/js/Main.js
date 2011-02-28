var Main = new Class({
	
	Implements: Events,
	
	projectSortable: null,
	tagSortable: null,
	
	init: function()
	{
		// handle layout
		window.addEvent( 'resize', main.layout );
		
		// init our parts
		main.projects.init();
		main.tags.init();
		main.tasks.init();
		main.pop.init();
		
		// load some projects and tags
		Project.loadProjects( this.projectsLoaded, this.projectLoadFailed );
		
		$prompt.defaults.prefix = 'jqismooth';
		
		// listen to clicks on the add button in the west toolbar
		$( 'west' ).getElement( 'div.new-action > a' ).addEvent( 'click', prompts.newProjectOrTag );
	},
	
	layout: function()
	{
		var winSize = window.getSize();
		$( 'main' ).setStyle( 'width', winSize.x - 211 );
		
		var tagList = $( 'tagListWrapper' );
		var newHeight = winSize.y - tagList.getCoordinates().top - 30 + 10; // bottom toolbar(30), ul padding(10)
		tagList.setStyle( 'height', newHeight );
		
		$( 'west' ).setStyle( 'height', winSize.y - 42 );
		
		// update scrollers
		main.tags.scrollBar.update();
	},
	
	alert: function( message, title )
	{
		title = title || 'Prime31 Tasks';
		
		if( main.tinyAlert == undefined )
			main.tinyAlert = new TinyAlert({ position: 'br' });
		main.tinyAlert.show( title, message )
	},
	
	projectsLoaded: function( projects, tags )
	{
		main.tags.clearTags();
		main.tags.addTags( tags );
		
		main.projects.clearProjects()
		main.projects.addProjects( projects );
	},
	
	projectLoadFailed: function( xhr )
	{
		alert( 'Project load failed' );
	},

	deselectProjectAndTag: function()
	{
		var ele = document.id( 'projectList' ).getElement( 'li.selected' );
		if( ele )
			ele.removeClass( 'selected' );
			
		var ele = document.id( 'tagList' ).getElement( 'li.selected' );
		if( ele )
			ele.removeClass( 'selected' );
	}

});

var main = new Main();

document.addEvent( 'domready', main.init.bind( main ) );