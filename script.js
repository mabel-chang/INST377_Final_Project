/*Check that the inputs are valid*/
function checkLatInput(in_lat) {
  if (in_lat == "" || in_lat == null) {
    return 2; //no input
  } else {
    const int_in_lat = parseInt(in_lat);

    if (int_in_lat != int_in_lat) {
      //return true if Nan
      return 0; // failure because the input was string
    } else if (int_in_lat >= -90 && int_in_lat <= 90) {
      return 1; // correct input
    } else {
      return 0;
    }
  }
}
function checkLongInput(in_long) {
  if (in_long == "" || in_long == null) {
    return 2; //no input
  } else {
    const int_in_long = parseInt(in_long);

    if (int_in_long != int_in_long) {
      //return true if Nan
      return 0; // failure because the input was string
    } else if (int_in_long >= -180 && int_in_long <= 180) {
      return 1; // correct input
    } else {
      return 0;
    }
  }
}

/*MAP*/
//Initiate the map to the default
function initMap() {
  const carto = L.map("map").setView([10, 0], 2); //long, lat

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(carto);
  return carto;
}
//Place marker onto the map
function markerPlace(in_long, in_lat, map) {
  console.log("long and lat for marker", in_long + ", " + in_lat);
  const check_lat = checkLatInput(in_lat);
  const check_long = checkLongInput(in_long);

  if (check_lat == 2) {
    in_lat = 0;
  }
  if (check_long == 2) {
    in_long = 0;
  }

  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      layer.remove();
    }
  });

  L.marker([in_lat, in_long]).addTo(map);
}
//Set the inital view window
function setViewWindow(in_long, in_lat, map) {
  console.log("long and lat for marker", in_long + ", " + in_lat);
  const check_lat = checkLatInput(in_lat);
  const check_long = checkLongInput(in_long);

  if (check_lat == 2) {
    in_lat = 0;
  }
  if (check_long == 2) {
    in_long = 0;
  }

  carto = map.setView([in_lat, in_long], 3);

  return carto;
}

async function mainEvent() {
  //localStorage update
  console.log("localStorage check", localStorage.getItem("storedData"));
  localStorage.clear();

  const aboutButton = document.querySelector("#aboutButton");
  const inLongitude = document.querySelector("#in_long");
  const inLatitidue = document.querySelector("#in_lat");
  const submitButton = document.querySelector("#submit");
  const errorMessage = document.querySelector("#error_message");
  let in_lat;
  let in_long;
  let check_lat;
  let check_long;

  /*Hide the error message*/
  errorMessage.style.display = "none";

  /*Initiate the map*/
  const carto = initMap();

  /*Set up About button*/
  aboutButton.addEventListener("click", () => {
    location.href = "./pages/about";
  });

  /*Take input from text input (long and lat)*/
  inLatitidue.addEventListener("input", (event) => {
    /*Hide the error message*/
    errorMessage.style.display = "none";
    console.log("LAT INPUT: ", event.target.value);
    in_lat = event.target.value;
    check_lat = checkLatInput(in_lat);
    check_long = checkLongInput(in_long);
    if (check_lat > 0 && check_long > 0) {
      console.log(in_lat);
      markerPlace(in_long, in_lat, carto);
      setViewWindow(in_long, in_lat, carto);
    } else {
      errorMessage.style.display = "inline-block";
    }
  });
  inLongitude.addEventListener("input", (event) => {
    /*Hide the error message*/
    errorMessage.style.display = "none";
    console.log("LONG INPUT: ", event.target.value);
    in_long = event.target.value;
    check_long = checkLongInput(in_long);
    check_lat = checkLatInput(in_lat);
    if (check_long > 0 && check_lat > 0) {
      console.log(in_long);
      markerPlace(in_long, in_lat, carto);
      setViewWindow(in_long, in_lat, carto);
    } else {
      errorMessage.style.display = "inline-block";
    }
  });

  /*Submission button*/
  submitButton.addEventListener("click", (event) => {
    console.log("Submit button pushed");
    if (check_long > 0 && check_lat > 0) {
      if (check_lat == 2) {
        in_lat = 0;
      }
      if (check_long == 2) {
        in_long = 0;
      }
      localStorage.setItem("in_long", in_long);
      localStorage.setItem("in_lat", in_lat);
      location.href = "./pages/tracker";
    } else {
      errorMessage.style.display = "inline-block";
    }
  });
}

document.addEventListener("DOMContentLoaded", async () => mainEvent());
