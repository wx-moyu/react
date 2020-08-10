import React from 'react';
import { Button } from 'antd';
class App extends  React.Component {
       constructor(props) {
         super();
        this.state ={};
       }
       render() {
         return (
         //React.Fragment 跟标签不被渲染
         <React.Fragment>  
              <Button type='primary'>测试</Button>
         </React.Fragment>
         )
       }
}
export default App;
