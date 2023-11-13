import styles from "../styles/whitepage.module.scss"
import Stave from "./Stave"
import React, { useState } from 'react'
import json from "../public/composition.json"

export default function WhitePage({activeTool}) {
    const [data,setData]= useState(json);
    return (
        <div className={styles.WhitePage}>
            {data["Staves"].map(()=>(
                <Stave setData={setData} data={data} activeTool={activeTool}/>
            ))}
        </div>
    )
}