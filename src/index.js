import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

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
    
    // TODO : Check if style as a public class atribute is a problem
    outerdiv_style = {
	backgroundColor: 'hsl(10, 79%, 65%)',
	padding: '10px',
	borderRadius: '15px',
	marginBottom: '10px',
	display: 'flex',
	justifyContent: 'space-between',
	width: '400px'
    };

    uppertext_style = {
	color:'white',
	fontSize:'12px',
	weight:'400',
	position:'relative',
	top:'10px'
    }

    lowertext_style = {
	color:'white',
	fontSize:'22px',
	fontWeight:'700'
    }

    logo_style = {
	marginTop: 'auto',
	marginBottom: 'auto',
	position:'relative',
	right:'10px'
    }

    render() {
	return (
	    <div style={this.outerdiv_style}>
		<div style={{position:'relative', left:'10px'}}>
		    <p style={this.uppertext_style}>My balance</p>
		    <p style={this.lowertext_style}>{'$' + this.state.balance}</p>
		</div>
		<div style={this.logo_style}>
		    <Logo/>
		</div>
	    </div>
	);
    } 
};


class Chart extends React.Component {
    constructor (props) {
	super(props);

	// Getting array of amounts from object
	let amounts = Object.entries(props.data).map(([key, value]) => value.amount);

	// max will be used to get the heiht of each bar
	let max     = Math.max(...amounts);

	let length  = amounts.length;

	this.state = {
	    data:   props.data,
	    max_amount:    max,
	    length: length,
	    max_height: props.height || 100
	};

	this.getBar.bind(this);
    }

    getBar(day, amount) {
	let height = amount / this.state.max_amount * this.state.max_height;

	let bar_style = {
	    height: Math.floor(height) + 'px',
	    width: '40px',
	    backgroundColor: 'black',
	    marginLeft:'auto',
	    marginRight:'auto',
	    borderRadius: '10px' // 
	};

	let day_style = {
	    textAlign:'center'
	};

	return (
	    <div style={{display:'block'}}>
     		<div style={bar_style}/>
     		<p style={day_style}>{day}</p>
     	    </div>
	);
    }

    render() {
	let bars = [];

	for (const i in this.state.data){
	    bars.push(this.getBar(...Object.values(this.state.data[i])));
	}

	return (
	    <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end'}}>{bars}</div>
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
};

let bot_div_style = {
    backgroundColor: 'white',
    padding: '5%',
    borderRadius: '15px'
};

var mock_data = require('./data.json')

function App(props) {
    return (
	<div style={main_div_style}>
	    <Balance balance={1000}/>
	    <div style={bot_div_style}>
		<p>Spending - Last 7 days</p>
		<Chart data={mock_data}/>
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
