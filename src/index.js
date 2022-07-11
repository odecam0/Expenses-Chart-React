import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// Loading the logo image as a React component
import {ReactComponent as Logo} from './logo.svg';

// Loading font used
import WebFont from 'webfontloader';

WebFont.load({
    google: {
	families: ['DM Sans']
    }
});


class Balance extends React.Component {
    constructor (props) {
	super(props);
	this.state = {
	    balance: props.balance,
	}
    }
    
    outerdiv_style = {
	backgroundColor: 'hsl(10, 79%, 65%)',
	padding: '10px',
	borderRadius: '15px',
	marginBottom: '10px',
	display: 'flex',
	justifyContent: 'space-between',
	width: '400px'
    };

    render() {
	return (
	    // <p>My balance</p>
	    <div style={this.outerdiv_style}>
		<div style={{position:'relative', left:'10px'}}>
		    <p style={{color:'white', fontSize:'12px', weight:'400', position:'relative', top:'10px'}}>My balance</p>
		    <p style={{color:'white', fontSize:'22px', fontWeight:'700'}}>{'$' + this.state.balance}</p>
		</div>
		<div style={{marginTop: 'auto', marginBottom: 'auto', position:'relative', right:'10px'}}>
		    <Logo/>
		</div>
	    </div>
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
    position: 'absolute',
    top:      '50%',
    left:     '50%',
    transform: 'translate(-50%, -50%)',
    // backgroundColor: 'green'
};

let bot_div_style = {
    backgroundColor: 'white',
    padding: '5%',
    borderRadius: '15px'
};

function App(props) {
    return (
	<div style={main_div_style}>
	    <Balance balance={1000}/>
	    <div style={bot_div_style}>
		<Chart/>
		<MonthTotal/>
	    </div>
	</div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App style={{backgroundColor: 'hsl(27, 66%, 92%)'}}/>)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
