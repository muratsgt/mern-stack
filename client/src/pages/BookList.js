import React, { useState, useEffect } from "react";
import { MediaCard } from "../components/MediaCard";
import { Tag } from "antd";
import { fetchData } from "../helper/FetchData";

const { CheckableTag } = Tag;

const tagsData = ["all", "romance", "novel", "nature", "sciente", "tech"];

const BookList = () => {
  const [selectedTag, setSelectedTag] = useState(["all"]);
  const [bookList, setBookList] = useState([]);


  useEffect(() => {
    fetchData("/api/books").then((data) => {
      console.log("data", data);
      setBookList(data?.BookList);
    });
  }, []);

  const handleChange = (tag, checked) => {
    const nextSelectedTag = checked ? tag : "all";
    setSelectedTag(nextSelectedTag);
  };

  return (
    <div>
      <div className="book-filter">
        {tagsData.map((tag) => (
          <CheckableTag
            key={tag}
            checked={selectedTag.indexOf(tag) > -1}
            onChange={(checked) => handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
      </div>
      <div className="book-list-wrapper">
        {bookList?.length > 0 ?
          bookList.map((book) => {
            return (
              <MediaCard
                key={book?._id}
                title={book?.title}
                description={book?.author}
                imgSrc={`http://placeimg.com/140/200/animals`}
              />
            )
          })
          : null}
      </div>

    </div>
  );
};

export default BookList;
