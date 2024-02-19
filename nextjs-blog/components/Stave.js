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
    function getLengthofBar(index, data, barWidth,filledSpace){
        if(index<data.length-1){
            //if the bar is not last
            return barWidth;
        }else{
            //if the bar is last on the stave
            return STAVE_WIDTH_LEGTH-filledSpace;
        }
    }
    const STAVE_WIDTH_LEGTH=970;
    let filledSpace=50;
    return (
    <div className={styles.signs} >
        <Clef key={0} type={"treble"} width="50px" className="clef" />
        {data.map((object,index) =>{
            switch (object["object"]){
                case "bar":
                    let barWidth = getLengthofBar(index, data, object["barWidth"], filledSpace);
                    filledSpace+=object["barWidth"];
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
                    filledSpace+=50;
                    return <Clef key={index} type={object["type"]} width="50px" className="clef" />
                case "time":
                    filledSpace+=30;
                    return <Time key={index} type={object["type"]} width="30px" className="time"/>
            }
        })}
    </div>
    )
}
export default function Stave ({fromTo, data, setData, activeTool, lastEditedBar, setLastEditedBar, newestID, setNewestID}){
    
    const MAXIMUM_EXPANSION = 15;
    const SIGN_WIDTH = 28;


    function deleteSign(){
        function getDelSignIndex (content){
            for(let i = 0;i<content.length;i++){
                if(content[i]["sign"].includes("_newSign")){
                    return i;
                }
            }
            return -1;
        }
        function filledSpaceInBarWithoutDelSign(barContent){
            let filledSpace = 0;
            barContent.forEach(sign =>{
                if(!(sign["sign"].includes("_newSign"))){
                    filledSpace += SIGN_WIDTH + sign["marginLeft"];
                }
            })
            return filledSpace;
        }
        function newBarWidth(newFilledSpace){
            let minBarWidth = data["settings"]["bar-min-width"]
            if(newFilledSpace<minBarWidth){
                return minBarWidth;
            }else{
                return newFilledSpace;
            }
        }
        // use to delete sign which is no yet in composition firmly set (-> deleting sign witch has sufix _newSign)
        setData(currentData =>{
            return {...currentData,"composition":currentData["composition"].map(object=>{   
                if(object["index"]=="bar"+lastEditedBar["bar"]){
                    let barWidth = object["barWidth"];
                    let delSignIndex = getDelSignIndex(object["content"]);
                    if(delSignIndex!=-1){
                        if(delSignIndex!=object["content"].length-1){
                            let delSignSpace = object["content"][delSignIndex]["marginLeftOfFollowingSign"];
                            //resets marginLeft to following Sign
                            object["content"][delSignIndex+1]["marginLeft"]=delSignSpace;
                        }
                        let newFilledSpace = filledSpaceInBarWithoutDelSign(object["content"]);
                        barWidth = newBarWidth(newFilledSpace);
                    }
                    return {...object, barWidth, "content":object["content"].filter(sign => !(sign["sign"].includes("_newSign")))}
                }
                return object;
            })}
        })
    }
    function updateCoordinatesOfNewSigniture(event,tone) {
        function distanceFromLeftLineBarToSign(pointedBarNumber, event){
            let barCoordinates = document.getElementById("bar"+pointedBarNumber).getBoundingClientRect();
            let distance = event.clientX-barCoordinates.left-SIGN_WIDTH/2;
            return distance
        }
        function getFilledSpaceInBar(barContent){
            let filledSpace = 0;
            for(let i = 0; i<barContent.length; i++){
                filledSpace += SIGN_WIDTH + barContent[i]["marginLeft"];
            }
            return filledSpace;
        }
        function getNewFilledSpaceInBarWhenSignIsInsertedAtTheEnd(filledSpace,distanceFromLeftLineBar){
            if(filledSpace>distanceFromLeftLineBar){
                return filledSpace+28
            }else{
                return distanceFromLeftLineBar+28;
            }
        }
        function getNewFilledSpaceInBarWhenSignIsInsertedInBetween(filledSpace, followingSignMarginLeft){
            if(followingSignMarginLeft>SIGN_WIDTH){
                return filledSpace;
            }else{
                return filledSpace+SIGN_WIDTH-followingSignMarginLeft;
            }
        }
        function getMarginLeftForLastSign(distanceFromLeftLineBar, currentBarWidth, filledSpace){
            let remainingSpaceWithoutNewSign = currentBarWidth - filledSpace;
            let neededSpaceForSign = SIGN_WIDTH-remainingSpaceWithoutNewSign>0?SIGN_WIDTH-remainingSpaceWithoutNewSign:0;
            let maxMargin = currentBarWidth + MAXIMUM_EXPANSION-SIGN_WIDTH+neededSpaceForSign;
            if(distanceFromLeftLineBar-filledSpace<0){
                //if cursor is more left than sign can go
                return 0;
            }else if (distanceFromLeftLineBar<maxMargin){
                //if cursor is not behind maximum, where the sign would not fit anymore.
                return distanceFromLeftLineBar-filledSpace;
            }else{
                //otherwise it's maximum possible marginLeft;
                return maxMargin-filledSpace;
            }
        }
        function getMarginLeftForMiddleSign(distanceFromLeftLineBar, filledSpaceBeforeSign, followingSignMarginLeft){
            let maxMargin = filledSpaceBeforeSign+followingSignMarginLeft-SIGN_WIDTH;
            if(distanceFromLeftLineBar<filledSpaceBeforeSign){
                //if we point before the new sign, marginLeft = 0;
                return 0;
            }else if(distanceFromLeftLineBar<maxMargin){
                //if we point in a distance shorter than maximum then marginLeft is pointedDistance - filledSpace
                return distanceFromLeftLineBar-filledSpaceBeforeSign;
            }else if(followingSignMarginLeft>SIGN_WIDTH){
                //if point after maximum but sign would normally fit
                return maxMargin-filledSpaceBeforeSign;
            }else{
                //if point after maximum but sign would not even fit normally
                return 0;
            }
        }
        function getNewBarWidth(currentBarWidth,filledSpace,newFilledSpace){
            let freeSpace = currentBarWidth-filledSpace;
            if (freeSpace<SIGN_WIDTH){
                //if there is not even place for sign
                let neededExpansionForSign = (SIGN_WIDTH-freeSpace);
                if(newFilledSpace<currentBarWidth+neededExpansionForSign+MAXIMUM_EXPANSION){
                    //if newFilledSpace is smaller than maximum resize
                    return newFilledSpace;
                }else{
                    return currentBarWidth+MAXIMUM_EXPANSION+neededExpansionForSign;
                }
            }else{
                //if there's still a place for new sign
                if(newFilledSpace<currentBarWidth){
                    //if it can fit without resizing
                    return currentBarWidth;
                }else if(newFilledSpace<currentBarWidth+MAXIMUM_EXPANSION){
                    //if expanding is smaller than maximum
                    return newFilledSpace;
                }else{
                    return currentBarWidth+MAXIMUM_EXPANSION;
                }
            }
        }
        function getNewSignPositionIndex(barContent,distanceFromLeftLineBar){
            let filledSpaceBeforNewSign = 0;
            for(let i=0;i<barContent.length;i++){
                if(distanceFromLeftLineBar<filledSpaceBeforNewSign+barContent[i]["marginLeft"]+SIGN_WIDTH/3){
                    return i;
                }
                filledSpaceBeforNewSign+=SIGN_WIDTH+barContent[i]["marginLeft"];
            }
            return barContent.length;
        }
        function getFilledSpaceBeforeNewSign(barContent,distanceFromLeftLineBar){
            let filledSpaceBeforNewSign = 0;
            for(let i=0;i<barContent.length;i++){
                if(distanceFromLeftLineBar<filledSpaceBeforNewSign+barContent[i]["marginLeft"]+SIGN_WIDTH/3){
                    return filledSpaceBeforNewSign;
                }
                filledSpaceBeforNewSign+=SIGN_WIDTH+barContent[i]["marginLeft"];
            }
            return filledSpaceBeforNewSign;
        }
        function getFollowingSignNewMarginLeft(newSignMarginLeft,folowingSignCurrentMarginLeft){
            let newMarginLeft = folowingSignCurrentMarginLeft-(newSignMarginLeft+SIGN_WIDTH);
            if(newMarginLeft>0){
                return newMarginLeft;
            }else{
                return 0;
            }
        }

        let allElementsPointedByCursor = document.elementsFromPoint(event.clientX,event.clientY);

        let pointedBar = allElementsPointedByCursor.filter(elem => elem.id.includes("bar"))[0]
        //if user has selected tool and we know bar he is pointing at, then...
        if(activeTool!=null && pointedBar){
            // deletes the old inserted sign
            deleteSign();


            let pointedBarNumber = pointedBar.id.replace("bar","");
            setData(currentData =>{
                    let barWidth, content;
                    return {...currentData,"composition":currentData["composition"].map(object=>{
                        if(object["index"]=="bar"+pointedBarNumber){                            

                            let distanceFromLeftLineBar = distanceFromLeftLineBarToSign(pointedBarNumber, event);
                            let filledSpace = getFilledSpaceInBar(object["content"]);
                            let currentBarWidth = object["barWidth"];                            

                            let positionInBar = getNewSignPositionIndex(object["content"], distanceFromLeftLineBar);
                            //both important
                            let marginLeft, marginLeftOfFollowingSign, newFilledSpace;
                            content = [...object["content"]];

                            if(positionInBar != object["content"].length){
                                //if the new sign is put before last position
                                let filledSpaceBeforNewSign = getFilledSpaceBeforeNewSign(object["content"], distanceFromLeftLineBar);
                                
                                marginLeftOfFollowingSign = object["content"][positionInBar]["marginLeft"];
                                marginLeft = getMarginLeftForMiddleSign(distanceFromLeftLineBar, filledSpaceBeforNewSign, marginLeftOfFollowingSign)
                                newFilledSpace = getNewFilledSpaceInBarWhenSignIsInsertedInBetween(filledSpace, marginLeftOfFollowingSign);
                                //important
                                content[positionInBar]["marginLeft"] = getFollowingSignNewMarginLeft(marginLeft, marginLeftOfFollowingSign);
                            }else{
                                newFilledSpace = getNewFilledSpaceInBarWhenSignIsInsertedAtTheEnd(filledSpace, distanceFromLeftLineBar);
                                
                                //if the new sign is put on last position
                                marginLeftOfFollowingSign = 0;
                                marginLeft = getMarginLeftForLastSign(distanceFromLeftLineBar, currentBarWidth, filledSpace);
                            }

                            //important (a variable which is important is being remembered)
                            barWidth = getNewBarWidth(currentBarWidth, filledSpace, newFilledSpace);

                            content.splice(positionInBar,0,{
                                "sign":activeTool+"_newSign",
                                "tone":tone,
                                "id":newestID,
                                "marginLeft":marginLeft,
                                "marginLeftOfFollowingSign":marginLeftOfFollowingSign});
                            return {...object, barWidth, content};
                        }
                        return object;
                    })}
            })//insets new sign
            setLastEditedBar({"bar":pointedBarNumber,"sign":newestID})
        }
    }
    function mouseLeavesStave(){
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
    let portionOfNeededData = [...data["composition"]].slice(fromTo[0],fromTo[1]+1);
    console.log("babababaab: ",fromTo,portionOfNeededData,[...data["composition"]]);
    return (
        <div className={styles.stave}>
            <Space tone={18} onMouseDown={setFirmly_ontoStave} onMouseLeave={mouseLeavesStave} onMouseMove={updateCoordinatesOfNewSigniture}/>
            <Space tone={17} onMouseDown={setFirmly_ontoStave} onMouseLeave={mouseLeavesStave} onMouseMove={updateCoordinatesOfNewSigniture}/>
            <Space tone={16} onMouseDown={setFirmly_ontoStave} onMouseLeave={mouseLeavesStave} onMouseMove={updateCoordinatesOfNewSigniture}/>
            <Space tone={15} onMouseDown={setFirmly_ontoStave} onMouseLeave={mouseLeavesStave} onMouseMove={updateCoordinatesOfNewSigniture}/>
            <Space tone={14} onMouseDown={setFirmly_ontoStave} onMouseLeave={mouseLeavesStave} onMouseMove={updateCoordinatesOfNewSigniture}/>
            <Space tone={13} onMouseDown={setFirmly_ontoStave} onMouseLeave={mouseLeavesStave} onMouseMove={updateCoordinatesOfNewSigniture}/>
            <Space tone={12} onMouseDown={setFirmly_ontoStave} onMouseLeave={mouseLeavesStave} onMouseMove={updateCoordinatesOfNewSigniture}/>
            <Space tone={11} onMouseDown={setFirmly_ontoStave} onMouseLeave={mouseLeavesStave} onMouseMove={updateCoordinatesOfNewSigniture}/>

            <Line  tone={10} onMouseDown={setFirmly_ontoStave} onMouseLeave={mouseLeavesStave} onMouseMove={updateCoordinatesOfNewSigniture}/>
            <Space tone={9}  onMouseDown={setFirmly_ontoStave} onMouseLeave={mouseLeavesStave} onMouseMove={updateCoordinatesOfNewSigniture}/>
            <Line  tone={8}  onMouseDown={setFirmly_ontoStave} onMouseLeave={mouseLeavesStave} onMouseMove={updateCoordinatesOfNewSigniture}/>
            <Space tone={7}  onMouseDown={setFirmly_ontoStave} onMouseLeave={mouseLeavesStave} onMouseMove={updateCoordinatesOfNewSigniture}/>
            <Line  tone={6}  onMouseDown={setFirmly_ontoStave} onMouseLeave={mouseLeavesStave} onMouseMove={updateCoordinatesOfNewSigniture}/>
            <Space tone={5}  onMouseDown={setFirmly_ontoStave} onMouseLeave={mouseLeavesStave} onMouseMove={updateCoordinatesOfNewSigniture}/>
            <Line  tone={4}  onMouseDown={setFirmly_ontoStave} onMouseLeave={mouseLeavesStave} onMouseMove={updateCoordinatesOfNewSigniture}/>
            <Space tone={3}  onMouseDown={setFirmly_ontoStave} onMouseLeave={mouseLeavesStave} onMouseMove={updateCoordinatesOfNewSigniture}/>
            <Line  tone={2}  onMouseDown={setFirmly_ontoStave} onMouseLeave={mouseLeavesStave} onMouseMove={updateCoordinatesOfNewSigniture}/>

            <Space tone={1}  onMouseDown={setFirmly_ontoStave} onMouseLeave={mouseLeavesStave} onMouseMove={updateCoordinatesOfNewSigniture}/>
            <Space tone={0}  onMouseDown={setFirmly_ontoStave} onMouseLeave={mouseLeavesStave} onMouseMove={updateCoordinatesOfNewSigniture}/>
            <Space tone={-1} onMouseDown={setFirmly_ontoStave} onMouseLeave={mouseLeavesStave} onMouseMove={updateCoordinatesOfNewSigniture}/>
            <Space tone={-2} onMouseDown={setFirmly_ontoStave} onMouseLeave={mouseLeavesStave} onMouseMove={updateCoordinatesOfNewSigniture}/>
            <Space tone={-3} onMouseDown={setFirmly_ontoStave} onMouseLeave={mouseLeavesStave} onMouseMove={updateCoordinatesOfNewSigniture}/>
            <Space tone={-4} onMouseDown={setFirmly_ontoStave} onMouseLeave={mouseLeavesStave} onMouseMove={updateCoordinatesOfNewSigniture}/>
            <Space tone={-5} onMouseDown={setFirmly_ontoStave} onMouseLeave={mouseLeavesStave} onMouseMove={updateCoordinatesOfNewSigniture}/>
            <Space tone={-6} onMouseDown={setFirmly_ontoStave} onMouseLeave={mouseLeavesStave} onMouseMove={updateCoordinatesOfNewSigniture}/>
            <MusicalObjectsOnStave data={portionOfNeededData}/>
        </div>
    )
}