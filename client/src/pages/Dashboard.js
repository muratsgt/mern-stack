import { useState, useEffect } from 'react';
import { Descriptions } from 'antd';
import { fetchData } from "../helper/FetchData";

const Dashboard = () => {
    const [userData, setUserData] = useState()

    useEffect(() => {
        fetchData("/api/profile").then((data) => {
            setUserData(data);
        }).catch((err) => console.log(err));
    }, [])

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