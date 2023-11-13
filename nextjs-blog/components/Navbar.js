import styles from "../styles/navbar.module.scss"
import NotesToolContainer from "./NotesToolContainer"
export default function Navbar({setActiveTool}){
    return (
        <>
        <header  className={styles.NavBar}>
            <NotesToolContainer setActiveTool={setActiveTool} />
        </header>
        </>
    )
}