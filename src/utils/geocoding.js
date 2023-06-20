const request = require('postman-request')
const geocoding_city = (city = "", callback) => {

    const geo_url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(city) + '.json?' + 'proximity=ip' + '&access_token=' + process.env.mapbox_key+ '&limit=1'

    console.log(geo_url);
    request(geo_url, (error, response) => {

        if (error) {
            callback("Can't connect to the internet!", undefined)
        } else {
            const geocoding_data = JSON.parse(response.body)
            if (geocoding_data.features.length === 0) {
                callback("Invalid query!", undefined)
            } else {
                const data = {
                    longitude: geocoding_data.features[0].center[0],
                    latitude: geocoding_data.features[0].center[1],
                    placename: geocoding_data.features[0].place_name
                }
                callback(undefined, data)
            }
        }
    })
}

export const geocode = geocoding_city

/*TEST*/
// geocoding_city("prayagraj", (req, res) => {
//     log(res)
// })