import { useState, useEffect, useContext } from 'react';
import { Descriptions, Button } from 'antd';
import { fetchData } from "../helper/FetchData";
import { useParams } from "react-router-dom";
// import { BasketContext } from '../context/BasketContext';
import { addToBasket } from '../helper/EditBasket';
import { AuthContext } from '../context/AuthContext';

// TODO: create basket, add basket items

const BookDetail = () => {
    const [bookData, setBookData] = useState([]);
    const { id } = useParams();
    const { isLoggedIn } = useContext(AuthContext);
    // const {setBasketItems} = useContext(BasketContext);

    useEffect(() => {
        fetchData(`/api/books/details/${id}`).then((data) => {
            setBookData(data);
        }).catch((err) => console.log(err));
    }, [id])

    const handleAdd = () => {
        addToBasket(id, isLoggedIn)
        // setBasketItems((prevItems)=>[...prevItems, {id:id, quantity:1}])
    };

    return (
        <div className="App" style={{ margin: "10px" }}>
            <div className="detail-container" >
                <div>
                    <div>
                        <img
                            style={{ height: 360, objectFit: "cover", margin: "20px" }}
                            alt="example"
                            src={"/" + bookData.imageLink}
                        />
                    </div>
                    <div style={{maxWidth:250}}>
                        <h3>{bookData?.title}</h3>
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
                <div className="bookinfo-box">
                    <Descriptions labelStyle={{fontWeight:"bold"}} bordered column={1}>
                        <Descriptions.Item label="Title">
                            {bookData?.title}</Descriptions.Item>
                        <Descriptions.Item label="Author">
                            {bookData?.author}</Descriptions.Item>
                        <Descriptions.Item label="Year">
                            {bookData?.year}</Descriptions.Item>
                        <Descriptions.Item label="Language">
                            {bookData?.language}</Descriptions.Item>
                        <Descriptions.Item label="Country">
                            {bookData?.country}</Descriptions.Item>
                        <Descriptions.Item label="Pages">
                            {bookData?.pages}</Descriptions.Item>
                        <Descriptions.Item label="Link">
                            {bookData?.link}</Descriptions.Item>
                        <Descriptions.Item label="Price">
                            {bookData?.price}</Descriptions.Item>
                    </Descriptions>

                </div>
                <div className="description-box">
                    <h3>About:</h3>
                    <p>
                        {bookData?.description}
                    </p>
                </div>
            </div>
        </div >
    )
};

export default BookDetail;