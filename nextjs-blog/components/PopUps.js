import styles from "../styles/pop_ups.module.scss"
import React from "react"

export function PopUps({data, setData, popUpWindowIndex, setPopUpWindowIndex}){
    function hidePopUp(){
        setPopUpWindowIndex(-1);
    }
    return (
        <div
            className={styles.unclickableBackground}
            style={{"display":popUpWindowIndex>=0?"block":"none"}}>

            <AddMultipleBarsPopUp 
                data={data}
                setData={setData}
                isActive={popUpWindowIndex==0?true:false}
                hidePopUp={hidePopUp}
                />
        </div>
    )
}



export function AddMultipleBarsPopUp({data, setData, isActive, hidePopUp}){
    function onSubmitAddMultipleBars(formElements){
        let newBar = {
            "object":"bar",
            "index":"bar",
            "barWidth":data["settings"]["bar-min-width"],
            "rightBarLine":"line",
            "content":[]
        }
        let addingAtIndex;
        if(formElements.newBarsPosition.value=="atTheEnd"){
            addingAtIndex = data["composition"].length;
        }else if(formElements.newBarsPosition.value == "pointedBar"){
            // NEED COMPLETION!!!
        }
        setData(currentData =>{
            let composition = [...currentData["composition"]];

            for(let i = 0;i<formElements.numberOfNewBars.value;i++){
                composition.splice(addingAtIndex, 0, newBar);
            }
            return {...currentData,composition}
        })
        hidePopUp();
    }
    function handleSubmit(event){
        event.preventDefault();
        let form = event.currentTarget;
        onSubmitAddMultipleBars(form.elements);
    }
    function handleCancel(event){
        event.preventDefault();
        hidePopUp();
    }
    return (
        <div className={styles.addMultipleBarsWindow}
            style={{"display":isActive?"block":"none"}}>
            <h1>
                Add multiple bars
            </h1>
            <form action="" onSubmit={handleSubmit}>
                <div >
                    <label htmlFor="number">Number of bars: </label>
                    <input id="numberOfNewBars" defaultValue="1" className={styles.number} type="number"/>
                </div>
                <div>
                    <input className={styles.newBarsPosition} defaultChecked id="pointedBar" type="radio" name="newBarsPosition" value="pointedBar"/>
                    <label htmlFor="pointedBar">Put them after pointed bar</label><br/>
                    <input className={styles.newBarsPosition} id="atTheEnd" type="radio" name="newBarsPosition" value="atTheEnd"/>
                    <label htmlFor="atTheEnd">Put them at the end</label>
                </div>
                <input className={styles.buttons} type="submit" value="Submit"/>
                <button className={styles.buttons} onClick={(event)=>handleCancel(event)} style={{"right":"30px"}}>Cancel</button>
            </form>
        </div>
    )
}
