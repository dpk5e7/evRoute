async function init() {
  var elements = document.getElementsByClassName("vehicle-button");

  var addEVtoFleet = async function () {
    var evID = this.getAttribute("data-id");

    const response = await fetch("/api/fleet/", {
      method: "POST",
      body: JSON.stringify({ electric_vehicle_id: evID }),
      headers: { "content-type": "application/json" },
    });

    if (response.ok) {
      alert("Electric Vehicle added successfully to your fleet.");
      document.location.replace("/dashboard");
    } else {
      alert("Failed to save electric vehicle to your fleet.");
    }
  };

  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", addEVtoFleet, false);
  }
}

let scrollerID;
let paused = true;
let speed = 1; // 1 - Fast | 2 - Medium | 3 - Slow
let interval = speed * 2;

function startScroll() {
  let id = setInterval(function () {
    window.scrollBy(0, 2);
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      // Reached end of page
      stopScroll();
    }
  }, interval);
  return id;
}

function stopScroll() {
  clearInterval(scrollerID);
}

document.body.addEventListener(
  "keypress",
  function (event) {
    if (event.which == 13 || event.keyCode == 13) {
      // It's the 'Enter' key
      if (paused == true) {
        scrollerID = startScroll();
        paused = false;
      } else {
        stopScroll();
        paused = true;
      }
    }
  },
  true
);

init();
