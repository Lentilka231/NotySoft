import styles from "../styles/whitepage.module.scss"
import Stave from "./Stave"
import React, { useState } from 'react'

const StaveWidth= 970;
export default function WhitePage({activeTool, data, setData}) {
    function separateStaves(){
        let separatedStaves=[];
        let imaginarilyFilledSpace = 0;
        let firstBar = 0;
        let numberOfBars = data["composition"].length;

        for(let i=0; i<numberOfBars; i++){
            if(imaginarilyFilledSpace+ data["composition"][i]["barWidth"]>=StaveWidth){
                separatedStaves.push([firstBar,i-1]);
                imaginarilyFilledSpace = 0;
                firstBar = i;
            }
            imaginarilyFilledSpace += data["composition"][i]["barWidth"];
        }

        if(imaginarilyFilledSpace>0){
            separatedStaves.push([firstBar, numberOfBars-1]);
        }
        return separatedStaves;
    }
    const [lastEditedBar, setLastEditedBar] = React.useState({"bar":null, "sign":null});
    const [newestID, setNewestID] = React.useState(data["newestID"]);
    const separatedBarsIndexes = separateStaves();
    console.log("--------------------------------------zacatek------------------;");
    return (
        <div className={styles.WhitePage}>
            {separatedBarsIndexes.map((v,i)=>{
                return(<Stave key={i}
                        setData={setData}
                        data={data}
                        fromTo={v}
                        activeTool={activeTool}
                        lastEditedBar={lastEditedBar}
                        setLastEditedBar={setLastEditedBar}
                        newestID={newestID}
                        setNewestID={setNewestID}
                        />)
                })}
        </div>
    )
}
