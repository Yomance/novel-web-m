export default {};
// @ts-ignore
import Mock, {Random, templateOrFn} from 'mockjs'
import "./home";
import "./search";
import "./bookshelf";
import "./read";
import "./classify";
Mock.setup({
    timeout: '200-1200'
})

Mock.mock("/api/login",  {
    code: 0,
    msg: '成功',
    data:{
        "token|32":"",
        tokenName:'token',
        tokenTimeOut: 1000,
        username: 'Yomance',
        id: '1',
        avatar: '/src/assets/image/avatar/boy.png',
    }
})
Mock.mock("/api/logout",  {
    code: 0,
    msg: '成功',
    data: null
})

Mock.mock(/\/book?id=(?<id>\d+)/, {

})





