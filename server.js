var index = "index.html";
var fs = require("fs");
var http = require("http");
var server = http.createServer(function(req, res){
  var path = req.url;
  var title = path.split("/");
  fs.readFile("index.html", function(err, data){
    var htmlText = data.toString();
    console.log(htmlText);
    fs.readFile("books.txt"), function(err, data){
      var bookText = data.toString();
      var htmlText = htmlText.replace("<replace>", bookText);
      fs.writeFile("index.html", htmlText, function(err){});
      server.res(index.html);
    }
  });
});
server.listen(2000);