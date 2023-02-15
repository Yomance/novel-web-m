import {defineStore} from "pinia";
import {showToast} from "vant";

export const useCheckInStore = defineStore({
    id:'checkInStore',
    state:()=>({
        checkInTime: 0,
    }),
    getters:{
        isCheckIn():boolean{
            return this.checkInTime !== 0;
        }
    },
    actions:{
        checkIn(){
            this.checkInTime = Date.now();
            showToast({
                message:"签到成功",
                position: "bottom"
            })
        }
    }
})
