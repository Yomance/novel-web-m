import {Random} from "mockjs";
import {Book, randomBook} from "../type/book";
import {mMock} from "../util/mock";

export interface SearchViewModel {
    hotText: string[],
    hotBook: Book[],
}

function randomSearchViewModel():SearchViewModel{
    let hotText = [];
    for (let i = 0; i < Random.integer(6, 10); i++) {
        hotText.push(Random.ctitle(2, 8))
    }
    let hotBook = [];
    let number = 2000000;
    for (let i = 0; i < 10; i++) {
        number = Random.integer(100, number);
        const book = randomBook();
        book.searchNum = number;
        hotBook.push(book);
    }
    return{
        hotBook,
        hotText
    }
}

mMock<SearchViewModel>("/search/data", randomSearchViewModel());
mMock(/\/search\?kw=.*?/, [
    randomBook(),
    randomBook(),
    randomBook(),
    randomBook(),
    randomBook(),
    randomBook(),
    randomBook(),
    randomBook(),
    randomBook(),
    randomBook(),
]);
function bd(){
    let res:Book[] = [];
    if (Random.boolean()){
        for (let i = 0; i < 10; i++) {
            res.push(randomBook())
        }
    }
    return res;
}

mMock(/\/search\?kw=.*?&current=.*?/, bd())
