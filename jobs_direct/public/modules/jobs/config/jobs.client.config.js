'use strict';

// Configuring the Jobs module
angular.module('articles').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Jobs', 'jobs', 'dropdown', '/jobs(/create)?');
		Menus.addSubMenuItem('topbar', 'jobs', 'List Jobs', 'jobs');
		Menus.addSubMenuItem('topbar', 'jobs', 'New Job', 'jobs/create');
	}
]);
