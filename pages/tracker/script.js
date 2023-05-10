/*
 animations (occur on click to new time): 
https://editor.p5js.org/Milchreis/sketches/euDDMbdjP
demo:
https://editor.p5js.org/Milchreis/full/euDDMbdjP
more code: https://github.com/Milchreis/p5.tween
*/
/*
center globe to show the two points (unchangeing)
https://github.com/d3/d3-geo/blob/main/README.md#geoInterpolate
world map:
https://observablehq.com/@observablehq/plot-world-map
*/
/*
Background gradient
CSS:
background: radial-gradient(#FFFEFF, #FFEEC9, #FED6BA, #E2EFF7, #D0C9D1); <-- sunrise
background: radial-gradient(#FE975A, #FF7F96, #CF739A, #703575, #220E4A); <-- sunset
background: radial-gradient(#FFFFFF, #E7EBEB, #C3D1E0, #A2C6DA, #79BEDB); <-- solar noon
background: radial-gradient(#F7E3C8, #F4E9E7, #DFD5D6, #CBC8DD, #9BA4DB); <-- Dawn
background: radial-gradient(#D09263, #C3A186, #7A848E, #355169, #072132); <-- Dusk

transition between gradients:
https://stackoverflow.com/questions/6542212/use-css3-transitions-with-gradient-backgrounds

Transition through the array

in correct order of array
(dawn)8, 6, 4, 0 <-- start of day //CHANGE ORDER BELOWWWWW!!!!
2 <-- noon
(sunset)1, 5, 7, 9 (dusk)

  /*const sunrise = info_list[0];
  const sunset = info_list[1];
  const solarNoon = info_list[2];
  const cTB = info_list[4]; // civil twilight begin and end
  const cTE = info_list[5];
  const nTB = info_list[6]; // nautrical twilight begin and end
  const nTE = info_list[7];
  const aTB = info_list[8]; // astronomical twilight begin and end // dawn
  const aTE = info_list[9]; //dusk/*
*/
let count = 0;

function clockAnimation(){

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
  console.log("current count", count);
  if (count <= 0){
    count = 8;
  } else {
    count = count-1;
  }
  console.log("new count",count);
  return(count);
}

function nextSlide(count){
  console.log("current count", count);
  if (count >= 8){
    count = 0;
  } else {
   count = count+1;
  }
  console.log("new count",count);
  return(count);
}

function reorder(list){ //CHECK ORDER!!!!!!!!!!!!! AELIUGHLDUGHSUEASDFGDJSKSJHGFDFGHJDKFLVGIUFHDGBENG
  let temp_list = [];
  let out_list = [];

  //remove the quotation marks
  list.forEach((item) => {
    temp_list.push(item.substring(1, item.length-1));
  })

  out_list.push(temp_list[0], temp_list[4], temp_list[6], temp_list[8], temp_list[2], temp_list[5], temp_list[7], temp_list[9], temp_list[1]);
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
  console.log(inList);

  /*Api call on opposite*/
  const{op_lat, op_long} = antipode(in_lat, in_long);
  
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
  console.log(op_list);

  /*REORDERED LISTS*/
  inList = reorder(inList);
  console.log("reordered", inList);
  op_list = reorder(op_list);
  console.log("reordered", op_list);

  /*CLOCK*/
  moveThrough(inList, op_list, count);

  /*BACKGROUND*/

  /*MOVING THROUGH THE LIST*/
  nextButton.addEventListener("click", () => {
    background.classList.remove(backgroundList[count]);

    count = nextSlide(count);
    moveThrough(inList, op_list, count);
    background.classList.add(backgroundList[count]);
    console.log("background count", count);
  });
  prevButton.addEventListener("click", () => {
    background.classList.remove(backgroundList[count]);

    count = prevSlide(count);
    moveThrough(inList, op_list, count);
    background.classList.add(backgroundList[count]);
    console.log("background count", count);
  });
}

document.addEventListener("DOMContentLoaded", async () => mainEvent());