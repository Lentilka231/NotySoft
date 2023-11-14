import styles from "../styles/whitepage.module.scss"
import {Note,Clef,Time} from "./SVG"
import React from "react"
function Line({onMouseEnter,tone}){
    return (
        <div onMouseEnter={() => onMouseEnter(tone)} className={styles.line}></div>
    )
}
function Space({onMouseEnter,tone}){
    return (
        <div onMouseEnter={() => onMouseEnter(tone)} className={styles.space}></div>
    )
}
function Signs({object}){
    return(
        <>
        {object["content"].map((sign,index) =>{
            switch(sign["sign"]){
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
export default function Stave ({data, setData, activeTool, barPointer}){
    function addNewSigniture(tone){
        setData(currentData =>{
            return {...currentData,"composition":currentData["composition"].map(k=>{
                if(k["index"]=="bar"+barPointer){
                    k["content"].push({"sign":"note","type":activeTool,"tone":tone})
                }
                return k
            })}

        })
    }
    function removeNewSigniture(){

    }
    return (
        <div className={styles.stave}>
            <Space onMouseEnter={addNewSigniture} tone={18}/>
            <Space onMouseEnter={addNewSigniture} tone={17}/>
            <Space onMouseEnter={addNewSigniture} tone={16}/>
            <Space onMouseEnter={addNewSigniture} tone={15}/>
            <Space onMouseEnter={addNewSigniture} tone={14}/>
            <Space onMouseEnter={addNewSigniture} tone={13}/>
            <Space onMouseEnter={addNewSigniture} tone={12}/>
            <Space onMouseEnter={addNewSigniture} tone={11}/>

            <Line onMouseEnter={addNewSigniture} tone={10}/>
            <Space onMouseEnter={addNewSigniture} tone={9}/>
            <Line onMouseEnter={addNewSigniture} tone={8}/>
            <Space onMouseEnter={addNewSigniture} tone={7}/>
            <Line onMouseEnter={addNewSigniture} tone={6}/>
            <Space onMouseEnter={addNewSigniture} tone={5}/>
            <Line onMouseEnter={addNewSigniture} tone={4}/>
            <Space onMouseEnter={addNewSigniture} tone={3}/>
            <Line onMouseEnter={addNewSigniture} tone={2}/>

            <Space onMouseEnter={addNewSigniture} tone={1}/>
            <Space onMouseEnter={addNewSigniture} tone={0}/>
            <Space onMouseEnter={addNewSigniture} tone={-1}/>
            <Space onMouseEnter={addNewSigniture} tone={-2}/>
            <Space onMouseEnter={addNewSigniture} tone={-3}/>
            <Space onMouseEnter={addNewSigniture} tone={-4}/>
            <Space onMouseEnter={addNewSigniture} tone={-5}/>
            <Space onMouseEnter={addNewSigniture} tone={-6}/>
            <Objects data={data["composition"]}/>
        </div>
    )
}