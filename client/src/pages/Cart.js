import { useContext, useEffect, useState } from "react";
// import { BasketContext } from "../context/BasketContext";
import { Table} from 'antd';
import { fetchData } from "../helper/FetchData";
import { AuthContext } from "../context/AuthContext";
import {removeFromBasket } from "../helper/EditBasket";
const { Column } = Table;

const Cart = () => {
    const [basketData, setBasketData] = useState([]);
    const { isLoggedIn } = useContext(AuthContext);

    // How to do it with Context
    // const { basketItems, setBasketItems } = useContext(BasketContext);
    // useEffect(() => {
    //     Promise.all(basketItems.map((item) => fetchData(`/api/books/details/${item.id}`)))
    //         .then(allItems => setBasketData(allItems))
    //         .then(console.log(basketData))
    //         .catch(err => console.log(err));
    // }, [basketItems]);

    useEffect(() => {
        // get data from localstorage
        const userCart = JSON.parse(localStorage.getItem(isLoggedIn ?? "default"));
        console.log("userCart: ", userCart?.basket);
        const tempBasket = [];
        if (userCart) {
            userCart?.basket.forEach((item) => {
                fetchData(`/api/books/details/${item._id}`)
                    .then((data) => {
                        tempBasket.push({ ...data, quantity: item.quantity });
                        setBasketData((prevdata => [...prevdata, { ...data, quantity: item.quantity }]))
                    })
            })
            // Promise.all(userCart?.basket.map(fetchAndAdd))
            //     .then(allItems => setBasketData(allItems))
            //     .then(console.log("BASKETDATA: ", basketData))
            //     .catch(err => console.log(err));
        }
    }, [isLoggedIn]);

    const updateBasket = (record) => {
        const itemIndex = basketData.findIndex(item => item._id === record._id);
        // return if item not exist
        if (itemIndex < 0) {
            return;
        }
        // update item quantity
        const tempBasket = [...basketData];
        const tempNum = basketData[itemIndex].quantity;
        if (tempNum > 1) {
            tempBasket[itemIndex].quantity = tempNum - 1
        } else {
            tempBasket.splice(itemIndex, 1);
        };
        setBasketData(tempBasket);
    }

    const handleDelete = (record) => {
        removeFromBasket(record._id, isLoggedIn);
        updateBasket(record);
    }

    return (
        <div className="App">
            <div style={{ padding: 30, backgroundColor: "gray" }}>
                <Table dataSource={basketData}>
                    <Column title="Book ID" dataIndex="_id" key="_id" />
                    <Column title="Title" dataIndex="title" key="_id" />
                    <Column title="Author" dataIndex="author" key="_id" />
                    <Column title="Price" dataIndex="price" key="_id" />
                    <Column title="Quantity" dataIndex="quantity" key="_id" />
                    <Column
                        title="Action"
                        key="_id"
                        render={(_, record) => <button onClick={() => handleDelete(record)}>
                            Delete</button>}
                    />
                </Table>
            </div>

        </div>
    )
};

export default Cart;