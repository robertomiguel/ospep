var express     = require('express');
var path        = require("path");

var app         = express();

var staticPath  = path.join(__dirname, "www");

app.set("views", path.resolve(__dirname, "vistas"));
app.set("view engine", "ejs");

app.use(function(req, res, next) {
 //console.log("Petición: " + req.method + " URL: " + req.url);
 //console.log('Hostname: ' + req.headers.host);
 if (true) {
    next();
 } else {
    res.end('cuac!');
 }
});
      
app.use(express.static(staticPath));

app.get('*', function(req, res) {
  switch (req.url) {
    case '/':
        res.render("index");
    case '/cheque':
      res.render('cheque');
    break;
    default:
      res.end('get cuac!');
  }
});

app.listen(3000, function() {
 console.log("Web Server *:3000");
});