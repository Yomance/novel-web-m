import Mock, {Random} from "mockjs";
import {Page, Result} from "../api";
import {Book, Category, randomBook, randomCategory, randomTag, Tag} from "../type/book";
import {mMock} from "../util/mock";


export default {};

const map = new Map();

Mock.mock(/\/classify\/page\?id=.*?&current=.*?/, options => {
    // @ts-ignore
    const id = options.url.match(/\?id=(?<id>\d+)/).groups.id;
    // @ts-ignore
    const current = parseInt(options.url.match(/current=(?<c>\d+)/).groups.c);
    let val: any = map.get(id);
    if (!val) {
        let count = Random.integer(10, 100);
        let pageCount = Math.ceil(count / 10);
        val = {count, pageCount}
        map.set(id, val);
    }
    let books: Book[] = [];
    if (current <= val.pageCount) {
        let end = current * 10;
        let start = end - 9;
        if (end > val.count) {
            end = val.count;
        }
        for (let i = start; i <= end; i++) {
            books.push(randomBook());
        }
    }


    let res: Result<Page<Book>> = {
        code: 0,
        msg: "",
        data: {
            pageCount: val.pageCount,
            count: val.count,
            current,
            size: 10,
            data: books,
        }
    }
    return res;
})


export interface ClassifyViewModel {
    categories: Category[],
    tags: Tag[]
}

function model(): ClassifyViewModel {
    const categories: Category[] = [];
    for (let i = 0; i < 8; i++) {
        categories.push(randomCategory());
    }
    let tags: Tag[] = [];
    for (let i = 0; i < 56; i++) {
        tags.push(randomTag());
    }
    return {
        categories,
        tags,
    }
}

mMock<ClassifyViewModel>("/classify/boy", model())
mMock<ClassifyViewModel>("/classify/girl", model())
