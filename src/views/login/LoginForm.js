import React from 'react';
import { Form, Input, Button, message } from 'antd';      // from 表单
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';   //栅格布局
import './index.scss';
import { loginApi } from '../../api/account'
//验证 
import { validate_password } from '../../utils/validate'
import Code from '../../components/code/index';
class LgoinForm extends React.Component {
    constructor() {
        super();
        this.state = {
            username: ''
        };
    }
    //表单验证通过调用的方法
    onFinish = (values) => {
        console.log('Received values of form: ', values);
        loginApi(values).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    };
    //组件切换
    toggleForm = () => {
        this.props.switchForm("register");
    };
    //输入事件
    inputChange = (e) => {
        let value = e.target.value;
        this.setState({
            username: value
        });
    }
    render() {
        const { username} = this.state;
        return (
            <React.Fragment>
                <div className='form-headr'>
                    <h4 className='column'>登录</h4>
                    <span onClick={this.toggleForm}>账号注册</span>
                </div>
                <div className='form-content'>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item name="username" rules={[
                            { required: true, message: '邮箱不能为空' },
                            { type: 'email', message: '邮箱格式不正确' }
                            // ({ getFieldValue }) => ({
                            //     validator(rule, value) {
                            //         if (regEmail(value)) {
                            //             _this.setState({
                            //                 codeBtnDisStatus: false
                            //             });
                            //             return Promise.resolve();
                            //         }
                            //         return Promise.reject('邮箱格式不正确');
                            //     }
                            // })
                        ]}>
                            <Input value={this.state.username} onChange={this.inputChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
                        </Form.Item>
                        <Form.Item name="password" rules={[
                            { required: true, message: '密码不能为空' },
                            { pattern: validate_password, message: '6至20位字母加数字' },
                        ]}>
                            <Input type='password' prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
                        </Form.Item>
                        <Form.Item name="code" rules={[
                            { required: true, message: '验证码不能为空' },
                            { len: 6, message: '请输入6位验证码' }]}>
                            <Row gutter='13'>
                                <Col span='14'>
                                    <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="code" />
                                </Col>
                                <Col span='10'>
                                    <Code username ={username} formType='login'/>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" block> 登录</Button>
                        </Form.Item>
                    </Form>
                </div>
            </React.Fragment>
        )
    }
}
export default LgoinForm;