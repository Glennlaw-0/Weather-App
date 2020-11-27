//for request from API
class Forecast {
  constructor() {
    this.key = '2shHdy04tGFBmt8sre6z7KyF62mCapQK';
    this.weatherURI =
      'http://dataservice.accuweather.com/currentconditions/v1/';
    this.cityURI =
      'http://dataservice.accuweather.com/locations/v1/cities/search';
  }
  //Get updated city details
  async updateCity(city) {
    const cityDetails = await this.getCity(city);
    const weather = await this.getWeather(cityDetails.Key);
    return {
      cityDetails: cityDetails,
      weather: weather,
    };
  }
  //get weather function
  async getCity(city) {
    const query = `?apikey=${this.key}&q=${city}`;
    const response = await fetch(this.cityURI + query);
    const data = await response.json();
    return data[0];
  }
  // Get city function
  async getWeather(id) {
    const query = `${id}?apikey=${this.key}`;
    const response = await fetch(this.weatherURI + query);
    const data = await response.json();
    return data[0];
  }
}
