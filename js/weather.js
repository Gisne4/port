//Common response
//{
//   "lat":33.44,
//   "lon":-94.04,
//   "timezone":"America/Chicago",
//   "timezone_offset":-18000,
//   "current":{
//      "dt":1684929490,
//      "sunrise":1684926645,
//      "sunset":1684977332,
//      "temp":292.55,
//      "feels_like":292.87,
//      "pressure":1014,
//      "humidity":89,
//      "dew_point":290.69,
//      "uvi":0.16,
//      "clouds":53,
//      "visibility":10000,
//      "wind_speed":3.13,
//      "wind_deg":93,
//      "wind_gust":6.71,
//      "weather":[
//         {
//            "id":803,
//            "main":"Clouds",
//            "description":"broken clouds",
//            "icon":"04d"
//         }
//      ]
//   },
//   "minutely":[
//      {
//         "dt":1684929540,
//         "precipitation":0
//      },
//      ...
//   ],
//   "hourly":[
//      {
//         "dt":1684926000,
//         "temp":292.01,
//         "feels_like":292.33,
//         "pressure":1014,
//         "humidity":91,
//         "dew_point":290.51,
//         "uvi":0,
//         "clouds":54,
//         "visibility":10000,
//         "wind_speed":2.58,
//         "wind_deg":86,
//         "wind_gust":5.88,
//         "weather":[
//            {
//               "id":803,
//               "main":"Clouds",
//               "description":"broken clouds",
//               "icon":"04n"
//            }
//         ],
//         "pop":0.15
//      },
//      ...
//   ],
//   "daily":[
//      {
//         "dt":1684951200,
//         "sunrise":1684926645,
//         "sunset":1684977332,
//         "moonrise":1684941060,
//         "moonset":1684905480,
//         "moon_phase":0.16,
//         "summary":"Expect a day of partly cloudy with rain",
//         "temp":{
//            "day":299.03,
//            "min":290.69,
//            "max":300.35,
//            "night":291.45,
//            "eve":297.51,
//            "morn":292.55
//         },
//         "feels_like":{
//            "day":299.21,
//            "night":291.37,
//            "eve":297.86,
//            "morn":292.87
//         },
//         "pressure":1016,
//         "humidity":59,
//         "dew_point":290.48,
//         "wind_speed":3.98,
//         "wind_deg":76,
//         "wind_gust":8.92,
//         "weather":[
//            {
//               "id":500,
//               "main":"Rain",
//               "description":"light rain",
//               "icon":"10d"
//            }
//         ],
//         "clouds":92,
//         "pop":0.47,
//         "rain":0.15,
//         "uvi":9.23
//      },
//      ...
//   ],
//    "alerts": [
//    {
//      "sender_name": "NWS Philadelphia - Mount Holly (New Jersey, Delaware, Southeastern Pennsylvania)",
//      "event": "Small Craft Advisory",
//      "start": 1684952747,
//      "end": 1684988747,
//      "description": "...SMALL CRAFT ADVISORY REMAINS IN EFFECT FROM 5 PM THIS\nAFTERNOON TO 3 AM EST FRIDAY...\n* WHAT...North winds 15 to 20 kt with gusts up to 25 kt and seas\n3 to 5 ft expected.\n* WHERE...Coastal waters from Little Egg Inlet to Great Egg\nInlet NJ out 20 nm, Coastal waters from Great Egg Inlet to\nCape May NJ out 20 nm and Coastal waters from Manasquan Inlet\nto Little Egg Inlet NJ out 20 nm.\n* WHEN...From 5 PM this afternoon to 3 AM EST Friday.\n* IMPACTS...Conditions will be hazardous to small craft.",
//      "tags": [

//      ]
//    },
//    ...
//  ]

