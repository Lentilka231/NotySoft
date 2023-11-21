import styles from "../styles/whitepage.module.scss"
import {Note,Clef,Time} from "./SVG"
import React from "react"
function Line({onMouseDown,onMouseEnter,onMouseMove,tone}){
    return (
        <div onMouseDown={()=>onMouseDown()}
             onMouseEnter={(e) => onMouseEnter(e,tone)}
             onMouseMove={(e)=>onMouseMove(e)} 
             className={styles.space}>
            <div className={styles.line}></div>
        </div>
    )
}
function Space({onMouseDown,onMouseEnter,onMouseMove,tone}){
    return (
        <div onMouseDown={()=>onMouseDown()}
             onMouseEnter={(e) => onMouseEnter(e,tone)}
             onMouseMove={(e)=>onMouseMove(e)}
             className={styles.space}></div>
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
                    return <Note key={index} data={{...sign}} type={sign["type"]} width="28px" tone={sign["tone"]} marginLeft={sign["marginLeft"]} className="note"/>
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
export default function Stave ({data, setData, activeTool, barPointer,lastEditedBar,setLastEditedBar,lastID,setLastID}){
    function updateNewSigniture(event,tone){
        if(activeTool!=null){
            setData(currentData =>{
                return {...currentData,"composition":currentData["composition"].map(object=>{   
                    if(object["index"]=="bar"+lastEditedBar["bar"]){
                        return {...object,"content":object["content"].filter(sign => !(sign["sign"].includes("_newSign")))}
                    }
                    return object;
                })}
            })// deletes the old inserted sign
            setData(currentData =>{
                    return {...currentData,"composition":currentData["composition"].map(object=>{
                        
                        if(object["index"]=="bar"+lastEditedBar["bar"]){
                        }
                        if(object["index"]=="bar"+barPointer){
                            console.log(object["content"].at(-1)["id"],document.getElementById(object["content"].at(-1)["id"]))
                            let coordinates = document.getElementById(object["content"].at(-1)["id"]).getBoundingClientRect();
                            let x = event.clientX-coordinates.left-(coordinates.width)
                            object["content"].push({"sign":"note_newSign","type":activeTool,"tone":tone,"id":lastID,"marginLeft":x>0?x:0});
                        }
                        return object;
                    })}
            })//insets new sign
            setLastEditedBar({"bar":1,"sign":lastID})
        }

    }
    function updateCoordinatesOfNewSigniture(event) {
        if(activeTool){
            setData(currentData =>{
                return {...currentData,"composition":currentData["composition"].map(object=>{
                
                    if(object["index"]=="bar"+lastEditedBar["bar"]){
                        //console.log("nastane to tu? aspoň",document.getElementById(3).getBoundingClientRect())
                        //let x = event.clientX-coordinates.left-(coordinates.width)
                        //object["content"][lastEditedBar["sign"]]["marginLeft"]+=x>0?x:0;
                    }

                    return object;
                })}
            })//insets new sign
        }
    }
    function setFirmly_ontoStave(){
        setData(currentData =>{
            return {...currentData,"composition":currentData["composition"].map(object=>{   
                if(object["index"]=="bar"+lastEditedBar["bar"]){
                    return {...object,"content":object["content"].map(sign=>{
                        return {...sign,"sign":sign["sign"].replace("_newSign","")}
                    })}
                }
                return object;
            })}
        })
        setLastID(lastID+1)
    }
    return (
        <div className={styles.stave}>
            <Space onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} onMouseMove={updateCoordinatesOfNewSigniture} tone={18}/>
            <Space onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} onMouseMove={updateCoordinatesOfNewSigniture} tone={17}/>
            <Space onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} onMouseMove={updateCoordinatesOfNewSigniture} tone={16}/>
            <Space onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} onMouseMove={updateCoordinatesOfNewSigniture} tone={15}/>
            <Space onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} onMouseMove={updateCoordinatesOfNewSigniture} tone={14}/>
            <Space onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} onMouseMove={updateCoordinatesOfNewSigniture} tone={13}/>
            <Space onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} onMouseMove={updateCoordinatesOfNewSigniture} tone={12}/>
            <Space onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} onMouseMove={updateCoordinatesOfNewSigniture} tone={11}/>

            <Line  onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} onMouseMove={updateCoordinatesOfNewSigniture} tone={10}/>
            <Space onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} onMouseMove={updateCoordinatesOfNewSigniture} tone={9}/>
            <Line  onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} onMouseMove={updateCoordinatesOfNewSigniture} tone={8}/>
            <Space onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} onMouseMove={updateCoordinatesOfNewSigniture} tone={7}/>
            <Line  onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} onMouseMove={updateCoordinatesOfNewSigniture} tone={6}/>
            <Space onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} onMouseMove={updateCoordinatesOfNewSigniture} tone={5}/>
            <Line  onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} onMouseMove={updateCoordinatesOfNewSigniture} tone={4}/>
            <Space onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} onMouseMove={updateCoordinatesOfNewSigniture} tone={3}/>
            <Line  onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} onMouseMove={updateCoordinatesOfNewSigniture} tone={2}/>

            <Space onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} onMouseMove={updateCoordinatesOfNewSigniture} tone={1}/>
            <Space onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} onMouseMove={updateCoordinatesOfNewSigniture} tone={0}/>
            <Space onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} onMouseMove={updateCoordinatesOfNewSigniture} tone={-1}/>
            <Space onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} onMouseMove={updateCoordinatesOfNewSigniture} tone={-2}/>
            <Space onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} onMouseMove={updateCoordinatesOfNewSigniture} tone={-3}/>
            <Space onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} onMouseMove={updateCoordinatesOfNewSigniture} tone={-4}/>
            <Space onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} onMouseMove={updateCoordinatesOfNewSigniture} tone={-5}/>
            <Space onMouseDown={setFirmly_ontoStave} onMouseEnter={updateNewSigniture} onMouseMove={updateCoordinatesOfNewSigniture} tone={-6}/>
            <Objects data={data["composition"]}/>
        </div>
    )
}