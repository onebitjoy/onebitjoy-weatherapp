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
  const data = fetch("/directweather?lat="+lat.toFixed(2) + "&lon=" + lon.toFixed(2))
  console.log("longitude: " + e.latlng)
  popup
    .setLatLng(e.latlng)
    .setContent(`Coordinates: ${e.latlng.lat.toFixed(2)}, ${e.latlng.lng.toFixed(2)}`)
    .openOn(map);
  console.log((await (await data).json()).coord)
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
  }

  catch (error) {

    console.error("Can't access to the server. Possible Connection Loss.\n\n" + error)
  
  }
  city.value = ""
}
