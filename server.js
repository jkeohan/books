var index = "index.html";
var fs = require("fs");
var http = require("http");
var server = http.createServer(function(req,res){
  var path = req.url;
  var title = path.split("/");
  fs.readFile("index.html", function(err, data){
    var htmlText = data.toString();
    //console.log(htmlText);
    fs.readFile("books.txt", function(err, data){
      //console.log("Inside seconde readFile");
      //console.log(htmlText);

      var bookText = data.toString().split("\n")

      // bookText.forEach( function (val){
     
      // })
      var bookText2 = [];
      
      bookText.forEach(function(x) {
        bookText2.push(x)
        bookText2.push("<br>")
      });


      console.log(bookText2.join("\n"));
      htmlText = htmlText.replace("<REPLACEME>", bookText2.join("\n"))
    
      fs.writeFile("index.html", htmlText, function(err){});
      res.end(htmlText);
    
      });
      //console.log(htmlText);


  });
});

server.listen(2000);

/*<html>
  <body>
    <p>
     
    </p>
  </body>
</html>*/