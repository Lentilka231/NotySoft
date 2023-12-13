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
                    return <Note 
                                key={index} 
                                data={{...sign}} 
                                type={getSignType(signName)}
                                width="28px" 
                                tone={sign["tone"]} 
                                marginLeft={sign["marginLeft"]} 
                                className="note"/>
                case "pause":
                    return;
            }
        })}
        </>
    )
}
function MusicalObjectsOnStave({data}){
    const STAVE_WIDTH_LEGTH=970;
    let len=0;
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
export default function Stave ({fromTo, data, setData, activeTool, lastEditedBar, setLastEditedBar, newestID, setNewestID,compositionSettings}){
    function fillSpaceInBar(barObject){
        let filledSpace=0;
        for(let i=0;i<barObject.length;i++){
            filledSpace+=28+barObject[i]["marginLeft"];
        }
        return filledSpace;
    }
    function deleteSign(){
        // use to delete sign which is no yet in composition firmly set (-> deleting sign witch has sufix _newSign)
        setData(currentData =>{
            return {...currentData,"composition":currentData["composition"].map(object=>{   
                if(object["index"]=="bar"+lastEditedBar["bar"]){
                    let width=object["width"];
                    let delSign=object["content"].filter(sign => (sign["sign"].includes("_newSign")));
                    if(delSign.length>0){
                        let delSignWidth = delSign[0].marginLeft+24;
                        if(object["width"]-delSignWidth>compositionSettings["bar-min-width"]){
                            width=object["width"]-delSignWidth;
                        }else{
                            width=compositionSettings["bar-min-width"];
                        }
                    }
                    return {...object,width,"content":object["content"].filter(sign => !(sign["sign"].includes("_newSign")))}
                }
                return object;
            })}
        })
    }
    function updateCoordinatesOfNewSigniture(event,tone) {
        let allElementsPointedByCursor = document.elementsFromPoint(event.clientX,event.clientY);
        let pointedSigns = allElementsPointedByCursor.filter(elem => elem.id.includes("sign"))
        //console.log(pointedSign);
        let pointedBar = allElementsPointedByCursor.filter(elem => elem.id.includes("bar"))[0]
        //if user has selected tool and we know bar he is pointing at then...
        if(activeTool!=null && pointedBar){
            // deletes the old inserted sign
            deleteSign();
            let pointedBarNumber = pointedBar.id.replace("bar","");
            setData(currentData =>{
                    let width, content;
                    return {...currentData,"composition":currentData["composition"].map(object=>{
                        if(object["index"]=="bar"+pointedBarNumber){

                            let idofLastSignInBar, leftSideDistance, coordinates;
                            if(object["content"].at(-1)){
                                //if the bar already contains a sign then get the distance from that sign
                                idofLastSignInBar = object["content"].at(-1)["id"];
                                coordinates = document.getElementById("sign"+idofLastSignInBar).getBoundingClientRect();
                                leftSideDistance = event.clientX-coordinates.left-42;
                            }else{ 
                                //otherwise get it from left border of bar
                                coordinates = document.getElementById("bar"+pointedBarNumber).getBoundingClientRect();
                                leftSideDistance=event.clientX-coordinates.left-12;
                            }

                            
                            let filledSpace = fillSpaceInBar(object["content"]);
                            let newFilledSpace = leftSideDistance+28+filledSpace+(-leftSideDistance>0?-leftSideDistance:0);
                            let marginLeft;
                            // preparing new width for bar
                            if(newFilledSpace>compositionSettings["bar-min-width"]){
                                
                                //freesSpace is distance between filledspace+newsign (without leftmargin) and 15px after end
                                let freeSpace = compositionSettings["bar-min-width"]-newFilledSpace+leftSideDistance;
                                freeSpace=freeSpace>0?freeSpace+15:15;

                                if (leftSideDistance>freeSpace){
                                    width = newFilledSpace-leftSideDistance+(freeSpace>0?freeSpace:15);
                                    marginLeft = freeSpace>0?freeSpace:15;
                                }else{
                                    width = newFilledSpace;
                                    marginLeft = leftSideDistance>0?leftSideDistance:0
                                }
                            }else{
                                width = compositionSettings["bar-min-width"];
                                marginLeft = leftSideDistance>0?leftSideDistance:0
                            }
                            let pointedForeignSignID=0;
                            let positionInBar=object["content"].length;
                            pointedSigns.forEach((elem,i)=>{
                                let idOfSign = elem.id.replace("sign","")
                                if(idOfSign != newestID){
                                    pointedForeignSignID = idOfSign;
                                }
                            })
                            if(pointedForeignSignID){
                                for(let i=0;i<object["content"].length;i++){
                                    if(object["content"][i].id==pointedForeignSignID){
                                        positionInBar=i
                                    }
                                }
                                console.log(pointedForeignSignID);
                            }
                            //making a copied object width new sign;
                            content = [...object["content"]];
                            content.splice(positionInBar,0,{
                                "sign":activeTool+"_newSign",
                                "tone":tone,
                                "id":newestID,
                                "marginLeft":marginLeft});
                            return {...object,width,content};
                        }
                        return object;
                    })}
            })//insets new sign
            setLastEditedBar({"bar":pointedBarNumber,"sign":newestID})
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
            <MusicalObjectsOnStave data={portionOfNeededData}/>
        </div>
    )
}