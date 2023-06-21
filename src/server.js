import express, { static as as_static } from 'express'
const app = express()
import { geocode } from './utils/geocoding.js'
import {weather_func } from './utils/weather.js'
import path from 'path'
import { fileURLToPath } from 'url';
import hbs from 'hbs'
const {registerPartials} = hbs
import { log } from 'console'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// views
const views_path = path.join(__dirname, '../templates/views')
// partials
const partials_path = path.join(__dirname, "../templates/partials")
//register partials directory
registerPartials(partials_path)

// view engine
app.set('view engine', 'hbs')
app.set('views', views_path)

// static folder
const public_path = path.join(__dirname, '../public')
app.use(as_static(public_path))

//HOME 
app.get('', (req, res) => {
  res.render('index')
})

// WEATHER
app.get('/weather', (req, res) => {

  if (!req.query.address) {
    return res.send({ error: "Please provide an address!" })
  }

  geocode(req.query.address,
    (error, { longitude, latitude, placename } = {}
    ) => {
      if (error) {
        return res.send({ error })
      }

      weather_func({ longitude, latitude, placename } , (error , weather_response) => {
        res.send(weather_response);
      })

    })

})

app.get('*' , (req, res) => {
    res.render('404page')
})

// PORT listening
const PORT = process.env.PORT || 3000
app.listen(PORT, () => log(`Server open on port ${PORT}`))