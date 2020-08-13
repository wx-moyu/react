import React from 'react';
import './Aside.scss';
import AsideMenu from '../../../components/asideMenu/index';
class Aside extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
            <React.Fragment>
                <h1 className='logo'><span>Logo</span></h1>
                <AsideMenu />
            </React.Fragment>
        )
    }
}
export default Aside;