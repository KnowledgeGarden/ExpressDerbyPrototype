ExpressDerbyPrototype
=====================

A NodeJS server platform to explore feature development

This platform explores a variety of features, including:
- Bookmarklets for social bookmarking
- Chat rooms
- Structured conversations
- Facilities for role-playing games (quests, guilds, avatars, etc)
- Topic Maps for well-organized information resources

## Usage (at present) ##
Requires MongoDB running
The usual:
npm install
node server.js
navigate to localhost:3000

To play with the bookmarklet, create a browser bookmarklet with this code:

javascript:location.href='http://localhost:3000/bkmrk?url='+
encodeURIComponent(location.href)+'&title='+
encodeURIComponent(document.title)

Then, with the server running, visit any webpage and click that bookmarklet. At present, the console.log will show the url and page title. That has been sent to the BookmarkModel which will eventually handle the bookmark itself.
