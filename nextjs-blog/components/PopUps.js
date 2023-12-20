import styles from "../styles/pop_ups.module.scss"

export function AddMultipleBarsPopUp(){
    console.log("hellow")
    return (
        <div></div>
    )
}
export function PopUps(){
    console.log("hellow")
    return (
        <div className={styles.unclickableBackground}>
            <AddMultipleBarsPopUp/>
        </div>
    )
}