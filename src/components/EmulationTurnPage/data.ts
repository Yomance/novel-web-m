import {Chapter} from "./DataContainer";

const data = `随着那被陆叶针对的星宿中期的淘汰，两边队伍剩下的九人都意识到了一件事，这忽然闯过来的残疾小队可不单单只是来看热闹的，人家是来搞事的，而且实力还相当了得。
陆叶的术法又一次铺展了出去，这一次针对的是另外一个星宿中期，前车之鉴，后事之师，这人察觉不妙想要躲避，可依然慢了一步，仓促间抵挡了几道术法便已没了余力，眼瞅着即将赴同伴后尘，一道魁梧身影悍然冲到他身前，周身气血澎湃涌动，在这魁梧身影的身侧膨胀出一层血色虚影，化作凝实防护。
赫然是这个队伍的体修见状前来护持。
诸多术法轰至，打的那血色虚影一阵摇晃，体修瞠目，方才只见有人被淘汰，知道人家实力不弱，直到此刻亲身感受到了，方明来敌的强大。
若非他是个体修，防护凝厚，换做其他人，未必挡得住。
明明施展术法的只是一个星宿中期而已……
更让他瞠目的还在后面，因为那残疾小队的三人没有任何改变方向的意思，就这么直直地朝他撞了过来。
剩下几人皆都各自道谢，退出此间。
刹那间，原本混乱的战场天清地明。
(本章完)`;
const d = data.split("\n").map(s => ({id: "1", val: s}));

export const getData = () => d;

const list = [
    {
        id: "1",
        name: "1",
        content: 1+data+1,
        isFirst: true,
        isFinal: false,
    },
    {
        id: "2",
        name: "2",
        content: 2+data+2,
        isFirst: false,
        isFinal: false,
    },
    {
        id: "3",
        name: "3",
        content: 3+data+3,
        isFirst: false,
        isFinal: true,
    }
]
export const staticData = list[1];

export const lastChapter = ()=>{
    return new Promise<Chapter>((resolve, reject) => {
        setTimeout(() => {
            resolve(list[0])
        }, 3000);
    });
}
export const nextChapter = ()=>{
    return new Promise<Chapter>((resolve, reject) => {
        setTimeout(() => {
            resolve(list[2])
        }, 3000);
    });
}

export const getChapter = () => {
    return new Promise<Chapter>((resolve, reject) => {
        setTimeout(() => {
            console.log("load finish")
            resolve({
                id: "1",
                name: "1",
                content: data,
                isFirst: false,
                isFinal: false,
            })
        }, 3000);
    });
}