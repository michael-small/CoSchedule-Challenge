// It took me a long time to get a hang of node.js. I tried a lot of approaches to get to this commit, but they were
// 		all too busted and broken to be worth commiting. I learned so much along the way and while I couldn't recreate 
//		the base of this code from scratch, I only upload this now because I am confident that I understand it. That said:
// The bulk of the scraper code and the GET code comes from Brent Anderson, archived and last changed in late 2012
// Link to Brent's MIT Liscense: https://github.com/brentjanderson/xkcd/blob/master/LICENSE
// I had to update a lot of deprecated things, ranging from suggestions from the compiler to outright breaking the code
// Beyond that, I had to update http/https settings and remove boilerplate 
// There are still some major inconsistencies like I mention in the TODO below, but this is a start.
// The rest of the CRUD operations I will create, now that this server codebase I have started with makes sense to me.

/**
 * Module dependencies.
 */

var express = require('express')
	,http = require('http'),
	bodyParser = require('body-parser');

var app = express();
	app.set('port', process.env.PORT || 5000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(bodyParser.json());

app.use('development', function(){
	app.use(express.errorhandler());
});

http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});

app.get('/comic/:id', function(req, res) {
	var comic = comics[req.param('id')];
	if (!comic) {
		res.send('Comic not found', 404);
	} else {
		res.send({img: comic.img, alt: comic.alt, title: comic.title, month: comic.month, day: comic.day, year: comic.year, num: comic.num});
		console.log("Retreived comic #" + comic.num + ' (' + comic.month + '/' + comic.day + '/' + comic.year + ')')
	}
});

var comments = [];

app.post('/addComment', function(req, res) {
	let comment = req.body.com;
	comments.push(comment);
	comments = comments.map(Number); //TODO: fix
	comments.sort();
	res.send([comment]);
	console.log("comments after adding: " + comments);
	res.end("yes");
});

app.delete('/deleteComment/:id', function(req, res) {
	let com = req.body.id;
	
	res.json({com});
	
	res.end("yes");
});

/**
 * Setup xkcd miner
 */

var rest = require('./rest');
var fs = require('fs');

var comics = [];

var options = {
	host: 'www.xkcd.com',
	port: 443,
	path: '/info.0.json',
	method: 'GET',
};

try {
	comics = fs.readFileSync('comics.json');
	comics = JSON.parse(comics);
} catch(e) { // Fail silently: If we don't have a file, we ignore it.
	comics = [];
}

// TODO: Something about this is incredibly broken and unreliable. Can miss anything between a couple 100 and over 1000 comics.
//		 I don't know exactly what the inconsistency is, but I imagine it is how their server accepts http/https requests and/or
//		 how this sends them out. 
var processComics = function() {
	console.log('Processing Comics...');
	rest.getJSON(options, function(res, obj) { // This outer call just grabs the most recent comic to know how many more to grab
		var totalCount = obj.num; 
		var lastComic = comics[comics.length - 1];
		if (!lastComic) {
			lastComic = {num: 0};
		}

		for (var i = totalCount; i > lastComic.num; i--) { // Adds each comic from the most recent to first comic
			var options = {
				host: 'www.xkcd.com',
				port: 443, // Was originaly 80, but xkcd seems to enforce https now in 2020
				path: '/' + i + '/info.0.json', // All xkcd comic endpoints are just a consecutive series of ints from 1 to the most current
				method: 'GET',
			};

			rest.getJSON(options, function(res, obj) {
				comics[obj.num] = obj;
			
				if (obj.num == lastComic.num + 1) {
					fs.writeFileSync("comics.json", JSON.stringify(comics));
				}
			});
		}
	});
	console.log('Processed Comics!');
}

processComics();
// TODO: Impliment if time provides
// Reprocess comics once every 3 days
var processComicsInterval = setInterval(processComics, 1000 * 60 * 60 * 24 * 3);