import styles from "../styles/whitepage.module.scss"
import Stave from "./Stave"
import React, { useState } from 'react'
import json from "../public/composition.json"

export default function WhitePage({activeTool}) {
    const [data,setData]= useState(json);
    const [barPointer,setBarPointer] = React.useState(1);
    const [lastEditedBar,setLastEditedBar] = React.useState(1);
    return (
        <div className={styles.WhitePage}>
            {data["Staves"].map((index)=>(
                <Stave key={index} 
                    setData={setData}
                    data={data}
                    activeTool={activeTool}
                    barPointer={barPointer}
                    lastEditedBar={lastEditedBar}
                    />
            ))}
        </div>
    )
}