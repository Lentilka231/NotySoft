import styles from "../styles/navbar.module.scss"
import NotesToolContainer from "./ToolContainers/NotesToolContainer.js"
import BarToolContainer from "./ToolContainers/BarToolContainer.js"
import React from "react"
export default function Navbar({setActiveTool, data, setData, setPopUpWindowIndex}){
    let toolNames={
        "note_whole":false,
        "note_half":false,
        "note_quarter":false
    }
    const [decorationToolList, setDecorationToolList]=React.useState(toolNames);
    return (
        <>
        <header  className={styles.NavBar}>
            <NotesToolContainer 
                decorationToolList={decorationToolList}
                setDecorationToolList={setDecorationToolList}
                setActiveTool={setActiveTool} />
            <BarToolContainer 
                data={data}
                setData={setData}
                setPopUpWindowIndex={setPopUpWindowIndex}/>
        </header>
        </>
    )
}