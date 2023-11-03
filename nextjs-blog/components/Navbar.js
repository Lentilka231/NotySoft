import styles from "../styles/navbar.module.scss"
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