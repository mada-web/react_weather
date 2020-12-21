import React from 'react';

import './App.css';
import { getData } from './helper';

class App extends React.Component {
    state = {
        searchInput: '',
        weather: null,
    }

    inputChange = event => {
        const { value } = event.target;
        this.setState({
            searchInput: value,
        })
    }

    onSearchClick = async event => {
        if(!this.state.searchInput) {
            return;
        }
    
        const weather = await getData(this.state.searchInput);
        const {
            name,
            main: { temp },
        } = weather;

        this.setState({
            weather: {
                name,
                temp,
            },
        })
    }

    onReloadClick = () => {
        this.setState({
            weather: null,
            searchInput: ''
        })
    }

    render() {
        const { searchInput, weather } = this.state;

        return (
            <div className="app_weather">
                {
                    !this.state.weather
                        ? <div className="actions">
                            <input id="search_input" type="text" value={searchInput} onChange={this.inputChange}/>
                            <button id="search_button" onClick={this.onSearchClick}>Search</button>
                        </div> 
                        : <div className="result">
                        <span>
                            <span id="city_name">{weather.name} </span>
                            <span id="city_weather">{Math.round(weather.temp) - 273} ℃</span>
                        </span>
                        <button id="reload" onClick={this.onReloadClick}>
                            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M7 9h-7v-7h1v5.2c1.853-4.237 6.083-7.2 11-7.2 6.623 0 12 5.377 12 12s-5.377 12-12 12c-6.286 0-11.45-4.844-11.959-11h1.004c.506 5.603 5.221 10 10.955 10 6.071 0 11-4.929 11-11s-4.929-11-11-11c-4.66 0-8.647 2.904-10.249 7h5.249v1z"/></svg>
                        </button>
                    </div>
                }
            </div>
          );
    }
}

export default App;