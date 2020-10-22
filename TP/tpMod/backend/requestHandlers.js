var exec = require("child_process").exec;
var exec__option = {
  timeout: 10000,
  maxBuffer: 20000 * 1024,
};
function start(response) {
  console.log("Request handler 'start' was called.");
  setTimeout(function () {
    response.send('<h1>Hello Start!</h1>')
  }, 60000);
}
function find(response) {
  console.log("Request handler 'start' was called.");
  exec("find /", exec__option, function (error, stdout, stderr) {
    response.send(stdout)
  });
}
function upload(response) {
  console.log("Request handler 'upload' was called.");
  response.send('<h1>Hello Upload!</h1>')
}
function show(response) {
  console.log("Request handler 'show' was called.");
  response.send('<h1>Hello Show!</h1>')
}
function login(response) {
  console.log("Request handler 'login' was called.");
  response.send('<h1>Hello LogIn!</h1>')
}
function logout(response) {
  console.log("Request handler 'logout' was called.");
  response.send('<h1>Hello LogOut!</h1>');
}
exports.start = start;
exports.upload = upload;
exports.find = find;
exports.show = show;
exports.login = login;
exports.logout = logout;
