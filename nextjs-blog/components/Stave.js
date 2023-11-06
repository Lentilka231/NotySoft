import styles from "../styles/whitepage.module.scss"
import {Note,Clef,Time} from "./SVG"
function Line({onMouseEnter}){

    return (
        <div onMouseEnter={onMouseEnter} className={styles.line}></div>
    )
}
function Space({onMouseEnter}){
    return (
        <div onMouseEnter={onMouseEnter} className={styles.space}></div>
    )
}

function Signs({rowData}){
    return (
            <div className={styles.signs} >
                {rowData.map((sign) =>{
                    switch (sign["sign"]){
                        case "note":
                            return <Note type={sign["type"]} width="20px" className="note"/>
                        case "clef":
                            return <Clef type={sign["type"]} width="50px" className="clef" />
                        case "time":
                            return <Time type={sign["type"]} width="30px" className="time"/>
                    }
                })}
            </div>
    )
}
export default function Stave ({rowData}){
    function abbc(){
        //console.log("ransomware");
    }
    return (
        <div className={styles.stave}>
            <Space onMouseEnter={abbc}/>
            <Space onMouseEnter={abbc}/>
            <Space onMouseEnter={abbc}/>
            <Space onMouseEnter={abbc}/>
            <Space onMouseEnter={abbc}/>
            <Space onMouseEnter={abbc}/>
            <Space onMouseEnter={abbc}/>
            <Space onMouseEnter={abbc}/>

            <Line onMouseEnter={abbc} />
            <Space onMouseEnter={abbc}/>
            <Line onMouseEnter={abbc}/>
            <Space onMouseEnter={abbc}/>
            <Line onMouseEnter={abbc}/>
            <Space onMouseEnter={abbc}/>
            <Line onMouseEnter={abbc}/>
            <Space onMouseEnter={abbc}/>
            <Line onMouseEnter={abbc}/>

            <Space onMouseEnter={abbc}/>
            <Space onMouseEnter={abbc}/>
            <Space onMouseEnter={abbc}/>
            <Space onMouseEnter={abbc}/>
            <Space onMouseEnter={abbc}/>
            <Space onMouseEnter={abbc}/>
            <Space onMouseEnter={abbc}/>
            <Space onMouseEnter={abbc}/>
            <Signs rowData={rowData}/>
        </div>
    )
}