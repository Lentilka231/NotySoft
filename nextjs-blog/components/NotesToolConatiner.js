import styles from "../styles/navbar.module.scss"
import Nota from "./SVG"

export default function NotesToolConatiner (){
    return (
        <div className={styles.toolContainer}>
            <Nota colour="white" height="100%" type="1"/>
            <Nota colour="white" height="100%" type="1/2"/>
            <Nota colour="white" height="100%" type="1/4"/>

        </div>
    );
}