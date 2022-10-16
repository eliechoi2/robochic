Function converToPlainText(HTML) {
  var tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || "";
}

var htmlString = "robochic";


var str = htmlString.split("");
var el = document.getElementById('str');

(function animate() {
  var running = setTimeout(animate, 100);
  str.length > 0 ? el.innerHTML += str.shift() : clearTimeout(running);

})();
