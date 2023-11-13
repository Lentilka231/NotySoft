import Head from 'next/head';
import Navbar from "../components/Navbar"
import WhitePage from "../components/WhitePage"
import React from "react"
export default function Home(){
  const [activeTool,setActiveTool] = React.useState();
  return (
    <>
        <Navbar setActiveTool={setActiveTool}/>
        <WhitePage activeTool={activeTool} />
    </>
  )
}