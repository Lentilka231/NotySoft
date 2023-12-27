import styles from "../../styles/navbar.module.scss"
import {Note} from "./../SVG"

export default function NotesToolContainer ({setActiveTool,decorationToolList,setDecorationToolList}){
    function setNewActiveTool(toolName){
        if(toolName){
            let newSetting = !decorationToolList[toolName]
            // this says what type of tool you are going to use
            setActiveTool(newSetting?toolName:undefined); 
            //this part is just for decoration (turns active tool background to yellow)
            setDecorationToolList(currentData =>{
                let helpDict = {};
                Object.keys(currentData).forEach(function(key){
                    helpDict[key]=false;
                });
                helpDict[toolName]=newSetting;
                return {...helpDict};
            })
        }
    }   
    return (
        <div className={styles.signsToolContainer+" "+styles.toolContainer}>
            <Note className={"noteInToolBar"} activeToolList={decorationToolList} height="100%" type="whole" setNewActiveTool={setNewActiveTool}/>
            <Note className={"noteInToolBar"} activeToolList={decorationToolList} height="100%" type="half" setNewActiveTool={setNewActiveTool}/>
            <Note className={"noteInToolBar"} activeToolList={decorationToolList} height="100%" type="quarter" setNewActiveTool={setNewActiveTool}/>
        </div>
    );
}