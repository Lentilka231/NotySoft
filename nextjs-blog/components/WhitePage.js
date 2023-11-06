import styles from "../styles/whitepage.module.scss"
import Stave from "./Stave"
import React, { useState } from 'react'
import json from "../public/composure.json"
export default function WhitePage() {
    const [data,setData]= useState(json);
    
    return (
        <div className={styles.WhitePage}>
            {data.map((row)=>(
                <Stave key={row} rowData={row} />
            ))}
        </div>
    )
}