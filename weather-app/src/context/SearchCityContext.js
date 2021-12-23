import { createContext, useContext, useState } from "react";

const SearchCityContext = createContext();

export const SearchCityProvider = ({children}) => {

  const [search, setSearch] = useState("")
  const [city, setCity] = useState("Ankara")

  const handleSubmit = () => {

    let cityName = search.toLowerCase();
    let wordsArr = cityName.split(" ");
    for(let i = 0; i < wordsArr.length; i++) {
      wordsArr[i] = wordsArr[i].charAt(0).toUpperCase() + wordsArr[i].slice(1);
    }

    setCity(wordsArr.join(" "));
    setSearch("");
  }

  const cityValues = {
    city: city,
    setCity: setCity
  }
  
  return (<SearchCityContext.Provider value={cityValues}>
      <div className="search-city">
        <input type="text" value={search} placeholder="Search for a city..." onChange={({target}) => setSearch(target.value)}></input>
        <button onClick={handleSubmit}>Search</button>
      </div>
      {children}
    </SearchCityContext.Provider>)
}

export const useSearchCity = () => useContext(SearchCityContext);