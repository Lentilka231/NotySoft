import styles from "../styles/navbar.module.scss"
import {Note} from "./SVG"

export default function NotesToolContainer ({setActiveTool}){
    function setNewActiveTool(toolName){
        setActiveTool(toolName);
        console.log("using "+toolName);
    }
    return (
        <div className={styles.toolContainer}>
                    
            <Note className={"noteInToolBar"} colour="white" height="100%" type="whole" setNewActiveTool={setNewActiveTool}/>
            <Note className={"noteInToolBar"} colour="white" height="100%" type="half" setNewActiveTool={setNewActiveTool}/>
            <Note className={"noteInToolBar"} colour="white" height="100%" type="quarter" setNewActiveTool={setNewActiveTool}/>

        </div>
    );
}