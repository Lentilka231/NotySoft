import styles from "../styles/navbar.module.scss"
import {Note} from "./SVG"

export default function NotesToolContainer ({setActiveTool,activeToolList}){
    function setNewActiveTool(toolName){
        let newSetting = !activeToolList[0][toolName]
        //let toolName = toolName.substring(toolName.indexOf("_")+1);
        setActiveTool(toolName,toolName.substring(toolName.indexOf("_")+1)); // this says what type of tool you are going to use
        console.log(toolName);
        //just for decoration (turns yellow active tool)
        activeToolList[1](currentData =>{
            Object.keys(currentData).forEach(key=>{
                currentData[key]=false;
            })
            currentData[toolName]=newSetting;
            console.log("hello");
            return currentData;
        })
        console.log("ttmtz",activeToolList[0]);
    }
    return (
        <div className={styles.toolContainer}>
            <Note className={"noteInToolBar"} activeToolList={activeToolList[0]} height="100%" type="whole" setNewActiveTool={setNewActiveTool}/>
            <Note className={"noteInToolBar"} activeToolList={activeToolList[0]} height="100%" type="half" setNewActiveTool={setNewActiveTool}/>
            <Note className={"noteInToolBar"} activeToolList={activeToolList[0]} height="100%" type="quarter" setNewActiveTool={setNewActiveTool}/>
        </div>
    );
}