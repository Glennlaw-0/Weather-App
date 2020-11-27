//for DOM manipulation
const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

// ------------------------------------------------------

const updateUI = (data) => {
  const { cityDetails, weather } = data;

  //update details template
  details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
          <span>${weather.Temperature.Imperial.Value}</span>
          <span>&deg;C</span>
        </div>
 `;

  // update icon
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute('src', iconSrc);

  // update day/night
  let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
  time.setAttribute('src', timeSrc);

  // remove the d-none class if present
  if (card.classList.contains('d-none')) {
    card.classList.remove('d-none');
  }
};

// ----------------------------------------------------

// Event Listener for form
cityForm.addEventListener('submit', (e) => {
  //prevent default action
  e.preventDefault();

  //get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  //update the ui with new city
  forecast
    .updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));

  //set local storage
  localStorage.setItem('city', city);
});

// ----------------------------------------------------

//get local storage info if client already has data in local storage
if (localStorage.getItem('city')) {
  forecast
    .updateCity(localStorage.getItem('city'))
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
}
