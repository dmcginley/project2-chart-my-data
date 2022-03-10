const buttons = ["cat", "dog", "one", "two", "three"];

// buttons created using jQuery
// https://codepen.io/mrsq/pen/jPbBZB
function makeButtons(c) {
  for (var i = 0; i < c.length; i++) {
    $(".button-holder").append(
      "<button value=" + c[i] + ">" + c[i] + "</button>"
    );
  }
}

makeButtons(buttons);
