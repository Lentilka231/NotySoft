import Head from 'next/head';
import Navbar from "../components/Navbar"
import WhitePage from "../components/WhitePage"
import {PopUps} from "../components/PopUps"
import React from "react"
import json from "../public/composition.json"

export default function Home(){
  const [data, setData]= React.useState(json);
  const [popUpWindowIndex, setPopUpWindowIndex] = React.useState(-1)
  const [activeTool, setActiveTool] = React.useState();
  return (
    <>
        <Navbar 
          setActiveTool={setActiveTool} 
          data={data}
          setData={setData}
          setPopUpWindowIndex={setPopUpWindowIndex}/>
        <WhitePage
          activeTool={activeTool} 
          data={data}
          setData={setData}/>
        <PopUps 
          data={data}
          setData={setData}
          popUpWindowIndex={popUpWindowIndex}
          setPopUpWindowIndex={setPopUpWindowIndex}/>
    </>
  )
}