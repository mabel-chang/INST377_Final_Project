/*function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function injectHTML(list) {
  console.log("fired injectHTML");
  const target = document.querySelector("#restaurant_list");

  target.innerHTML = "";
  list.forEach((item) => {
    const str = `<li>${item.name}</li>`;
    target.innerHTML += str;
  });
}

function filterList(list, query) {
  return list.filter((item) => {
    const lowerCaseName = item.name.toLowerCase();
    const lowerCaseQuery = query.toLowerCase();

    return lowerCaseName.includes(lowerCaseQuery);
  });
}

function cutRestaurantList(list) {
  console.log("fired cut list");
  const range = [...Array(15).keys()];

  return (newArray = range.map((item) => {
    const index = getRandomIntInclusive(0, list.length - 1);
    return list[index];
  }));
}

function initMap(){
  const carto = L.map('map').setView([38.98, -76.93], 13); //long, lat

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(carto);
  return carto;
}

function markerPlace(array, map){
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
  console.log('First Resto: ', array[0]);
  let carto = map;

  if (array[0].geocoded_column_1){
    const {coordinates} = array[0].geocoded_column_1;
    carto = map.setView([coordinates[1], coordinates[0]], 13); //long, lat
  } else {
    carto = map.setView([38.98, -76.93], 13); // set view to college park
  }
  
  return carto;
}*/

async function mainEvent() {
  //console.log('long and lat check', localStorage.getItem("__"));
  const test_sub = document.querySelector("#test_button");

  //const in_long = localStorage.getItem("");
  //const in_lat = localStorage.getItem("");
  //var in_long = localStorage.getItem("");
  //var in_lat = localStorage.getItem("");
  let test_long = "-15.23456";
  let test_lat = "10.123456";
  const link = "https://api.sunrise-sunset.org/json?lat=${test_lat}&lng=${?{test_long}}";
  let sunsetTime ='';
  let info_list = [];

  test_sub.addEventListener("click", async (submitEvent) => {
    console.log("API fetch");

    //loadAnimation.style.display = "inline-block";
    const results = await fetch(
      link
    );
    //const results = await fetch(link);

    const currentList = await results.json();
    //const anoutherList = localStorage.setItem("storedData", JSON.stringify(currentList));
    //let parsedList = JSON.parse(anoutherList);

    //let sunset = parsed.find("sunset");

    //console.log("worked T__T: " + sunset);
    //console.log("Test: " + JSON.stringify(currentList.results));

    for (var key in currentList.results) {
      info_list.push(JSON.stringify(currentList.results[key]));
    }
    console.log(info_list);
    sunsetTime = info_list[9];
    document.getElementById('temp_output').innerHTML = "Sunset Time is: " + sunsetTime;
  //   for (var key in p) {
  //     if (p.hasOwnProperty(key)) {
  //         console.log(key + " -> " + p[key]);
  //     }
  // }

    //localStorage.setItem("storedData", JSON.stringify(storedList));
    //parsedData = storedList;
    /*if(storedList?.length > 0){
      generateListButton.classList.remove("hidden");
    }
    loadAnimation.style.display = "none";*/
  });

  /*generateListButton.addEventListener("click", (event) => {
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
