function route(handle, pathname, response) {
  console.log("About to route a request for " + pathname);
  if (typeof handle[pathname] === "function") {
    return handle[pathname](response);
  } else {
    console.log("No request handler found for " + pathname);
    response.writeHead(404, { "Content-Type": "text/html" });
    response.write("404 Error : Resource Not Found ");
    response.end();
  }
}
exports.route = route;
