import {Book} from "../../type/book";

export interface Banner{
    image:string,
    link?:string,
}

export interface HomeViewModel {
    banners: Banner[],
    hot: Book[],
    newBook: Book[],
    recommend: Book[],
    random: Book[],
}