document.addEventListener("DOMContentLoaded", function () {
  // Use Geolocation class to get location
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          getWeather(latitude, longitude);
        },
        (error) => {
          //try to catch error prevent to blow my site
          console.error("Error getting location:", error);
          document.getElementById("time").textContent = "Location Error";
          document.getElementById("location").textContent = "Location Error";
          document.getElementById("temperature").textContent = "Location Error";
          document.getElementById("description").textContent = "Location Error";
          document.getElementById("wind").textContent = "Location Error";
          document.getElementById("pressure").textContent = "Location Error";
          document.getElementById("humidity").textContent = "Location Error";
          document.getElementById("dewpoint").textContent = "Location Error";
          document.getElementById("visibility").textContent = "Location Error";
        }
      );
    } else {
      document.getElementById("time").textContent = "No Geolocation";
      document.getElementById("location").textContent = "No Geolocation";
      document.getElementById("temperature").textContent = "No Geolocation";
      document.getElementById("description").textContent = "No Geolocation";
      document.getElementById("wind").textContent = "No Geolocation";
      document.getElementById("pressure").textContent = "No Geolocation";
      document.getElementById("humidity").textContent = "No Geolocation";
      document.getElementById("dewpoint").textContent = "No Geolocation";
      document.getElementById("visibility").textContent = "No Geolocation";
    }
  }

  function getWeather(latitude, longitude) {
    const apiKey = "b1b15e88fa797225412429c1c50c122a1"; // This api was for free never mind~~!! that was not my apiKey LoL
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        //current time
        document.getElementById("time").textContent =
          new Date().toLocaleTimeString("en-US");

        document.getElementById(
          "location"
        ).textContent = `${data.name.toUpperCase()}, ${data.sys.country}`;

        document.getElementById(
          "temperature"
        ).textContent = `${data.main.temp}°C`;

        //descript outer weather
        document.getElementById("description").textContent = `Feels like ${
          data.main.feels_like
        }°C. ${data.weather[0].description}. ${
          data.wind.speed
        }m/s ${getWindDirection(data.wind.deg)}`;

        //wind speed
        document.getElementById("wind").textContent = `${
          data.wind.speed
        }m/s ${getWindDirection(data.wind.deg)}`;

        //pressure
        document.getElementById(
          "pressure"
        ).textContent = `${data.main.pressure}hPa`;

        //humidity
        document.getElementById(
          "humidity"
        ).textContent = `${data.main.humidity}%`;

        //this one make me mad
        document.getElementById("dewpoint").textContent = `${calculateDewPoint(
          data.main.temp,
          data.main.humidity
        )}°C`;

        //visibility , and don't forget toFixed(1) method for sure make the number display as 00.0
        document.getElementById("visibility").textContent = `${(
          data.visibility / 1000
        ).toFixed(1)}km`;

        //make sure of weather condition icon computed svg
        const iconCode = data.weather[0].icon;

        //for png that was the template of climate apps (may be??)
        //const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        const iconSvgPath = getIconSvgPath(iconCode);
        document.getElementById("weather-icon-svg").innerHTML = iconSvgPath;

        //let windirection be right
        updateWindDirection(data.wind.deg);

        //fore cast!
        initializeWeatherForecast(latitude, longitude);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        document.getElementById("time").textContent = "Error";
        document.getElementById("location").textContent = "Error";
        document.getElementById("temperature").textContent = "Error";
        document.getElementById("description").textContent = "Error";
        document.getElementById("wind").textContent = "Error";
        document.getElementById("pressure").textContent = "Error";
        document.getElementById("humidity").textContent = "Error";
        document.getElementById("dewpoint").textContent = "Error";
        document.getElementById("visibility").textContent = "Error";
      });
  }

  //let make the forecast!
  async function fetchForecast(latitude, longitude) {
    const apiKey = "b1b15e88fa797225412429c1c50c122a1";
    //fortunately we have forecast api for free! check the Docs out!
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching forecast:", error);
      return null;
    }
  }

  function fuxkingForecast(dayData) {
    const dayList = document.getElementById("forecast");
    dayList.innerHTML = ""; // Clear existing list

    //just for .con2 videos
    const forecastId = [];

    // Group forecast data by day
    const dailyForecasts = {};

    dayData.list.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      //Check dailyForecasts[date] exist
      if (!dailyForecasts[date]) {
        dailyForecasts[date] = [];
      }
      dailyForecasts[date].push(item);
    });

    // Iterate through each day's forecast
    for (const date in dailyForecasts) {
      let highTemp = -Infinity;
      let lowTemp = Infinity;
      let dayName = "";
      let weatherIcon = "";
      let weatherDescription = "";

      //for date
      dailyForecasts[date].forEach((forecast, index) => {
        highTemp = Math.max(highTemp, forecast.main.temp_max);
        lowTemp = Math.min(lowTemp, forecast.main.temp_min);

        // Use the data from the first forecast of the day for dayName, icon, and description
        if (index === 0) {
          const dateObj = new Date(forecast.dt * 1000);
          dayName = dateObj.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          });

          // replace n to d
          weatherIcon = forecast.weather[0].icon.replace(/n/g, "d");
          weatherDescription = forecast.weather[0].description;
          forecastId.push(forecast.weather[0].id);
        }
      });

      const listItem = document.createElement("li");
      listItem.innerHTML = `
          <span>${dayName}</span>
          <div class="day-values">
            <img src="https://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather Icon">
            <p>${Math.round(highTemp)} / ${Math.round(lowTemp)}°C</p>
          </div>
          <span class="sub" style="width: 70px; text-align: right;">${weatherDescription}</span>
        `;
      dayList.appendChild(listItem);
    }
    // Add accordion functionality after the list is populated
    const dayItems = dayList.querySelectorAll("li");

    // All that cuz Group 7xx: Atmosphere!
    function getForecastId(i) {
      let weatherID = forecastId[i];
      let condition;
      if (weatherID >= 200 && weatherID < 300) {
        condition = `thunderstorm`; //done
      } else if (weatherID >= 300 && weatherID < 400) {
        condition = `drizzle`; //done
      } else if (weatherID >= 500 && weatherID < 600) {
        condition = `rain`; //done
      } else if (weatherID >= 600 && weatherID < 700) {
        condition = `snow`; //done
      } else if (weatherID >= 700 && weatherID < 800) {
        condition = `mist`; //done
      } else if (weatherID == 800) {
        condition = `clear`; //done
      } else if (weatherID >= 801 && weatherID < 900) {
        condition = `clouds`; //done
      }
      return condition;
    }

    dayItems.forEach((item) => {
      item.addEventListener("click", function () {
        dayItems.forEach((li) => li.classList.remove("active"));
        this.classList.add("active");
        document
          .getElementById("weather_bg_video")
          .setAttribute("src", `video/${getForecastId($(this).index())}.mp4`);
      });
    });

    // Optionally activate the first item on load
    if (dayItems.length > 0) {
      dayItems[0].classList.add("active");
      document
        .getElementById("weather_bg_video")
        .setAttribute("src", `video/${getForecastId(0)}.mp4`);
    }
  }

  // For oneday 24hour forecast
  function doEasyThings(eightfore) {
    const on24hour = [];
    const easyFore = document.getElementById("easyFore");
    easyFore.innerHTML = "";

    // All that cuz the weather API Json just call the 40list per 3hour, then i just wanna 24hours forecast, 24/3 = 8
    for (let i = 0; i < 8; i++) {
      on24hour.push(eightfore.list[i]);
    }
    on24hour.forEach((element) => {
      const dateObj = new Date(element.dt * 1000);
      //this fuxking shit doesn't want to seperate with dd-mm-yyyy format, so i just sliced this fuxking shit!!!
      const dateH = dateObj.toLocaleDateString("en-US", {
        hour: "2-digit",
        hour12: "false",
      });
      const dateHAdjust = dateH.slice(10, 16);
      const dateD = dateObj.toLocaleDateString("en-US", {
        day: "numeric",
      });
      const easyList = document.createElement("li");
      easyList.innerHTML = `
          <span>${dateD}日</span><span>${dateHAdjust}</span>
          <div class="one-day-values">
            <img src="https://openweathermap.org/img/wn/${
              element.weather[0].icon
            }.png" alt="Weather Icon">
            <span>${Math.round(element.main.temp_max)} / ${Math.round(
        element.main.temp_min
      )}°C</span>
          </div>
          <span class="des" style="width: 70px;">${
            element.weather[0].description
          }</span>
        `;
      easyFore.appendChild(easyList);
    });
  }

  //use async for forecast
  async function initializeWeatherForecast(latitude, longitude) {
    const dayData = await fetchForecast(latitude, longitude);
    if (dayData) {
      fuxkingForecast(dayData);
      doEasyThings(dayData);
    }
  }

  function getWindDirection(degrees) {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    //360 divide 8 portion and %8 prevent error
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  }

  //a function for diriction of svg rotate
  function updateWindDirection(degrees) {
    const windDirectionSvg = document.getElementById("wind-direction");
    if (windDirectionSvg) {
      windDirectionSvg.style.transform = `rotate(${degrees}deg)`;
      windDirectionSvg.style.transition = "transform 0.3s linear";
    }
  }

  //https://github.com/nicolasgrancher/weather-js/blob/master/js/weather.js
  // That was to complicate thing....shit
  function calculateDewPoint(temp, humidity) {
    const a = 17.27;
    const b = 237.7;
    const alpha = (a * temp) / (b + temp) + Math.log(humidity / 100.0);
    const dewPoint = (b * alpha) / (a - alpha);
    return dewPoint.toFixed(1);
  }

  function getIconSvgPath(iconCode) {
    //implement something, and i have no idea for solve this shit
    //luckly AI helped me to solve this problem, how delightful!!!
    return `<path d="M110.117 74c0 19.947-16.17 36.117-36.117 36.117-19.947 0-36.117-16.17-36.117-36.117 0-19.948 16.17-36.117 36.117-36.117 19.947 0 36.117 16.169 36.117 36.117" fill="#3b3c40"></path>`;
  }

  getLocation();
});
