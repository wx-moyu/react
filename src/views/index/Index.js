import React from 'react';
import { Layout } from 'antd';
import './Index.scss';
import Aside from './components/Aside'
import ContainerMain from '../../components/containerMain/index';
const { Sider, Header, Content,Footer } = Layout;
class Index extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
                <Layout className='layout-wrap'>
                    <Sider width='250'><Aside/></Sider>
                    <Layout>
                        <Header className='layout-header'>头部</Header>
                        <Content className='layout-content'>
                            <ContainerMain />
                        </Content>
                        <Footer>底部</Footer>
                    </Layout>
                </Layout>
        )
    }
}
export default Index;