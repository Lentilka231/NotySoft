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
    function signitureEmerge(top){
        setData(currentData =>{
            console.log(currentData)

            return currentData["staves"]+currentData["composition"].map((k) =>{
                return {...k};
            })
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