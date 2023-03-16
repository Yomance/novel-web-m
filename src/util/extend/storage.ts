// declare global {
//     interface Storage{
//         setAs<T>(key:string, value:T):void;
//         getAs<T>(key:string):T|null;
//     }
// }
// localStorage.setAs = function<T> (key:string, value:T){
//     const s = JSON.stringify(value);
//     this.setItem(key, s);
// }
// localStorage.getAs = function<T> (key:string):T|null{
//     const item = this.getItem(key);
//     if (item == null){
//         return null;
//     }
//     const parse = JSON.parse(item);
//     return <T>parse;
// }
// let a: Storage;
export default {};