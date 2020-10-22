var exec = require("child_process").exec;

var exec__option = {
  timeout: 10000,
  maxBuffer: 20000 * 1024,
};
function start(res) {
  console.log("Request handler 'start' was called.");
  setTimeout(function () {
        res.send("Hello start");
  }, 60000);
}
function find(res) {
  console.log("Request handler 'start' was called.");
  exec("find /", exec__option, function (error, stdout, stderr) {
    res.send(stdout);
  });
}
function upload(res) {
  console.log("Request handler 'upload' was called.");

}
function show(res) {
  console.log("Request handler 'show' was called.");
  res.send("Hello show");
}
function login(res) {
  console.log("Request handler 'login' was called.");
  res.send('wwww');

}
function logout(res) {
  console.log("Request handler 'logout' was called.");
  res.send("Hello logout");
}
exports.start = start;
exports.upload = upload;
exports.find = find;
exports.show = show;
exports.logout = logout;
