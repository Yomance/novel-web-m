import {Book} from "../../type/book";

export interface Banner{
    img:string;
    src:string;
}

export interface HomeViewModel {
    banners: Banner[],
    hot: Book[],
    newBook: Book[],
    recommend: Book[],
    random: Book[],
}
