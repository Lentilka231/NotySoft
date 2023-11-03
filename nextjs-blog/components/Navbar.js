import styles from "../stylesheets/Navbar.module.css"
import NotesToolConatiner from "./NotesToolConatiner"
export default function Navbar(){
    return (
        <>
        <header  className={styles.NavBar}>
            <NotesToolConatiner/>
        </header>
        </>
    )
}