import styles from "../styles/navbar.module.scss"
import NotesToolContainer from "./NotesToolContainer"
import React from "react"
export default function Navbar({setActiveTool}){
    let toolNames={
        "note_whole":false,
        "note_half":false,
        "note_quarter":false
    }
    const [decorationToolList,setDecorationToolList]=React.useState(toolNames);
    return (
        <>
        <header  className={styles.NavBar}>
            <NotesToolContainer 
            decorationToolList={decorationToolList}
            setDecorationToolList={setDecorationToolList}
            setActiveTool={setActiveTool} />
        </header>
        </>
    )
}