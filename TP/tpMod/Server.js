const http = require("http");
const url = require("url");
const port = 3333;
function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    route(handle, pathname, response);
  }
  const server = http.createServer(onRequest);

  server.listen(port, function (error) {
    if (error) {
      console.log("Error : ", error);
    } else {
      console.log("Server listening on port " + port);
    }
  });
}
exports.start = start;
