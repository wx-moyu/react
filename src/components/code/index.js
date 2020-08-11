import React from 'react';
import { message, Button } from 'antd';
import { getSmsApi } from '../../api/account';
import { regEmail } from '../../utils/validate';
// 定时器
let timer = null; 
class Code extends React.Component {
    constructor(props) {
        super(props);  //初始化默认值
        this.state = {
            username: props.username,
            button_text: '获取验证码',
            button_disabled: false,
            button_loading: false,
            formType:props.formType
        }
    }
    //倒计时
    countDown = () => {
        let sec = 60;     //倒计时
     
        //关闭lodaing
        this.setState({
            button_loading: false,
            button_text: `${sec}s`
        });
        // 定时器
        timer = setInterval(() => {
            sec--;
            if (sec <= 0) {
                this.setState({
                    button_text: '获取验证码',
                    button_disabled: false
                })
                clearInterval(timer);
                return false;
            }
            this.setState({
                button_text: `${sec}s`
            });
        }, 1000);
    };
    //生命周期父组件值变化
    componentWillReceiveProps(value) {
        this.setState({
            username: value.username
        })
    }
    // 组件即将销毁的生命周期
    componentWillUnmount() {
       clearInterval(timer);
    }
    //获取验证码
    getCode = () => {
        const username = this.state.username;
        if (!username) {
            message.warning('用户名不能为空', 1);
            return false;
        }
        if (!regEmail(username)) {
            message.warning('邮箱格式不正确', 1);
            return false;
        }
        this.setState({
            button_loading: true,
            button_text: '发送中',
            button_disabled: true
        })
        const requsetData = {
            username: username,
            moudel: this.state.formType
        }
        getSmsApi(requsetData).then(response => {
            if (response.resCode === 0) {
                message.info(response.message);
                this.countDown();
            }
        }).catch(error => {
            this.setState({
                button_loading: false,
                button_text: '重新获取',
                button_disabled: false
            })
            message.warning(error.message, 1);
        });
    };
    render() {
        return <Button type='danger' disabled={this.state.button_disabled} loading={this.state.button_loading} onClick={this.getCode} block>{this.state.button_text}</Button>
    }

}
export default Code;