
document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("search-button");
  const cityInput = document.getElementById("city-input");

  searchButton.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city !== "") {
      getWeather(city);
    }
  });

  cityInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      searchButton.click();
    }
  });
});

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x')
    navbar.classList.toggle('active');
}
