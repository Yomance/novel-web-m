import {mMock} from "../util/mock";
import Mock, {Random} from "mockjs";
import {randomBook} from "../type/book";


function books(){
    let books = [];
    for (let i = 0; i < Random.integer(10, 20); i++) {
        books.push(randomBook())
    }
    return books;
}


mMock("/bookshelf/list", books())
Mock.mock(/\/bookshelf\/add.*?/, options => {
    // @ts-ignore
    const bid = options.url.match(/bid=(?<bid>\d+)/).groups.bid;
    return {
        code: 0,
        msg: '',
        data: randomBook(bid)
    }
})
mMock(/\/bookshelf\/remove?.*?/, null)
