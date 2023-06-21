import request from 'request'
import { error } from 'console'

const weather = (geo_data, callback) => {

    const { longitude, latitude, placename } = geo_data
    const base_url="https://api.openweathermap.org/data/2.5/weather?"
    const url = `${base_url}lat=${latitude}&lon=${longitude}&appid=${process.env.OPENWEATHERMAP_KEY}&units=metric`

    request({uri: url, json:true} , (request_error, response) => {

        if (request_error) {
            error("Can't connect to the services!")
        }
        else {

            const data = response.body
            callback(undefined, data)
        }

    })
}

export const weather_func = weather