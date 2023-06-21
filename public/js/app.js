const input_form = document.querySelector('form')

// new map that will overlap the existing map
// -----------------------------------------------
input_form.addEventListener('submit', (event) => {

  event.preventDefault()

  let city = document.querySelector('#forminput')

  const map = L.map('map');

  if (city.value) {
    fetcher(city.value, map)
    city.value = ""
  } else {
    alert("Enter a city!")
    location.reload()
  }

  input_form.addEventListener('submit', () => {
    location.reload()
  })
}
)

// fetching function
const fetcher = (address, map) => {
  fetch("/weather?address=" + address).then((response) => {
    response.json().then((data) => {

      const { lat, lon } = data.coord
      const { name } = data

      map.setView([lat, lon], 6)

      // base map
      const normal_map = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
      normal_map.addTo(map);

      var myIcon = L.icon({
        iconUrl: "images\\marker.png",
        iconSize: [40, 40],
      });

      L.marker([lat, lon], { icon: myIcon }).addTo(map);

      // temperature map
      const temp_map = L.tileLayer(
        'https://tile.openweathermap.org/map/temp/{z}/{x}/{y}.png?appid='+ process.env.OPENWEATHERMAP_KEY,
      {
        maxZoom: 19,
        opacity: 0.6,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });

      temp_map.addTo(map)

    })
  })
}