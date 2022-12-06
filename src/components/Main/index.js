import React, {useState} from 'react'
import '../../App.css'
import {Button, Form, Input, Spin, Typography,notification } from "antd";
import axios from "axios";
import {Content} from "antd/es/layout/layout";

const {Text} = Typography;


const Main = () => {
    const [url, setUrl] = useState(null)
    const [loading,setLoading]=useState(false)
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type,message) => {
        api[type]({
            message: 'Error',
            description: `${message}`
        });
    };
    const onFinish = (values) => {
        if (values.url.includes('.')) {
            setLoading(true)
            axios.get(`https://api.shrtco.de/v2/shorten?url=${values.url}`).then(res => {
                setUrl(res.data.result)
                setLoading(false)
            }).catch(err => {
                console.log(err)
                setLoading(false)
            })
        }else{
            openNotificationWithIcon('error','This is invalid  Url')
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log(errorInfo)
        openNotificationWithIcon('error',errorInfo.errorFields[0].errors[0])
    };

    return (
        <Form
            className={'form'}
            name="basic"
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Spin tip="Loading..." spinning={loading}>
            <div style={{display: 'flex'}}>
                <Form.Item
                    name="url"
                    label="URL"
                    rules={[
                        {
                            required: true,
                        },
                        {
                            type: 'string',
                            min: 6,
                        },
                    ]}
                >
                    <Input placeholder="input the URL"/>
                </Form.Item>
                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    {contextHolder}
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </div>
            <div style={{width: 'max-contnet', textAlignLast: "justify"}}>
                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Content>{url && <div><Text>Short Url: {url.short_link}</Text></div>}</Content>
                    <Content>{url && <div><Text>Short Url2: {url.short_link2}</Text></div>}</Content>
                </Form.Item>
            </div>
            </Spin>
        </Form>

    );
}

export default Main