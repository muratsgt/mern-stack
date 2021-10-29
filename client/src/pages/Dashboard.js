import { useState, useEffect, useContext } from 'react';
import { Descriptions } from 'antd';
import { fetchData } from "../helper/FetchData";
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import { Skeleton } from 'antd';

const Dashboard = () => {
    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(true);
    const { isLoggedIn } = useContext(AuthContext);

    let history = useHistory();

    useEffect(() => {
        if (isLoggedIn) {
            fetchData("/api/profile").then((data) => {
                setUserData(data);
                setLoading(false);
            }).catch((err) => console.log(err));
        } else {
            history.push("/");
        }
    }, [isLoggedIn])

    return (
        <div className="App">
            <h3>User Profile</h3>
            <Descriptions bordered column={1}>
                <Descriptions.Item label="First Name">
                    {loading ?
                        <Skeleton active /> : userData?.firstName}</Descriptions.Item>
                <Descriptions.Item label="Last Name">
                    {loading ?
                        <Skeleton active /> : userData?.lastName}</Descriptions.Item>
                <Descriptions.Item label="Email">
                    {loading ?
                        <Skeleton active /> : userData?.email}</Descriptions.Item>
                <Descriptions.Item label="Registered Since">
                    {loading ?
                        <Skeleton active /> : userData?.registerDate}</Descriptions.Item>
            </Descriptions>
        </div>
    )
};

export default Dashboard;