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

//Initiate the map to the default long/lat
function initMap(){
  const carto = L.map('map').setView([38.98, -76.93], 13); //long, lat

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(carto);
  return carto;
}

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

async function mainEvent() {
  console.log('localStorage check', localStorage.getItem("storedData"));
  const aboutButton = document.querySelector("#aboutButton");

  const inLongitude = document.querySelector("#in_long");
  const inLatitidue = document.querySelector("#in_lat");
  const submitButton = document.querySelector("#submit");
  
  aboutButton.addEventListener("click", (event) => {
    location.href="./pages/about";
  })

  const carto = initMap();

  /*const storedData = localStorage.getItem("storedData");

  let parsedData = JSON.parse(storedData);

  if (parsedData?.length > 0) {
    generateListButton.classList.remove("hidden");
  }
  
  localStorage.setItem('in_long', );
  localStorage.setItem('in_lat', );

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
  });

  generateListButton.addEventListener("click", (event) => {
    console.log("generate new list");
    currentList = cutRestaurantList(parsedData);
    console.log(currentList);
    injectHTML(currentList);
    markerPlace(currentList, carto);
    setViewWindow(currentList, carto);
  });

  textField.addEventListener("input", (event) => {
    console.log("INPUT", event.target.value);
    const newList = filterList(currentList, event.target.value);
    
    injectHTML(newList);
    console.log(newList);
    markerPlace(newList, carto);
    setViewWindow(newList, carto);
  });

  clearDataButton.addEventListener("click", (event) => {
    console.log('clear browser data');
    localStorage.clear();
    console.log('localStorage check', localStorage.getItem("storedData"));
    generateListButton.classList.add("hidden");
  })*/
}

document.addEventListener("DOMContentLoaded", async () => mainEvent());