import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

class Balance extends React.Component {
    render() {
	return (
	    <p>My balance</p>
	);
    } 
};

class Chart extends React.Component {
    render() {
	return (
	    <p>The chart will be here</p>
	);
    }
};

class MonthTotal extends React.Component {
    render() {
	return (
	    <p>The month total will be here</p>
	);
    }
};

let main_div_style = {
    display: 'flex',
    justifyContent:'center',
    // alignItems:'center',
};

function App(props) {
    return (
	<div style={main_div_style}>
	    <div>
		<Balance/>
	    </div>
	    <div>
		<Chart/>
		<MonthTotal/>
	    </div>
	</div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
