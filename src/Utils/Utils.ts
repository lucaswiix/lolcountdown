export function getEnumKeys(targetEnum:any):string[]{
    return Object.keys(targetEnum).filter(key => !isNaN(Number(key)));
}