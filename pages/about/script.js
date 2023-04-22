  async function mainEvent() {
    const homeButton = document.querySelector("#homeButton");
   
    homeButton.addEventListener("click", (event) => {
      location.href="../../";
    })
  }
  
  document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests