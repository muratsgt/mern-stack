import { useState, useEffect, useContext } from 'react';
import { Descriptions } from 'antd';
import { fetchData } from "../helper/FetchData";
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
    const [userData, setUserData] = useState();
    const { isLoggedIn } = useContext(AuthContext);
    let history = useHistory();

    useEffect(() => {
        if (isLoggedIn) {
            fetchData("/api/profile").then((data) => {
                setUserData(data);
            }).catch((err) => console.log(err));
        } else {
            history.push("/");
        }
    }, [isLoggedIn])

    return (
        <div className="App">
            <Descriptions title="User Info" bordered column={1}>
                <Descriptions.Item label="First Name">
                    {userData?.firstName}</Descriptions.Item>
                <Descriptions.Item label="Last Name">
                    {userData?.lastName}</Descriptions.Item>
                <Descriptions.Item label="Email">
                    {userData?.email}</Descriptions.Item>
                <Descriptions.Item label="Registered Since">
                    {userData?.registerDate}</Descriptions.Item>
            </Descriptions>
        </div>
    )
};

export default Dashboard;