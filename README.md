# Weather/Events/History API reflector for a demo app
This is mostly an API reflector for my demo app within my portfolio site.
This was created with the Express starter so it contains some default stuff.
Also, I set this up for a demo to only point to Seattle.  Could have accepted a zip code or lat/long, but its just a demo.

# I want to try this thing
First, make sure that you make your own `.env` file.
Copy the `env.example` file to `.env` and fill it out correctly with API keys from these two places:
- For weather: https://openweathermap.org/api
- For events: https://predicthq.com/

The historical data does come from [here](https://history.muffinlabs.com/), but all we're doing with this Express route is bypassing the CORS rule for the web app.

If you want to try it, here are the routes:
- Weather: http://localhost:3000/weather
- History: http://localhost:3000/history/3/11
- Events: http://localhost:3000/events/2020-03-30
