const http = require("http");
const querystring = require("query-string");

//GASでwakeさせること。

http
  .createServer(function(req, res) {
    if (req.method == "POST") {
      var data = "";
      req.on("data", function(chunk) {
        data += chunk;
      });
      req.on("end", function() {
        if (!data) {
          res.end("No post data");
          return;
        }
        var dataObject = querystring.parse(data);
        console.log("post:" + dataObject.type);
        if (dataObject.type == "wake") {
          console.log("Woke up in post");
          res.end();
          return;
        }
        res.end();
      });
    } else if (req.method == "GET") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Discord Bot is Oprateing!");
    }
  })
  .listen(3000);

if (process.env.TOKEN == undefined || process.env.TOKEN == "") {
  console.log("TOKENを設定してください。");
  process.exit(0);
}

require("./main.js");
