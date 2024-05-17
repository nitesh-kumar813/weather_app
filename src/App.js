import React, { useState } from 'react';
import './App.css';
import Inputs from "./components/Inputs";
import Hero from './components/Hero'

function App() {
  const [query, setQuery] = useState({ q: "Delhi" }); 

  
  return (
    <>
      <div
      className="w-screen h-screen bg-zinc-900 flex flex-col  justify-start  text-white  ">
        <Inputs setQuery={setQuery} />
        <Hero query={query} />
    </div>
    </> 
  );
}

export default App;
