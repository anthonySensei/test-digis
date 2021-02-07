import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment';

import { kelvinToCelsius } from '../helper/temperature';

const WeatherChart = ({ search }) => {
  const now = moment().format('DD/MM/YYYY');
  const [ forecast, setForecast ] = useState(null);
  const [ error, setError ] = useState(null);

  useEffect(() => {
    if(search) {
      getWeather();
    }
  }, [ search ]);

  const getWeather = async () => {
    const { REACT_APP_WEATHER_API_KEY } = process.env;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=${REACT_APP_WEATHER_API_KEY}`;
    try {
      let { list: weatherForecast } = (await axios.get(url)).data;
      weatherForecast = weatherForecast
        .map(({ dt_txt, main }) => {
          const hours =  moment(dt_txt).format('HH:mm');
          const date = moment(dt_txt).format('DD/MM/YYYY HH:mm');
          const isMidnight = val => val === '00:00';

          return {
            name: isMidnight(hours) ? date : hours,
            tempMin: kelvinToCelsius(main.temp_min),
            tempMax: kelvinToCelsius(main.temp_max)
          };
        })
        // To show  forecast only for 24 hours
        .splice(0, 8);

      setForecast(weatherForecast);
      setError(null);
    } catch (err) {
      handleError(err);
    }
  };

  const handleError = err => {
    const { response } = err;
    setForecast(null);

    if (response) {
      const { message } = response.data;
      setError(message);
    } else {
      setError('Unexpected Error');
    }
  };

  return (
    <div>
      {search && !error && (
        <BarChart
          width={900}
          height={500}
          data={forecast}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="name" label={{ value: `Date: ${now}`, dy: 30 }} />
          <YAxis
            label={{ value: 'Temperature', angle: -90, position: 'insideLeft' }}
            type="number"
            domain={[ 'auto', 0 ]}
          />
          <Tooltip/>
          <Legend wrapperStyle={{ bottom: -25, right: 0 }}/>
          <Bar dataKey="tempMin" fill="#8884d8"/>
          <Bar dataKey="tempMax" fill="#82ca9d" />
        </BarChart>
      )}
      {error && (
        <h1>{ error }</h1>
      )}
    </div>
  );
};

WeatherChart.propTypes = {
  search: PropTypes.string,
};

const mapStateToProps = ({ city }) => ({
  search: city.search,
});

export default connect(mapStateToProps)(WeatherChart);

