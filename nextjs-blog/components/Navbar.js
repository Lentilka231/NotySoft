import styles from "../styles/navbar.module.scss"
import {NotesToolContainer,BarContainer} from "./ToolContainers"
import React from "react"
export default function Navbar({setActiveTool, setData, compositionSettings}){
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
            <BarContainer 
                setData={setData}
                compositionSettings={compositionSettings}/>
        </header>
        </>
    )
}