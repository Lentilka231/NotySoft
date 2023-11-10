import styles from "../styles/whitepage.module.scss"
import {Note,Clef,Time} from "./SVG"
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
                    return <Note type={sign["type"]} width="30px" tone={sign["tone"]} className="note"/>
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
                    return <Signs object={object}/>
                case "clef":
                    return <Clef type={object["type"]} width="50px" className="clef" />
                case "time":
                    return <Time type={object["type"]} width="30px" className="time"/>
            }
        })}
    </div>
    )
}
export default function Stave ({data, setData}){
    function signitureEmerge(top){
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