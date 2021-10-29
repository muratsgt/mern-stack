import { Form, Modal, Input, Checkbox, Button, message } from 'antd';
import { postData } from '../helper/PostData';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import Terms from "../components/Terms";

const validateMessages = {
    required: "${label} is required!",
    types: {
        email: "${label} is not a valid email!",
    },
};

const Signup = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    let history = useHistory();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onFinish = (values) => {
        postData("/api/auth/register", values).then((data) => {
            message.success('Register successfull', 3);
            history.push("/signin");
        }).catch(err => {
            console.log(err);
            message.error('An error has occured, please try again correctly.', 3);
        });
    };

    const onFinishFailed = (errorInfo) => {
        message.error("Please enter your credentials correctly.", 3);
    };

    return (
        <div className="App">
            <h3>Welcome!</h3>
            <p>Create an account for a better service.</p>
            <Form
                layout="vertical"
                form={form}
                name="register"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                validateMessages={validateMessages}
                scrollToFirstError
            >
                <Form.Item
                    name="firstName"
                    label="First Name"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="lastName"
                    label="Last Name"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ required: true }, { type: 'email' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[{ required: true },
                    { min: 6, message: 'Must be at least 6 characters!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(new Error('The passwords do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve()
                                    : Promise.reject(new Error('Should accept agreement')),
                        },
                    ]}
                >
                    <Checkbox>
                        I have read the <Button type="link" onClick={showModal}>agreement</Button>
                        <Modal title="Terms and Conditions"
                            visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                            <Terms />
                        </Modal>
                    </Checkbox>
                </Form.Item>
                <Form.Item >
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Signup;