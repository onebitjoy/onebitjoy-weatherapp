async function weather(city) {

    const mapbox_url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(city) + '.json?' + 'proximity=ip' + '&access_token=' + process.env.MAPBOX_KEY + '&limit=1';

    const coordinates = fetch(mapbox_url)
        .then((response) => response.json())
        .then((data) => data.features[0])
        .then((feature) => [feature.center[0], feature.center[1]] )
        .catch((err) =>
            console.log("Error: " + err)
        )

    const owm_url = `https://api.openweathermap.org/data/2.5/weather?lat=${(await coordinates)[1]}&lon=${(await coordinates)[0]}&appid=${process.env.OPENWEATHERMAP_KEY}&units=metric`

    const data = fetch(owm_url)
    const result = (await data).json()

    return (await result);
}

async function weather_clicked(latitude, longitude) {

    const owm_url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.OPENWEATHERMAP_KEY}&units=metric`

    const data = fetch(owm_url)
    const result = (await data).json()

    return (await result);
}

export const weather_func = weather
export const weather_click = weather_clicked