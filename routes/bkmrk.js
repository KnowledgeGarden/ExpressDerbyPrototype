/*
 * GET bookmarklet page.
 * a bookmarklet looks like:
 * javascript:location.href='http://<serverurl>/bkmrk?url='+
            
 *   encodeURIComponent(location.href)+'&title='+
            
 *   encodeURIComponent(document.title)
 */
var bkmrk = require('../apps/models/bookmarkmodel'); // /index
var bookmark = bkmrk;

exports.bkmrk = function(req, res){
	var q = req.query;
	var url = q.url;
	var title = q.title;
console.log('Routes/bkmrk '+url+' | '+title);
	bookmark.getBookmarklet(url,title);

  res.render('bkmrk', { title: 'Bookmarklet' });
};