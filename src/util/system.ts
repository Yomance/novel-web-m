export interface System {
    /**
     * 设置系统亮度
     * @param size 亮度 1~100
     */
    brightness: (size: number) => void;
    /**
     * 系统亮度
     * @return 0-255 -1==>Exception
     */
    getSystemBrightness: () => number;

    /**
     * 剩余电量
     * @return 当前电池剩余电量
     */
    remainingBatteryCharge: () => number;

    /**
     * 获取状态栏高度
     *
     * @return 0 err
     */
    getStatusBarHeight(): number;

    /**
     * 设置状态栏文字颜色
     * @param color true白色;  false黑色;
     */
    setStatusBarColor(color: boolean): void;

    /**
     * 根据手机的分辨率从 dp 的单位 转成为 px(像素)
     */
    dp2px(dpValue: number): number;

    /**
     * 根据手机的分辨率从 px(像素) 的单位 转成为 dp
     */
    px2dp(pxValue: number): number;
}


class SystemImpl implements System{
    brightness(size:number){
        console.error("not have implements!");
    }
    getSystemBrightness(){
        return -1;
    }
    remainingBatteryCharge(){
        return 0;
    }

    dp2px(dpValue: number): number {
        console.error("not have implements!");
        return 0;
    }

    getStatusBarHeight(): number {
        return 0;
    }

    px2dp(pxValue: number): number {
        console.error("not have implements!");
        return 0;
    }

    setStatusBarColor(color: boolean): void {
        console.error("not have implements!");
    }
}


// @ts-ignore
export const system:System = window.java_native_method || new SystemImpl();
