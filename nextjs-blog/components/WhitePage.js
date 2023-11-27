import styles from "../styles/whitepage.module.scss"
import Stave from "./Stave"
import React, { useState } from 'react'
import json from "../public/composition.json"

export default function WhitePage({activeTool}) {
    const [data,setData]= useState(json);

    const [barPointer,setBarPointer] = React.useState(2);
    const [lastEditedBar,setLastEditedBar] = React.useState({"bar":null,"sign":null});
    const [newestID,setNewestID]=React.useState(data["newestID"]);
    
    return (
        <div className={styles.WhitePage}>
            {data["Staves"].map((i,n)=>{
                if(n<data["Staves"].length){
                    let fromTo=[i,data["Staves"][n+1]?data["Staves"][n+1]:data["composition"].length];
                    return(<Stave key={i} 
                            setData={setData}
                            data={data}
                            fromTo={fromTo}
                            activeTool={activeTool}
                            barPointer={barPointer}
                            setBarPointer={setBarPointer}
                            lastEditedBar={lastEditedBar}
                            setLastEditedBar={setLastEditedBar}
                            newestID={newestID}
                            setNewestID={setNewestID}
                            />)                            
                    }
                })}
        </div>
    )
}