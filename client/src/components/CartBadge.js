import { Menu, Badge, Avatar } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getBasketData } from "../helper/EditBasket";


export default function CartBadge({ email }) {
    const [basket, setBasket] = useState([]);

    useEffect(() => {
        setBasket(getBasketData(email));
    }, [email]);

    return (
        <Badge count={basket.length}>
            <Avatar
                style={{ backgroundColor: 'rgba(0, 222, 0, 0.4)' }}
                icon={<ShoppingCartOutlined />}></Avatar>
        </Badge>
    )
}