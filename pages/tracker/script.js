/*
clock animations (occur on click to new time): 
https://editor.p5js.org/Milchreis/sketches/euDDMbdjP
demo:
https://editor.p5js.org/Milchreis/full/euDDMbdjP
more code: https://github.com/Milchreis/p5.tween
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
*/
/*
keep track of where you are on the scale
in correct order of array
0, 4, 6, 8 <-- start of day
3 <-- noon
5, 7, 9, 3 <-- start of night

*/
/*
center globe to show the two points (unchangeing)
https://github.com/d3/d3-geo/blob/main/README.md#geoInterpolate
world map:
https://observablehq.com/@observablehq/plot-world-map

*/
/*
parse info from API (esp with AM and PM)
*/


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
  const test_sub = document.querySelector("#test_button");
  const homeButton = document.querySelector('#homeButton');
  const infoButton = document.querySelector('#aboutButton');
  const nextButton = document.querySelector()
  
  let info_list = [];
 
  const in_long = localStorage.getItem("in_long");
  const in_lat = localStorage.getItem("in_lat");
 

  console.log("long = ", in_long, " lat = ", in_lat);
  document.getElementById('long').innerHTML = in_long; //changing text
  document.getElementById('lat').innerHTML = in_lat;//changing text

  const link = 'https://api.sunrise-sunset.org/json?lat='+ in_lat + '&lng=' + in_long;

  const results = await fetch(
    link
  );
  const currentList = await results.json();
  for (var key in currentList.results) {
    info_list.push(JSON.stringify(currentList.results[key]));
  }
  console.log(info_list);
  const sunrise = info_list[0];
  const sunset = info_list[1];
  const solarNoon = info_list[2];
  const dayLen = info_list[3]; // day length
  const cTB = info_list[4]; // civil twilight begin and end
  const cTE = info_list[5];
  const nTB = info_list[6]; // nautrical twilight begin and end
  const nTE = info_list[7];
  const aTB = info_list[8]; // astronomical twilight begin and end // dawn
  const aTE = info_list[9]; //dusk

  const{op_lat, op_long} = antipode(in_lat, in_long);

  console.log("op_long= ", op_long, "op_lat = ", op_lat);
  document.getElementById('oplong').innerHTML = op_long; //changing text
  document.getElementById('oplat').innerHTML = op_lat;//changing text

  homeButton.addEventListener("click", () => {
    location.href="../../";
  })
  infoButton.addEventListener("click", () => {
    location.href="./../about";
  })

  test_sub.addEventListener("click", async (submitEvent) => {
    document.getElementById('temp_output').innerHTML = "Sunset Time is: " + sunset; //changing text
  });
}

document.addEventListener("DOMContentLoaded", async () => mainEvent());
