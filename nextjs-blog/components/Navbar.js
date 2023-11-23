import styles from "../styles/navbar.module.scss"
import NotesToolContainer from "./NotesToolContainer"
import React from "react"
export default function Navbar({setActiveTool}){
    let toolNames={
        "toolNote_whole":false,
        "toolNote_half":false,
        "toolNote_quarter":false
    }
    const [activeToolList,setActiveToolList]=React.useState(toolNames);
    return (
        <>
        <header  className={styles.NavBar}>
            <NotesToolContainer 
            activeToolList={[activeToolList,setActiveToolList]}
            setActiveTool={setActiveTool} />
        </header>
        </>
    )
}