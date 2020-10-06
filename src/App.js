import React from 'react';
import './App.scss';
import Content from "./container/Content/Content";
import Sidebar from "./container/Content/components/Sidebar/Sidebar";
import Header from "./container/Content/components/Header/Header";

function App() {
    return (
        <div className="App">
            <Header/>
            <div className="site">
                <Sidebar/>
                <Content/>
            </div>
        </div>
    );
}

export default App;
