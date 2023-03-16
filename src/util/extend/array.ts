declare global{
    interface Array<T>{
        /**
         * 二分查找下标
         * @param target
         */
        binaryIndexOf<T>(this: T[], target: T): number;

        /**
         * 清空元素内容
         */
        clear<T>(this: T[]): void;

        /**
         * 移除指定位置的元素
         * @param index index
         * @return value | undefined
         */
        removeIndex<T>(this: T[], index: number):T|void;

        /**
         * 清空并添加新元素
         * @param list
         */
        clearAndAddList<T>(this:T[], list:T[]):void;
    }
}
Array.prototype.binaryIndexOf = function<T>(this:T[], target:T):number{
    if (this.length <= 1) return -1
    // 低位下标
    let lowIndex = 0
    // 高位下标
    let highIndex = this.length - 1
    while (lowIndex <= highIndex) {
        // 中间下标
        const midIndex = Math.floor((lowIndex + highIndex) / 2)
        if (target < this[midIndex]) {
            highIndex = midIndex - 1
        } else if (target > this[midIndex]) {
            lowIndex = midIndex + 1
        } else {
            // target === arr[midIndex]
            return midIndex
        }
    }
    return -1
}
Array.prototype.clear = function<T>(this:T[]):void{
    this.splice(0, this.length);
}
Array.prototype.removeIndex = function<T>(this:T[], index:number):T|void{
    if (index < 0 || index >= this.length){
        return;
    }
    let res = this[index];
    this.splice(index, 1);
    return res;
}
Array.prototype.clearAndAddList = function<T>(this:T[], list:T[]):void{
    this.clear();
    this.push(...list);
}
export default {};