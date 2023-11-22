import styles from "../styles/navbar.module.scss"
import NotesToolContainer from "./NotesToolContainer"
export default function Navbar({setActiveTool}){
    function resetActiveTool(){
        let activeTool =document.getElementById("activeTool");
        if (activeTool){
            activeTool.id="";

        }
    }
    return (
        <>
        <header  className={styles.NavBar}>
            <NotesToolContainer 
            resetActiveTool={resetActiveTool} 
            setActiveTool={setActiveTool} />
        </header>
        </>
    )
}