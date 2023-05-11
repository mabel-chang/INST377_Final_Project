/*
 animations (occur on click to new time): 
https://editor.p5js.org/Milchreis/sketches/euDDMbdjP
demo:
https://editor.p5js.org/Milchreis/full/euDDMbdjP
more code: https://github.com/Milchreis/p5.tween
*/
let count = 0;

//FROM ANIMATE.STYLE
const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);
    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      //event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      console.log("animation has stopped");

      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd);
  });

function initMap(in_long, in_lat){
  const carto = L.map('map').setView([10, 0], 2); //long, lat

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(carto);

  return carto;
}

function rmMarkers(map){  
  map.eachLayer((layer) => {
    if(layer instanceof L.Marker){
      layer.remove();
    }
  });
}

function markerPlace(inLong, inLat, opLong, opLat, map){
  L.marker([opLat, opLong]).addTo(map);
  L.marker([inLat, inLong]).addTo(map);

  //map.fitBounds([[opLat, opLong],[inLat, inLong]]);
  const polyline = L.polyline([[opLat, opLong],[inLat, inLong]], {color: 'black'}).addTo(map);
  // zoom the map to the polyline
  map.fitBounds(polyline.getBounds());
}

function moveThrough(inList, op_list, count){
  const labelList = ['Astronomical Twilight Begins', 'Nautical Twilight Begins', 'Civil Twilight Begins', 'Sunrise', 'Solar Noon', 'Sunset', 'Civil Twilight Ends', 'Nautical Twilight Ends', 'Astronomical Twlight Ends'];
  let op_spec_times = getTime(op_list[count]);
  let in_spec_times = getTime(inList[count]);
  document.getElementById('inHour').innerHTML = in_spec_times.hour; //changing text in clock
  document.getElementById('inMin').innerHTML = in_spec_times.min; //changing text in clock
  document.getElementById('inAMPM').innerHTML = in_spec_times.amPm; //changing text in clock
  document.getElementById('opHour').innerHTML = op_spec_times.hour; //changing text in clock
  document.getElementById('opMin').innerHTML = op_spec_times.min; //changing text in clock
  document.getElementById('opAMPM').innerHTML = op_spec_times.amPm; //changing text in clock

  document.getElementById('label1').innerHTML = labelList[count]; //changing text in label
  document.getElementById('label2').innerHTML = labelList[count]; //changing text in label
}

function getTime(time){
  let amPm = time.substring(time.length-3, time.length);
  time = time.substring(0, time.length-3);
  let getNumbers = time.split(":");
  let min = getNumbers[1];
  let hour = getNumbers[0];
  return {hour, min, amPm};
}
function prevSlide(count){
  if (count <= 0){
    count = 8;
  } else {
    count = count-1;
  }
  return(count);
}

function nextSlide(count){
  if (count >= 8){
    count = 0;
  } else {
   count = count+1;
  }
  return(count);
}

function reorder(list){
  let temp_list = [];
  let out_list = [];

  //remove the quotation marks
  list.forEach((item) => {
    temp_list.push(item.substring(1, item.length-1));
  })
  out_list.push(temp_list[8], temp_list[6], temp_list[4], temp_list[0], temp_list[2], temp_list[1], temp_list[5], temp_list[7], temp_list[9]);
  return out_list;
}

function antipode (in_lat, in_long){
  in_lat = parseFloat(in_lat);
  in_long = parseFloat(in_long);
  const op_lat = Math.abs(in_lat) * -1;
  let op_long = '';
  if (in_long <= 0){
    op_long = in_long + 180;
  } else {
    op_long = in_long - 180;
  }
  return {op_lat, op_long};
}

async function mainEvent() {
  /*DEFINE BUTTONS*/
  const homeButton = document.querySelector('#homeButton');
  const infoButton = document.querySelector('#aboutButton');
  const nextButton = document.querySelector('#nextButton');
  const prevButton = document.querySelector('#prevButton');
  const background = document.querySelector('.wrapper');
  
  const backgroundList = ['aTB', 'nTB', 'cTB', 'sunrise', 'noon', 'sunset', 'cTE', 'nTE', 'aTE'];
  background.classList.add(backgroundList[0]);

  /*BUTTON FUNCTIONALITY*/
  //menu buttons
  homeButton.addEventListener("click", (event) => {//home button
    localStorage.clear(); //ADD THIS LINE TO THE START OF HOME PAGE AS WELL!!!
    location.href="../../";
  })
  infoButton.addEventListener("click", (event) => {//about button
    location.href="./../about";
  })

  /*API CALLS*/
  /*Api call on input*/
  const in_long = localStorage.getItem("in_long"); //get info from submission page
  const in_lat = localStorage.getItem("in_lat"); //get info from submission page

  /*MAP*/
  const carto = initMap(in_long, in_lat);
  rmMarkers(carto);
  
  let inList = [];
  console.log("long = ", in_long, " lat = ", in_lat);
  document.getElementById('long').innerHTML = in_long; //changing text in corrdinates
  document.getElementById('lat').innerHTML = in_lat;//changing text in corrdinates

  const link = 'https://api.sunrise-sunset.org/json?lat='+ in_lat + '&lng=' + in_long; //get link
  const in_results = await fetch(
    link
  );

  const in_currentList = await in_results.json(); //Save the results
  for (var key in in_currentList.results) {
    inList.push(JSON.stringify(in_currentList.results[key]));
  }

  /*Api call on opposite*/
  const{op_lat, op_long} = antipode(in_lat, in_long);
  markerPlace(in_long, in_lat, op_long, op_lat, carto);
  
  let op_list=[];
  console.log("op_long= ", op_long, "op_lat = ", op_lat);
  document.getElementById('opLong').innerHTML = op_long; //changing text in corrdinates
  document.getElementById('opLat').innerHTML = op_lat;//changing text in corrdinates

  const op_link = 'https://api.sunrise-sunset.org/json?lat='+ op_lat + '&lng=' + op_long; //get link
  const op_results = await fetch(
    op_link
  );

  const op_currentList = await op_results.json(); //Save the results
  for (var key in op_currentList.results) {
    op_list.push(JSON.stringify(op_currentList.results[key]));
  }

  /*REORDERED LISTS*/
  inList = reorder(inList);
  op_list = reorder(op_list);

  /*CLOCK AND LABEL*/
  moveThrough(inList, op_list, count);

  /*MOVING THROUGH THE LIST*/
  nextButton.addEventListener("click", () => {
    background.classList.remove(backgroundList[count]);
    count = nextSlide(count);
    animateCSS('.label', 'flipInX');
    animateCSS('.clock', 'flipInX');

    moveThrough(inList, op_list, count);
    background.classList.add(backgroundList[count]);
    console.log("background count", count);
  });
  prevButton.addEventListener("click", () => {
    background.classList.remove(backgroundList[count]);
    count = prevSlide(count);
    animateCSS('.label', 'flipInX');
    animateCSS('.clock', 'flipInX');

    moveThrough(inList, op_list, count);
    background.classList.add(backgroundList[count]);
    console.log("background count", count);
  });
}

document.addEventListener("DOMContentLoaded", async () => mainEvent());