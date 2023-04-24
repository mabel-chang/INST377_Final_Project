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

Submit Button
Response if you submit without putting any information in (standard input needed)
  can you use the api to find this information?
    To do this you would need to run the API first thing as they open the page
    This will get the long and lat of the current location and move the map there
  Can just have a standard long/lat that you will input


}

Click and have all relvent info now to store the data and load onto a new page

Menu Button
*/

/*function injectHTML(list) {
  console.log("fired injectHTML");
  const target = document.querySelector("#restaurant_list");

  target.innerHTML = "";
  list.forEach((item) => {
    const str = `<li>${item.name}</li>`;
    target.innerHTML += str;
  });
}*/

/*function filterList(list, query) {
  return list.filter((item) => {
    const lowerCaseName = item.name.toLowerCase();
    const lowerCaseQuery = query.toLowerCase();

    return lowerCaseName.includes(lowerCaseQuery);
  });
}*/

/*function cutRestaurantList(list) {
  console.log("fired cut list");
  const range = [...Array(15).keys()];

  return (newArray = range.map((item) => {
    const index = getRandomIntInclusive(0, list.length - 1);
    return list[index];
  }));
}*/

/*function markerPlace(array, map){
  console.log('array for markers', array);
  
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      layer.remove();
    }
  });

  array.forEach((item) => {
    console.log('markerPlace', item);
    if (item.geocoded_column_1){
      const {coordinates} = item.geocoded_column_1;
      L.marker([coordinates[1], coordinates[0]]).addTo(map);
    }
  })
}

function setViewWindow(array, map){
  console.log('Lat and long: ', array[0]);
  let carto = map;

  if (array[0].geocoded_column_1){
    const {coordinates} = array[0].geocoded_column_1;
    carto = map.setView([coordinates[1], coordinates[0]], 13); //long, lat
  } else {
    carto = map.setView([38.98, -76.93], 13); // set view to college park
  }
  
  return carto;
}
*/

function check_response(in_long, in_lat){
  let c = 0;
  if(in_long >= -180 && in_long <= 180){
    c = c+1;
  }
  if(in_lat >= -90 && in_long <= 90){
    c = c+2;
  }
  if(c==3){
    return 3;
  } else if (c==1){ //correct long
    return 1;
  } else if (c==2){ //correct lat
    return 2;
  } else {
    return 0;
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

async function mainEvent() {
  console.log('localStorage check', localStorage.getItem("storedData"));
  const aboutButton = document.querySelector("#aboutButton");
  const inLongitude = document.querySelector("#in_long");
  const inLatitidue = document.querySelector("#in_lat");
  const submitButton = document.querySelector("#submit");
  const errorMessage = document.querySelector("#error_message");
  let in_lat;
  let in_long;

  /*Hide the error message*/
  errorMessage.style.display = "none";

  /*Initiate the map*/
  const carto = initMap();

  /*Set up About button*/
  aboutButton.addEventListener("click", (event) => {
    location.href="./pages/about";
  })

  /*Take input from text input (long and lat)*/
  inLongitude.addEventListener("input", (event) => {
    console.log("LONG INPUT: ", event.target.value);
    in_long = event.target.value;

  });
  inLatitidue.addEventListener("input", (event) => {
    console.log("LAT INPUT: ", event.target.value);
    in_lat = event.target.value;

    const checker = check_response(in_long, in_lat);
    if (checker >= 2){

    }
  });

  submitButton.addEventListener("click", (event) => {
    /*console.log("Submit button pushed");
    const checker = check_response(in_long, in_lat);
    if(checker == 3){
      localStorage.setItem('in_long', in_long);
      localStorage.setItem('in_lat', in_lat);

    } else {
      errorMessage.classList.remove="hidden";
    }*/
    location.href="./pages/tracker";
  })

 /* submitButton.addEventListener("click", async (submitEvent) => {
    console.log("Loading Data");
    
    location.href="./pages/tracker";
    const results = await fetch(
      "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json"
    );
    const storedList = await results.json();

    localStorage.setItem("storedData", JSON.stringify(storedList));
    parsedData = storedList;

    if(storedList?.length > 0){
      generateListButton.classList.remove("hidden");
    }

    // consoe.tabe(storedist);
  });*/

  /*const storedData = localStorage.getItem("storedData");

  let parsedData = JSON.parse(storedData);

  if (parsedData?.length > 0) {
    generateListButton.classList.remove("hidden");
  }
  


  submitButton.addEventListener("click", async (submitEvent) => {
    console.log("Loading Data");
    window.location.href="./pages/tracker";
    const results = await fetch(
      "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json"
    );
    const storedList = await results.json();

    localStorage.setItem("storedData", JSON.stringify(storedList));
    parsedData = storedList;

    if(storedList?.length > 0){
      generateListButton.classList.remove("hidden");
    }

    loadAnimation.style.display = "none";
    // consoe.tabe(storedist);
  });*/
}

document.addEventListener("DOMContentLoaded", async () => mainEvent());