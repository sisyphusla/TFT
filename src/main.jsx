import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import './index.css'

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-TH171F2MG4');

ReactDOM.hydrate(<App />, document.getElementById('root'));
