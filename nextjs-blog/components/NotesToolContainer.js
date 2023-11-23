import styles from "../styles/navbar.module.scss"
import {Note} from "./SVG"

export default function NotesToolContainer ({setActiveTool,activeToolList}){
    function setNewActiveTool(target){
        let toolName = target.id.substring(target.id.indexOf("_")+1);
        setActiveTool(toolName); // this says what type of tool are we using
        
        //just for decoration (turns yellow active tool)
        activeToolList[1](currentData =>{
            Object.keys(currentData).forEach(key=>{
                currentData[key]=false;
            })
            currentData[target.id]=true;
            return currentData;
        })
    }
    return (
        <div className={styles.toolContainer}>
            <Note className={"noteInToolBar"} activeToolList={activeToolList[0]} height="100%" type="whole" setNewActiveTool={setNewActiveTool}/>
            <Note className={"noteInToolBar"} activeToolList={activeToolList[0]} height="100%" type="half" setNewActiveTool={setNewActiveTool}/>
            <Note className={"noteInToolBar"} activeToolList={activeToolList[0]} height="100%" type="quarter" setNewActiveTool={setNewActiveTool}/>
        </div>
    );
}