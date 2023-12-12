import styles from "../styles/whitepage.module.scss"
import {Note,Clef,Time} from "./SVG"
import React from "react"
function Line({onMouseDown,onMouseMove,onMouseLeave,tone}){
    return (
        <div onMouseDown={()=>onMouseDown()}
             onMouseMove={(e)=>onMouseMove(e,tone)}
             onMouseLeave={onMouseLeave?()=>onMouseLeave():null} 
             className={styles.space}>
            <div className={styles.line}></div>
        </div>
    )
}
function Space({onMouseDown,onMouseMove,onMouseLeave,tone}){
    return (
        <div onMouseDown={()=>onMouseDown()}
             onMouseLeave={onMouseLeave?()=>onMouseLeave():null} 
             onMouseMove={(e)=>onMouseMove(e,tone)}
             className={styles.space}></div>
    )
}
function JSXfromSign({object}){
    function getSignCategory(sign){
        return sign.substring(0,sign.search("_"));
    }
    function getSignType(sign){
        return sign.substring(sign.search("_")+1); 
    }
    return(
        <>
        {object["content"].map((sign,index) =>{
            let signName = sign["sign"];
            signName=signName.replace("_newSign","")
            switch(getSignCategory(signName)){
                case "note":
                    return <Note key={index} data={{...sign}} type={getSignType(signName)} width="28px" tone={sign["tone"]} marginLeft={sign["marginLeft"]} className="note"/>
                case "pause":
                    return;
            }
        })}
        </>
    )
}
function MusicalObjectsOnStave({data, setBarPointer}){
    const STAVE_WIDTH_LEGTH=970;
    let len=0;
    function lastSeenBar(barIndex){
        setBarPointer(barIndex);
        // console.log("banán",barIndex);
    }
    return (
    <div className={styles.signs} >
        {data.map((object,index) =>{
            switch (object["object"]){
                case "bar":
                    let barWidth = index+1<data.length?object["width"]:STAVE_WIDTH_LEGTH-len;
                    len+=object["width"];
                    return (
                        <div key={index} 
                        id={object["index"]} 
                        style={{"width":barWidth+"px"}} 
                        onMouseMove={()=>lastSeenBar(object["index"].substring(3))} 
                        className={styles.bar}>

                            <JSXfromSign object={object}/>
                            <div className={styles.barLine}></div>
                        </div>
                    )
                case "clef":
                    len+=50;
                    return <Clef key={index} type={object["type"]} width="50px" className="clef" />
                case "time":
                    len+=30;
                    return <Time key={index} type={object["type"]} width="30px" className="time"/>
            }
        })}
    </div>
    )
}
export default function Stave ({fromTo, data, setData, activeTool, barPointer, setBarPointer, lastEditedBar, setLastEditedBar, newestID, setNewestID}){
    function fillSpaceInBar(barObject){
        let filledplace=0;
        for(let i=0;i<barObject.length;i++){
            filledplace+=28+barObject[i]["marginLeft"];
        }
        return filledplace;
    }
    function deleteSign(){
        setData(currentData =>{
            return {...currentData,"composition":currentData["composition"].map(object=>{   
                if(object["index"]=="bar"+lastEditedBar["bar"]){
                    return {...object,"content":object["content"].filter(sign => !(sign["sign"].includes("_newSign")))}
                }
                return object;
            })}
        })
    }
    function updateCoordinatesOfNewSigniture(event,tone) {
        if(activeTool!=null){
            deleteSign();
            // deletes the old inserted sign
            setData(currentData =>{
                    return {...currentData,"composition":currentData["composition"].map(object=>{
                        if(object["index"]=="bar"+barPointer){
                            let idofLastSignInBar, x, coordinates;
                            if(object["content"].at(-1)){
                                //if the bar already contains a sign then get the distance from that sign
                                idofLastSignInBar = object["content"].at(-1)["id"]
                                coordinates = document.getElementById(idofLastSignInBar).getBoundingClientRect();
                                x = event.clientX-coordinates.left-42;
                            }else{ 
                                //otherwise get it from left border of bar
                                coordinates = document.getElementById("bar"+barPointer).getBoundingClientRect();
                                x=event.clientX-coordinates.left-12;
                            }
                            let filledplace = fillSpaceInBar(object["content"]);
                            if(x+28+filledplace+(-x>0?-x:0)>100){
                                object["width"]=filledplace+x+28+(-x>0?-x:0);
                                // console.log(x+28,filledplace,-x);
                            }
                            object["content"].push({
                                "sign":activeTool+"_newSign",
                                "tone":tone,
                                "id":newestID,
                                "marginLeft":x>0?x:0});
                        }
                        return object;
                    })}
            })//insets new sign
            setLastEditedBar({"bar":barPointer,"sign":newestID})
        }
    }
    function onMouseLeave(){
        deleteSign();
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
        setNewestID(newestID+1)
    }
    let portionOfNeededData = [...data["composition"]].splice(fromTo[0],fromTo[1])
    return (
        <div className={styles.stave}>
            <Space tone={18} onMouseDown={setFirmly_ontoStave} onMouseLeave={onMouseLeave} onMouseMove={updateCoordinatesOfNewSigniture}/>
            <Space tone={17} onMouseDown={setFirmly_ontoStave} onMouseLeave={onMouseLeave} onMouseMove={updateCoordinatesOfNewSigniture}/>
            <Space tone={16} onMouseDown={setFirmly_ontoStave} onMouseLeave={onMouseLeave} onMouseMove={updateCoordinatesOfNewSigniture}/>
            <Space tone={15} onMouseDown={setFirmly_ontoStave} onMouseLeave={onMouseLeave} onMouseMove={updateCoordinatesOfNewSigniture}/>
            <Space tone={14} onMouseDown={setFirmly_ontoStave} onMouseLeave={onMouseLeave} onMouseMove={updateCoordinatesOfNewSigniture}/>
            <Space tone={13} onMouseDown={setFirmly_ontoStave} onMouseLeave={onMouseLeave} onMouseMove={updateCoordinatesOfNewSigniture}/>
            <Space tone={12} onMouseDown={setFirmly_ontoStave} onMouseLeave={onMouseLeave} onMouseMove={updateCoordinatesOfNewSigniture}/>
            <Space tone={11} onMouseDown={setFirmly_ontoStave} onMouseLeave={onMouseLeave} onMouseMove={updateCoordinatesOfNewSigniture}/>

            <Line  tone={10} onMouseDown={setFirmly_ontoStave} onMouseLeave={onMouseLeave} onMouseMove={updateCoordinatesOfNewSigniture}/>
            <Space tone={9}  onMouseDown={setFirmly_ontoStave} onMouseLeave={onMouseLeave} onMouseMove={updateCoordinatesOfNewSigniture}/>
            <Line  tone={8}  onMouseDown={setFirmly_ontoStave} onMouseLeave={onMouseLeave} onMouseMove={updateCoordinatesOfNewSigniture}/>
            <Space tone={7}  onMouseDown={setFirmly_ontoStave} onMouseLeave={onMouseLeave} onMouseMove={updateCoordinatesOfNewSigniture}/>
            <Line  tone={6}  onMouseDown={setFirmly_ontoStave} onMouseLeave={onMouseLeave} onMouseMove={updateCoordinatesOfNewSigniture}/>
            <Space tone={5}  onMouseDown={setFirmly_ontoStave} onMouseLeave={onMouseLeave} onMouseMove={updateCoordinatesOfNewSigniture}/>
            <Line  tone={4}  onMouseDown={setFirmly_ontoStave} onMouseLeave={onMouseLeave} onMouseMove={updateCoordinatesOfNewSigniture}/>
            <Space tone={3}  onMouseDown={setFirmly_ontoStave} onMouseLeave={onMouseLeave} onMouseMove={updateCoordinatesOfNewSigniture}/>
            <Line  tone={2}  onMouseDown={setFirmly_ontoStave} onMouseLeave={onMouseLeave} onMouseMove={updateCoordinatesOfNewSigniture}/>

            <Space tone={1}  onMouseDown={setFirmly_ontoStave} onMouseLeave={onMouseLeave} onMouseMove={updateCoordinatesOfNewSigniture}/>
            <Space tone={0}  onMouseDown={setFirmly_ontoStave} onMouseLeave={onMouseLeave} onMouseMove={updateCoordinatesOfNewSigniture}/>
            <Space tone={-1} onMouseDown={setFirmly_ontoStave} onMouseLeave={onMouseLeave} onMouseMove={updateCoordinatesOfNewSigniture}/>
            <Space tone={-2} onMouseDown={setFirmly_ontoStave} onMouseLeave={onMouseLeave} onMouseMove={updateCoordinatesOfNewSigniture}/>
            <Space tone={-3} onMouseDown={setFirmly_ontoStave} onMouseLeave={onMouseLeave} onMouseMove={updateCoordinatesOfNewSigniture}/>
            <Space tone={-4} onMouseDown={setFirmly_ontoStave} onMouseLeave={onMouseLeave} onMouseMove={updateCoordinatesOfNewSigniture}/>
            <Space tone={-5} onMouseDown={setFirmly_ontoStave} onMouseLeave={onMouseLeave} onMouseMove={updateCoordinatesOfNewSigniture}/>
            <Space tone={-6} onMouseDown={setFirmly_ontoStave} onMouseLeave={onMouseLeave} onMouseMove={updateCoordinatesOfNewSigniture}/>
            <MusicalObjectsOnStave data={portionOfNeededData} setBarPointer={setBarPointer}/>
        </div>
    )
}