import { useEffect, useState } from "react";
import { fetchData } from "../helper/FetchData";
import BookCard from "../components/BookCard";
import { useHistory } from "react-router-dom";
import { Tag } from 'antd';
const { CheckableTag } = Tag;

const tagsData = ["Any", 'English', "German", 'Italian',
    'Arabic', 'French', "Spanish", "Russian", "Chinese", "Persian", "Japanese", "Greek"];

const BookList = () => {
    const [bookList, setBookList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [selectedTag, setSelectedTag] = useState("Any");
    let history = useHistory();

    useEffect(() => {
        fetchData("/api/books").then((data) => {
            setBookList(data);
            setFilteredList(data);
        }).catch(err => console.log(err))
    }, []);

    const handleClick = (id) => {
        history.push(`/bookdetail/${id}`);
    };

    const filterTheList = (tag) => {
        if (tag.toLowerCase() === "any") {
            setFilteredList(bookList);
        } else {
            setFilteredList(bookList.filter(item => item.language.toLowerCase() === tag.toLowerCase()));
        }
    }

    const handleChange = (tag, checked) => {
        const nextSelectedTag = checked ? tag : "Any";
        console.log('You are interested in: ', nextSelectedTag);
        setSelectedTag(nextSelectedTag);
        filterTheList(nextSelectedTag);
    }

    return (
        <div className="App">

            <div className="tags-box">
                <span style={{ fontWeight:"bold", paddingRight: 15, }}>
                    Language:
                </span>
                {tagsData.map(tag => (
                    <CheckableTag
                        style={{ fontSize: "1rem" }}
                        key={tag}
                        checked={selectedTag === tag}
                        onChange={checked => handleChange(tag, checked)}
                    >
                        {tag}
                    </CheckableTag>
                ))}
            </div>
            <div id="book_page" className="App">

                {
                    filteredList.map((item) => {
                        return (
                            <BookCard handleClick={handleClick} key={item?._id} book={item} />
                        );
                    })
                }
            </div>
        </div>
    )
};

export default BookList;