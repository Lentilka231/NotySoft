import styles from "../styles/whitepage.module.scss"
import {Note,Clef,Time} from "./SVG"
import React from "react"
function Line({onMouseDown,onMouseEnter,tone}){
    return (
        <div onMouseDown={()=>onMouseDown()} onMouseEnter={() => onMouseEnter(tone)} className={styles.line}></div>
    )
}
function Space({onMouseDown,onMouseEnter,tone}){
    return (
        <div onMouseDown={()=>onMouseDown()} onMouseEnter={() => onMouseEnter(tone)} className={styles.space}></div>
    )
}
function Signs({object}){
    return(
        <>
        {object["content"].map((sign,index) =>{
            let typeOfSign = sign["sign"];
            typeOfSign=typeOfSign.replace("_newSign","")
            switch(typeOfSign){
                case "note":
                    return <Note key={index} type={sign["type"]} width="28px" tone={sign["tone"]} className="note"/>
                case "pause":
                    return;
            }
        })}
        </>
    )
}
function Objects({data}){
    return (
    <div className={styles.signs} >
        {data.map((object,index) =>{
            switch (object["object"]){
                case "bar":
                    return (
                        <div key={index} className={styles.bar}>
                            <Signs object={object}/>
                            <div className={styles.barLine}></div>
                        </div>
                    )
                case "clef":
                    return <Clef key={index} type={object["type"]} width="50px" className="clef" />
                case "time":
                    return <Time key={index} type={object["type"]} width="30px" className="time"/>
            }
        })}
    </div>
    )
}
export default function Stave ({data, setData, activeTool, barPointer,lastEditedBar}){
    function updateNewSigniture(tone){
        setData(currentData =>{
            return {...currentData,"composition":currentData["composition"].map(object=>{   
                if(object["index"]=="bar"+lastEditedBar){
                    return {...object,"content":object["content"].filter(sign => !(sign["sign"].includes("_newSign")))}
                }
                return object;
            })}
        })// deletes the old inserted sign
        setData(currentData =>{
            return {...currentData,"composition":currentData["composition"].map(object=>{
                
                if(object["index"]=="bar"+lastEditedBar){
                }
                if(object["index"]=="bar"+barPointer){
                    object["content"].push({"sign":"note_newSign","type":activeTool,"tone":tone});
                }
                    return object;
            })}
        })//insets new sign
    }
    function setFirmly_ontoStave(){
        setData(currentData =>{
            return {...currentData,"composition":currentData["composition"].map(object=>{   
                if(object["index"]=="bar"+lastEditedBar){
                    return {...object,"content":object["content"].map(sign=>{
                        return {...sign,"sign":sign["sign"].replace("_newSign","")}
                    })}
                }
                return object;
            })}
        })
    }
    return (
        <div className={styles.stave}>
            <Space onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} tone={18}/>
            <Space onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} tone={17}/>
            <Space onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} tone={16}/>
            <Space onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} tone={15}/>
            <Space onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} tone={14}/>
            <Space onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} tone={13}/>
            <Space onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} tone={12}/>
            <Space onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} tone={11}/>

            <Line  onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} tone={10}/>
            <Space onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} tone={9}/>
            <Line  onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} tone={8}/>
            <Space onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} tone={7}/>
            <Line  onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} tone={6}/>
            <Space onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} tone={5}/>
            <Line  onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} tone={4}/>
            <Space onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} tone={3}/>
            <Line  onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} tone={2}/>

            <Space onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} tone={1}/>
            <Space onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} tone={0}/>
            <Space onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} tone={-1}/>
            <Space onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} tone={-2}/>
            <Space onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} tone={-3}/>
            <Space onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} tone={-4}/>
            <Space onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} tone={-5}/>
            <Space onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} tone={-6}/>
            <Objects data={data["composition"]}/>
        </div>
    )
}