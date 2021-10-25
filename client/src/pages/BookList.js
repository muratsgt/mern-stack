import { useEffect, useState } from "react";
import { fetchData } from "../helper/FetchData";
import BookCard from "../components/BookCard";
import {useHistory} from "react-router-dom";

// TODO: add filter

const BookList = () => {
    const [bookList, setBookList] = useState([]);
    let history = useHistory();

    useEffect(() => {
        fetchData("/api/books").then((data) => {
            setBookList(data?.BookList);
        }).catch(err => console.log(err))
    }, []);

    const handleClick = (id) => {
        history.push(`/bookdetail/${id}`);
    };


    return (
        <div id="book_page" className="App">
            {
                bookList.map((item) => {
                    return (
                        <BookCard handleClick={handleClick}  key={item?._id} book={item} />
                    );
                })
            }
        </div>
    )
};

export default BookList;