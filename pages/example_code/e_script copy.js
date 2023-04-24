function getRandomIntInclusive(min, max) {
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
    }/*
getting the PM or AM from the number:
  to convert into datetime and integers:
    hms = the api output
      remove am/pm:
        new_hms = hms.subtring(0, hms.length-3)
      add an extra zero in front:
        if(new_hms.length != 8){
          new_hms = "0" + new_hms;
        }
    var target = new Date("1970-01-01T" + hms)
  hms.substring(hms.length-2, hms.llength-1)); <-- gets you the second to last characted(p or m)

  get night lenght
 minus 23:59:60
  */
/* A quick filter that will return something based on a matching input */
function calculateLengthOfNight(dayLength) {
  
}

async function mainEvent() { // the async keyword means we can make API requests
  const mainForm = document.querySelector('.main_form'); // This class name needs to be set on your form before you can listen for an event on it
  const filterButton = document.querySelector('.filter_button');
  let currentList = []; // this is "scoped" to the main event function
  
  /* We need to listen to an "event" to have something happen in our page - here we're listening for a "submit" */
  mainForm.addEventListener('submit', async (submitEvent) => { // async has to be declared on every function that needs to "await" something
    
    // This prevents your page from becoming a list of 1000 records from the county, even if your form still has an action set on it
    submitEvent.preventDefault(); 
    
    // this is substituting for a "breakpoint" - it prints to the browser to tell us we successfully submitted the form
    console.log('form submission'); 

    /*
      *************TESTING if you can use a variable for the link
    */
    let rando = '.json';
    let link = `https://data.princegeorgescountymd.gov/resource/umjn-t2iz${rando}`;

    // *************This replaces the form Action
    const results = await fetch(link);

    // This changes the response from the GET into data we can use - an "object"
    currentList = await results.json();

    /*
      This array initially contains all 1,000 records from your request,
      but it will only be defined _after_ the request resolves - any filtering on it before that
      simply won't work.
    */
    console.table(currentList); 
  });

  filterButton.addEventListener('click', (event) => {
    console.log("clicked FilterButton");
  
    /*
    Now that you HAVE a list loaded, write an event listener set to your filter button
    it should use the 'new FormData(target-form)' method to read the contents of your main form
    and the Object.fromEntries() method to convert that data to an object we can work with
  */
    const formData = new FormData(mainForm);
    const formProps = Object.fromEntries(formData);

    console.log(formProps);
    const newList = filterList(currentList, formProps.resto);

    console.log(newList);
  })
}

/*
  This adds an event listener that fires our main event only once our page elements have loaded
  The use of the async keyword means we can "await" events before continuing in our scripts
  In this case, we load some data when the form has submitted
*/
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
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
}

async function mainEvent() {
  console.log('localStorage check', localStorage.getItem("storedData"));
  const mainForm = document.querySelector(".main_form");
  const loadDataButton = document.querySelector("#data_load");
  const generateListButton = document.querySelector("#generate");
  const textField = document.querySelector("#resto");
  const clearDataButton = document.querySelector("#data_clear");
  const loadAnimation = document.querySelector("#data_load_animation");
  
  loadAnimation.style.display = "none";
  generateListButton.classList.add("hidden");

  const carto = initMap();

  const storedData = localStorage.getItem("storedData");
  let parsedData = JSON.parse(storedData);
  if (parsedData?.length > 0) {
    generateListButton.classList.remove("hidden");
  }

  let currentList = [];

  loadDataButton.addEventListener("click", async (submitEvent) => {
    console.log("Loading Data");
    loadAnimation.style.display = "inline-block";
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
  })
}

document.addEventListener("DOMContentLoaded", async () => mainEvent());