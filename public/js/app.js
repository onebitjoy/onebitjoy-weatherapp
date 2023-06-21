const input_form = document.querySelector('.search')

// new map
// -----------------------------------------------
input_form.addEventListener('submit', (event) => {

  event.preventDefault()

  let city = document.querySelector('#city')

  const map = L.map('map');
  if (city.value) {
    fetcher(city.value, map)
    city.value = ""
  } else {
    location.reload()
  }

  input_form.addEventListener('submit', () => {
    location.reload()
  })
}
)

// fetching function
const fetcher = (address, map) => {

  fetch("http://localhost:3000/weather?address=" + address).then((response) => {
    response.json().then((data) => {

      const { lat, lon } = data.coord
      const { name } = data

      map.setView([lat, lon], 4)
      map.flyTo([lat, lon], 8)
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

    })
  })
}