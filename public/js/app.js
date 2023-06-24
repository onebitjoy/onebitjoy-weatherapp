const input_form = document.querySelector('.search')

let map = L.map('map').setView([51.505, -0.09], 4);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let popup = L.popup();

async function onMapClick(e) {

  const lat = e.latlng.lat
  const lon = e.latlng.lng

  map.flyTo([lat, lon], 8)

  fetch("/directweather?lat=" + lat.toFixed(2) + "&lon=" + lon.toFixed(2))
  .then( (got_data) => got_data.json())
  .then( (data) => {
      const myIcon = L.icon({
      iconUrl: "images\\marker.png",
      iconSize: [40, 40],
     });
      L.marker([lat, lon], { icon: myIcon }).addTo(map)

      console.log(data);
     popup
      .setLatLng(e.latlng)
      .setContent(
        `<div style="margin: 8px 0 10px 0; width:100%; height: 100%; font-size:0.8rem; font-weight: 600; display: flex; flex-direction: column;color:black; padding-right:10px">`
        +

          `<div style="font-size:1.5rem; text-align:left; font-weight:600; margin-left: 14px; color:black ;backgrorund-color:rgba(250,250,250,0.9)">`+
            // `<img style="width:20px;height:20px;background-color: black;" src="https://openweathermap.org/img/wn/${(await (await data).weather[0]).icon}@2x.png">`+
            `${data.name}` +
            `<span style="text-transform: uppercase; font-size:0.8rem; color:gray;margin-left:8px ; font-weight:600"> ${data.sys.country}<span> ` +
          `</div>\n` +
          '<div style="height:2px; width: 100%; background-color:#d9d6d6 ;"></div>'
          +

          `<div style="margin:10px 10px 0 14px; flex-grow: 1; padding-bottom:10px;">`
          +
            `<div>`
            +
              `<div><span style="color:gray">WEATHER</span><span style="float:right;">${(data).weather[0].main}</span></div>` +
              `<div><span style="color:gray">DESCRIPTION</span><span style="float:right;">${data.weather[0].description}</span></div>` +
              `<div><span style="color:gray">TEMPERATURE</span><span style="float:right;">${data.main.temp}&deg;C</span></div>\n` +
              `<div><span style="color:gray">FEELS LIKE</span> <span style="float:right;">${data.main.feels_like}&deg;C</span></div>\n` +
              `<div><span style="color:gray">PRESSURE</span> <span style="float:right;">${data.main.humidity} hPa</span></div>\n`
              
              +
              `<div><span style="color:gray">VISIBILITY</span><span style="float:right;">${data.visibility}m</span></div>`
              +
              `<div><span style="color:gray">WIND SPEED</span><span style="float:right;">${data.wind.speed}m/s</span></div>\n`
              +
              `<div><span style="color:gray">TIMEZONE</span><span style="float:right;">${(data.timezone) / 3600} Hrs</span></div>\n`
            +
            `</div>`
            +
          `</div>`
        +
        `</div>`
      )
      .openOn(map);
    }
  )

}

map.on('click', onMapClick);

// new map
// -----------------------------------------------
input_form.addEventListener('submit', mapper)

async function mapper(event) {

  event.preventDefault()

  let city = document.querySelector('#city')

  try {

    const response = fetch("/weather?address=" + city.value)
    const data = (await response).json()
    const { lat, lon } = (await data).coord

    map.setView([lat, lon], 4)
    map.flyTo([lat, lon], 8)

    var myIcon = L.icon({
      iconUrl: "images\\marker.png",
      iconSize: [40, 40],
    });
    L.marker([lat, lon], { icon: myIcon }).addTo(map)

    popup
    .setLatLng([lat,lon])
    .setContent(
      `<div style="margin: 8px 0 10px 0; width:100%; height: 100%; font-size:0.8rem; font-weight: 600; display: flex; flex-direction: column;color:black; padding-right:10px">`
      +

        `<div style="font-size:1.5rem; text-align:left; font-weight:600; margin-left: 14px; color:black ;backgrorund-color:rgba(250,250,250,0.9)">`+
          ` ${(await data).name}` +
          `<span style="text-transform: uppercase; font-size:0.8rem; color:gray;margin-left:8px ; font-weight:600"> ${(await data).sys.country}<span> ` +
        `</div>\n` +
        '<div style="height:2px; width: 100%; background-color:#d9d6d6 ;"></div>'
        +

        `<div style="margin:10px 10px 0 14px; flex-grow: 1; padding-bottom:10px;">`
        +
          `<div>`
          +
            `<div><span style="color:gray">WEATHER</span><span style="float:right;">${(await (await data).weather[0]).main}</span></div>` +
            `<div><span style="color:gray">DESCRIPTION</span><span style="float:right;">${(await (await data).weather[0]).description}</span></div>` +
            `<div><span style="color:gray">TEMPERATURE</span><span style="float:right;">${(await (await data).main).temp}&deg;C</span></div>\n` +
            `<div><span style="color:gray">FEELS LIKE</span> <span style="float:right;">${(await (await data).main).feels_like}&deg;C</span></div>\n` +
            `<div><span style="color:gray">PRESSURE</span> <span style="float:right;">${(await (await data).main).humidity} hPa</span></div>\n`
            
            +
            `<div><span style="color:gray">VISIBILITY</span><span style="float:right;">${(await data).visibility}m</span></div>`
            +
            `<div><span style="color:gray">WIND SPEED</span><span style="float:right;">${(await (await data).wind).speed}m/s</span></div>\n`
            +
            `<div><span style="color:gray">TIMEZONE</span><span style="float:right;">${(await data).timezone / 3600} Hrs</span></div>\n`
          +
          `</div>`
          +
        `</div>`
      +
      `</div>`
    )
    .openOn(map);
  }

  catch (error) {

    console.error("Can't access to the server. Possible Connection Loss.\n\n" + error)

  }
  city.value = ""
}



          //   `<div><span style="color:gray">WEATHER:</span><span style="float:right;">${(await (await data).weather[0]).main}</spam></div>` +
          //   `<div><span style="color:gray">DESCRIPTION:</span>${(await (await data).weather[0]).description}</div>` +
          //   `<div><span style="color:gray">TEMPERATURE:</span> ${(await (await data).main).temp}&deg;C</div>\n` +
          //   `<div><span style="color:gray">FEELS LIKE:</span> ${(await (await data).main).feels_like}&deg;C</div>\n` +
          //   `<div><span style="color:gray">PRESSURE:</span> ${(await (await data).main).humidity} hPa</div>\n`
            
          //   +
          //   `<div><span style="color:gray">VISIBILITY: </span> ${(await data).visibility}m</div>`
          //   +
          //   `<div><span style="color:gray">WIND SPEED:</span> ${(await (await data).wind).speed}m/s</div>\n`
          //   +
          //   `<div><span style="color:gray">TIMEZONE:</span> ${(await data).timezone / 3600} Hrs</div>\n`
          // +