import styles from "../styles/navbar.module.scss"
import {Note} from "./SVG"

export default function NotesToolConatiner (){
    return (
        <div className={styles.toolContainer}>
                    
            <Note className={"noteInToolBar"} colour="white" height="100%" type="whole"/>
            <Note className={"noteInToolBar"} colour="white" height="100%" type="half"/>
            <Note className={"noteInToolBar"} colour="white" height="100%" type="quarter"/>

        </div>
    );
}