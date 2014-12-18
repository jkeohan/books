var index = "index.html";
var fs = require("fs");
var http = require("http");
var server = http.createServer(function(req,res){

  var path = req.url;
  var title = path.split("/");

  var bookFiles = [];

  var bookObjs = [];

  var html = [];

  // if (path === "/")


  var htmlGen = {
    books : function(obj) {
      var string = "<li><img src=" + obj.pic + "><a href=" + obj.title + ">" + obj.title + "</a></li>";
      return string;
    },
  };


  var BookConstructor = function(title) {
    var gen = {
      title : title.slice(0,title.length-4),
      file : title+".txt",
      pic : title+".jpg",
      html : "",
      bookText : "",
    }
    return gen;
  };


  var bookCheck = function(cb) {
    fs.readdir("books", function(err,files) {
      bookFiles = files.toString().split(".txt")
      var bookFilesFull = files
      //console.log(bookFilesFull)
      bookFilesFull.forEach(function (bookFile) {
        var bookObj = BookConstructor(bookFile);
        var generatedHtml = htmlGen.books(bookObj);
        bookObj.html = generatedHtml;
        bookObjs.push(bookObj);
      });

      for (var i = 0; i < bookFiles.length; i++) {
        if (bookFiles[i] === title[1]) {
          return cb(true); //mycallback(true)
        }
      }
      cb(false)
    });
  }

  var mycallback = function(foundBook) {
  if ( foundBook ) {

      fs.readFile("index.source", function(err, data){

        var htmlText = data.toString();

        bookObjs.forEach(function(bookObj) {
          html.push(bookObj.html)
        });

        htmlText = htmlText.replace("<REPLACELI>", html.join(" "));

        res.end(htmlText);


        // fs.readFile("books/"+title[1]+".txt", function(err, data){
        //
        //   var bookText = data.toString().split("\n")
        //   var bookText2 = [];
        //
        //   bookText.forEach(function(x) {
        //     bookText2.push(x)
        //     bookText2.push("<br>")
        //
        //   });
        //
        //   htmlText = htmlText.replace("<REPLACEME>", bookText2.join("\n"))
        //
        //   res.end(htmlText);
        //
        // });



      });

    }

    else {
      res.end("Book does not exist")
    }
  }

  bookCheck(mycallback);



});

server.listen(2000);
