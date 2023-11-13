import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { AuthPorvider } from './utils/Auth';
import App from './App';

import './index.scss';
import './assets/style/style.js'
import 'bootstrap/dist/js/bootstrap.bundle.js'

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
// 
// import { makeServer } from "./test/test.js"

// if (process.env.NODE_ENV === "development") {
//   makeServer({ environment: "development" })
// }
// 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <AuthPorvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </AuthPorvider>
    // </React.StrictMode>
);


