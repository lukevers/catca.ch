//  ----------
//  Cat Cache!
//  ----------
//  
//  router.js
//  
//  © 2013 Cat Cache!

module.exports = function(app, db) {
	
	require('./post')(app, db);
	require('./get')(app, db);
	
}