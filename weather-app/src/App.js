import './App.css';
import Container from './components/Container';
import { WeatherApiProvider } from './context/WeatherApiContext';
import { SearchCityProvider } from './context/SearchCityContext';

function App() {
  return (
    <div className="App">
      <SearchCityProvider>
        <WeatherApiProvider>
          <Container /> 
        </WeatherApiProvider>
      </SearchCityProvider>
      
    </div>
  );
}

export default App;
