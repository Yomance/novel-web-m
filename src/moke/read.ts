import Mock, {Random} from "mockjs";

Mock.mock(/\/chapter\/content.*?/, function (options){

    // @ts-ignore
    let {bid} = options.url.match(/bid=(?<bid>\d+)/).groups

    // @ts-ignore
    let {cnum} = options.url.match(/cnum=(?<cnum>\d+)/).groups

    let content = ``;
    let size = 0;
    const count = Random.integer(2900, 3200);
    while (size < count){
        let s = Random.cparagraph(1, 5);
        size+= s.length;
        content+=`<p id="${Random.guid().split('-')[0]}">${s}</p>`
    }

    return {
        code: 0,
        msg:'成功',
        data:{
            bid,
            cnum,
            name: Random.ctitle(2,8),
            buy: Random.boolean(),
            content
        },
    }
})
