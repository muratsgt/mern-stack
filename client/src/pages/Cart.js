import { useContext, useEffect, useState } from "react";
import { List, Avatar, Button } from 'antd';
import { fetchData } from "../helper/FetchData";
import { AuthContext } from "../context/AuthContext";
import { removeFromBasket } from "../helper/EditBasket";
import StripeCheckout from 'react-stripe-checkout';


const Cart = () => {
    const [basketData, setBasketData] = useState([]);
    const { isLoggedIn } = useContext(AuthContext);
    const [cost, setCost] = useState(0);

    const fetchAndAdd = (item) => fetchData(`/api/books/details/${item._id}`)
        .then((data) => {
            return { ...data, quantity: item.quantity }
        })

    useEffect(() => {
        // get data from localstorage
        const userCart = JSON.parse(localStorage.getItem(isLoggedIn ?? "default"));
        console.log("userCart: ", userCart?.basket);
        if (userCart) {
            Promise.all(userCart?.basket.map(fetchAndAdd))
                .then(allItems => {
                    setBasketData(allItems);
                    calculateCost(allItems);
                })
                .catch(err => console.log(err));
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
            tempBasket[itemIndex].quantity = tempNum - 1;
            tempBasket.splice(itemIndex, 1);
        };
        setBasketData(tempBasket);
    }

    const calculateCost = (basketData) => {
        let tempCost = 0;
        basketData.forEach(element => {
            tempCost += (element.quantity * element.price);
        });
        setCost(tempCost);
    }

    const handleDelete = async (record) => {
        await removeFromBasket(record._id, isLoggedIn);
        await updateBasket(record);
        calculateCost(basketData);
    }

    const onToken = (token) => {
        fetch('/save-stripe-token', {
            method: 'POST',
            body: JSON.stringify(token),
        }).then(response => {
            response.json().then(data => {
                alert(`We are in business, ${data.email}`);
            });
        });
    }

    return (
        <div className="App">
            <h2 style={{ fontFamily: "sans-serif", fontWeight: "bold" }}>Shopping Cart</h2>
            <div className="basket-container">
                <List
                    className="demo-loadmore-list"
                    itemLayout="horizontal"
                    dataSource={basketData}
                    renderItem={item => (
                        <List.Item
                            actions={[<Button onClick={() => handleDelete(item)}
                                type="link"
                                key={item._id}>delete</Button>]}
                        >
                            <div className="item-desc">
                                <List.Item.Meta
                                    style={{minWidth:"200px"}}
                                    avatar={<Avatar shape="square" size={64} src={"/" + item.imageLink} />}
                                    title={<a href="https://ant.design">{item.title}</a>}
                                    description={item.author}
                                />
                                <div>
                                    <div>Unit Price: {item.price.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</div>
                                    <div>Quantity: {item.quantity}</div>
                                </div>
                            </div>
                        </List.Item>
                    )}
                />
                <h3 style={{ textAlign: "right" }}>
                    Total: <b>{cost.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</b>
                </h3>
                <StripeCheckout
                    name="Bookstore Checkout"
                    token={onToken}
                    stripeKey="pk_test_f3duw0VsAEM2TJFMtWQ90QAT"
                    amount={cost * 100}
                    currency="EUR"
                />
            </div>
        </div>
    )
};

export default Cart;