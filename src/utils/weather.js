const request = require('postman-request')
const {error} = require('console')

const weather = (geo_data, callback) => {

    const { longitude, latitude, placename } = geo_data

    const url = `${base_url}lat=${latitude}&lon=${longitude}&appid=${process.env.openweathermap_key}&units=metric`

    request(url, (request_error, response) => {

        if (request_error) {
            error("Can't connect to the services!")
        }
        else {

            const data = JSON.parse(response.body)
            callback(undefined, data)
        }

    })
}

export const weather_func = weather