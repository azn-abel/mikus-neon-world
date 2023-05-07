var currentIdx = 0;

function burgerClick() {
    console.log("ello");
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
      console.log("1");
    } else {
      x.style.display = "block";
      console.log("2");
    }
  }