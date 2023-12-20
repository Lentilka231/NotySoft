import Head from 'next/head';
import Navbar from "../components/Navbar"
import WhitePage from "../components/WhitePage"
import {PopUps} from "../components/PopUps"
import React from "react"
import json from "../public/composition.json"

export default function Home(){
  const [data, setData]= React.useState(json);
  const [compositionSettings,setCompositionSettings]=React.useState(data["settings"]);

  const [activeTool, setActiveTool] = React.useState();
  return (
    <>
        <PopUps/>

        <Navbar 
          setActiveTool={setActiveTool} 
          setData={setData}
          compositionSettings={compositionSettings}/>
        <WhitePage
          activeTool={activeTool} 
          data={data}
          setData={setData}
          compositionSettings={compositionSettings} />

    </>
  )
}