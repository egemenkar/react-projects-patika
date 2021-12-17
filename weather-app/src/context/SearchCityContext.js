import { createContext, useContext, useState } from "react";

const SearchCityContext = createContext();

export const SearchCityProvider = ({children}) => {

  const [search, setSearch] = useState("")
  const [city, setCity] = useState("Ankara")

  const handleSubmit = () => {
    setCity(search);
    setSearch("");
  }
  
  return (<SearchCityContext.Provider value={city}>
    <input type="text" value={search} placeholder="Search for A City..." onChange={({target}) => setSearch(target.value)}></input>
    <button onClick={handleSubmit}>Search</button>
    {children}

    <br />

    </SearchCityContext.Provider>)
}

export const useSearchCity = () => useContext(SearchCityContext);