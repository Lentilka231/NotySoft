export function getToolName(HTMLToolName){
    let i = HTMLToolName.indexOf("_");
    return HTMLToolName.substring(0,i)
}