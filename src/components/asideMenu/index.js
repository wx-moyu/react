import React from 'react';
import { Menu } from 'antd';
import {Link} from 'react-router-dom';
//导入路由
import Router from '../../router/router';
import { UserOutlined } from '@ant-design/icons';
const { SubMenu } = Menu
class AsideMenu extends React.Component {
    constructor() {
        super();
        this.state = {
        };

    }
    firstMenu = (firstItem) => {
        return <Menu.Item  key={firstItem.key}>
            <Link to={firstItem.key}><span>{firstItem.title}</span></Link></Menu.Item>
    };
    childMenu = (firstItem) => {
        return (<SubMenu key={firstItem.key} icon={<UserOutlined />} title={firstItem.title}>
            {
                firstItem.child && firstItem.child.map(item => {
                    return item.child && item.child.length > 0 ? this.childMenu(item) : this.firstMenu(item);
                })
            }
        </SubMenu>)
    }
    render() {
        return (
            <React.Fragment>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    {
                        Router && Router.map(firstItem => {
                            return firstItem.child && firstItem.child.length > 0 ? this.childMenu(firstItem) : this.firstMenu(firstItem);
                        })
                    }
                </Menu>
            </React.Fragment>
        )
    }
}
export default AsideMenu;