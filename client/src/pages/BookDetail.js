import { useState, useEffect } from 'react';
import { Descriptions, Button } from 'antd';
import { fetchData } from "../helper/FetchData";
import { useParams } from "react-router-dom";

// TODO: create basket, add basket items

const BookDetail = () => {
    const [bookData, setBookData] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetchData(`/api/books/details/${id}`).then((data) => {
            setBookData(data.BookDetails);
        }).catch((err) => console.log(err));
    }, [id])

    const handleAdd = () => {
        // JSON.parse(localStorage.getItem("basket"));
        // localStorage.setItem("basket",{})
    };

    return (
        <div className="App">
            <div className="detail-container">
                <div>
                    <Descriptions title={bookData?.title} bordered column={1}>
                        <Descriptions.Item label="Title">
                            {bookData?.title}</Descriptions.Item>
                        <Descriptions.Item label="Author">
                            {bookData?.author}</Descriptions.Item>
                        <Descriptions.Item label="About">
                            {bookData?.subtitle}</Descriptions.Item>
                        <Descriptions.Item label="Publisher">
                            {bookData?.publisher}</Descriptions.Item>
                        <Descriptions.Item label="Published">
                            {bookData?.published}</Descriptions.Item>
                        <Descriptions.Item label="Pages">
                            {bookData?.pages}</Descriptions.Item>
                        <Descriptions.Item label="Description">
                            {bookData?.description}</Descriptions.Item>
                        <Descriptions.Item label="Category">
                            {bookData?.category}</Descriptions.Item>
                        <Descriptions.Item label="Price">
                            {bookData?.price}</Descriptions.Item>
                    </Descriptions>
                </div>
                <div>
                    <img
                        style={{ height: 240, objectFit: "cover", margin: "20px" }}
                        alt="example"
                        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                    />
                    <Button
                        type="primary"
                        shape="round"
                        size={"large"}
                        onClick={handleAdd}
                    >
                        Add to Basket
                    </Button>
                </div>
            </div>
        </div >
    )
};

export default BookDetail;