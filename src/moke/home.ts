import Mock, {Random} from "mockjs";

export default {};
import {Book, randomBook} from "../type/book";
import {mMock} from "../util/mock";




mMock("/home", {
    banners: [
        {
            image: '/src/assets/image/banners/b0.jpg',
            link: "",
        },
        {
            image: '/src/assets/image/banners/b1.jpg',
            link: "",
        },
        {
            image: '/src/assets/image/banners/b2.jpg',
            link: "",
        },
        {
            image: '/src/assets/image/banners/b3.jpg',
            link: "",
        },
        {
            image: '/src/assets/image/banners/b4.jpg',
            link: "",
        }
    ],
    hot: [
        randomBook(),
        randomBook(),
        randomBook(),
        randomBook(),
    ],
    newBook: [
        randomBook(),
        randomBook(),
        randomBook(),
        randomBook(),
    ],
    recommend: [
        randomBook(),
        randomBook(),
        randomBook(),
        randomBook(),
    ],
    random: [
        randomBook(),
        randomBook(),
        randomBook(),
        randomBook(),
    ]
})
mMock("/home/random", [
    randomBook(), randomBook(),
    randomBook(), randomBook(),
    randomBook(), randomBook(),
    randomBook(), randomBook(),
])

