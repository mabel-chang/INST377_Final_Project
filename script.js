/* REQS:
Long/lat buttons
As you input the long and lat, the focus of the map moves to where it is
  Only reacts if both fields are filled
  What if one of the feilds get delted?
    maintain position
Reading inputs
parsing HTML
inject HTML?
Need a way that checks that the inforamtion inputted is correctly formatted

Map
As you move along the map, the long and lat changes <-- idk if i can T__T
  not a big deal if you cant
Need a way to store the long and lat that pops up (IDK if i can T__T)
  if not, not a big deal and scrap the functionality of the map

}

Click and have all relvent info now to store the data and load onto a new page*/

function checkLatInput(in_lat){
  if(in_lat == "" || in_lat == null){
    return 2; //no input

  } else {
    const int_in_lat = parseInt(in_lat);

    if(int_in_lat != int_in_lat){ //return true if Nan
      return 0; // failure because the input was string
    } else if(int_in_lat >= -90 && int_in_lat <= 90){
      return 1; // correct input
    } else {
      return 0;
    }
  }
}

function checkLongInput(in_long){
  if(in_long == "" || in_long == null){
    return 2; //no input

  } else {
    const int_in_long = parseInt(in_long);

    if(int_in_long != int_in_long){ //return true if Nan
      return 0; // failure because the input was string
    } else if(int_in_long >= -180 && int_in_long <= 180){
      return 1; // correct input
    } else {
      return 0;
    }
  }
}

//Initiate the map to the default long/lat
function initMap(){
  const carto = L.map('map').setView([38.98, -76.93], 13); //long, lat

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(carto);
  return carto;
}

//Placeing marker onto the map
function markerPlace(in_long, in_lat, map){
  console.log('long and lat for marker', in_long + ", " + in_lat);
  const check_lat = checkLatInput(in_lat);
  const check_long = checkLongInput(in_long);

  if (check_lat == 2){
    in_lat = 0;
  }
  if (check_long == 2){
    in_long = 0;
  }

  map.eachLayer((layer) => {
    if(layer instanceof L.Marker){
      layer.remove();
    }
  });

  L.marker([in_lat, in_long]).addTo(map);
}

function setViewWindow(in_long, in_lat, map){
  console.log('long and lat for marker', in_long + ", " + in_lat);
  const check_lat = checkLatInput(in_lat);
  const check_long = checkLongInput(in_long);
 
  if (check_lat == 2){
    in_lat = 0;
  }
  if (check_long == 2){
    in_long = 0;
  }

  carto = map.setView([in_lat, in_long], 13);

  return carto;
}

async function mainEvent() {
  console.log('localStorage check', localStorage.getItem("storedData"));
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
    location.href="./pages/about";
  })

  /*Take input from text input (long and lat)*/
  inLongitude.addEventListener("input", (event) => {
     /*Hide the error message*/
    errorMessage.style.display = "none";
    console.log("LONG INPUT: ", event.target.value);
    in_long = event.target.value;
    check_long = checkLongInput(in_long);
    check_lat = checkLatInput(in_lat);
    if (check_long > 0 && check_lat > 0){
      console.log(in_long);
      markerPlace(in_long, in_lat, carto);
      setViewWindow(in_long, in_lat, carto);
    } else {
      errorMessage.style.display = "inline-block";
    }
  });
  inLatitidue.addEventListener("input", (event) => {
     /*Hide the error message*/
    errorMessage.style.display = "none";
    console.log("LAT INPUT: ", event.target.value);
    in_lat = event.target.value;
    check_lat = checkLatInput(in_lat);
    check_long = checkLongInput(in_long);
    if (check_lat > 0 && check_long > 0){
      console.log(in_lat);
      markerPlace(in_long, in_lat, carto);
      setViewWindow(in_long, in_lat, carto);
    } else {
      errorMessage.style.display = "inline-block";
    }
  });

  submitButton.addEventListener("click", (event) => {
    console.log("Submit button pushed");
    if (check_long > 0 && check_lat > 0){
      if (check_lat == 2){
        in_lat = 0;
      }
      if (check_long == 2){
        in_long = 0;
      }
      localStorage.setItem("in_long", in_long);
      localStorage.setItem("in_lat", in_lat);
    } else {
      errorMessage.style.display = "inline-block";
    }
    location.href="./pages/tracker";
  })
}

document.addEventListener("DOMContentLoaded", async () => mainEvent());