import styles from "../styles/whitepage.module.scss"
import {Note,Clef,Time} from "./SVG"
import React from "react"
function Line({onMouseEnter}){
    return (
        <div onMouseEnter={(e) => onMouseEnter(e.target)} className={styles.line}></div>
    )
}
function Space({onMouseEnter}){
    return (
        <div onMouseEnter={(e) => onMouseEnter(e.target)} className={styles.space}></div>
    )
}
function Signs({object}){
    return(
        <>
        {object["content"].map((sign) =>{
            switch(sign["sign"]){
                case "note":
                    return <Note type={sign["type"]} width="28px" tone={sign["tone"]} className="note"/>
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
        {data.map((object) =>{
            switch (object["object"]){
                case "bar":
                    return (
                        <div className={styles.bar}>
                            <Signs object={object}/>
                            <div class={styles.barLine}></div>
                        </div>
                    )
                case "clef":
                    return <Clef type={object["type"]} width="50px" className="clef" />
                case "time":
                    return <Time type={object["type"]} width="30px" className="time"/>
            }
        })}
    </div>
    )
}
export default function Stave ({data, setData, activeTool}){
    function signitureEmerge(top){
        setData(currentData =>{
            return currentData
        })
        //console.log(top);
    }
    return (
        <div className={styles.stave}>
            <Space onMouseEnter={signitureEmerge}/>
            <Space onMouseEnter={signitureEmerge}/>
            <Space onMouseEnter={signitureEmerge}/>
            <Space onMouseEnter={signitureEmerge}/>
            <Space onMouseEnter={signitureEmerge}/>
            <Space onMouseEnter={signitureEmerge}/>
            <Space onMouseEnter={signitureEmerge}/>
            <Space onMouseEnter={signitureEmerge}/>

            <Line onMouseEnter={signitureEmerge} />
            <Space onMouseEnter={signitureEmerge}/>
            <Line onMouseEnter={signitureEmerge}/>
            <Space onMouseEnter={signitureEmerge}/>
            <Line onMouseEnter={signitureEmerge}/>
            <Space onMouseEnter={signitureEmerge}/>
            <Line onMouseEnter={signitureEmerge}/>
            <Space onMouseEnter={signitureEmerge}/>
            <Line onMouseEnter={signitureEmerge}/>

            <Space onMouseEnter={signitureEmerge}/>
            <Space onMouseEnter={signitureEmerge}/>
            <Space onMouseEnter={signitureEmerge}/>
            <Space onMouseEnter={signitureEmerge}/>
            <Space onMouseEnter={signitureEmerge}/>
            <Space onMouseEnter={signitureEmerge}/>
            <Space onMouseEnter={signitureEmerge}/>
            <Space onMouseEnter={signitureEmerge}/>
            <Objects data={data["composition"]}/>
        </div>
    )
}