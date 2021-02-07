import React from 'react';

import SearchComponent from './components/SearchComponent';
import WeatherChart from './components/WeatherChart';

import './App.css';

const App = () => (
  <div className="App">
    <header>
      <SearchComponent />
    </header>
    <main>
      <WeatherChart />
    </main>
  </div>
);

export default App;
