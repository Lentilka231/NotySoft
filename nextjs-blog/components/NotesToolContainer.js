import styles from "../styles/navbar.module.scss"
import {Note} from "./SVG"

export default function NotesToolContainer ({setActiveTool,resetActiveTool}){
    function setNewActiveTool(target){
        let toolName = target.id.substring(target.id.indexOf("_")+1);
        resetActiveTool();
        setActiveTool(toolName);
        target.id=styles.activeTool;
    }
    return (
        <div className={styles.toolContainer}>
                    
            <Note className={"noteInToolBar"} colour="white" height="100%" type="whole" setNewActiveTool={setNewActiveTool}/>
            <Note className={"noteInToolBar"} colour="white" height="100%" type="half" setNewActiveTool={setNewActiveTool}/>
            <Note className={"noteInToolBar"} colour="white" height="100%" type="quarter" setNewActiveTool={setNewActiveTool}/>

        </div>
    );
}