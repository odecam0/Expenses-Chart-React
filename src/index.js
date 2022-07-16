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
    
    styles = {
	outerdiv : {
	    backgroundColor: 'hsl(10, 79%, 65%)',
	    padding: '5px',
	    borderRadius: '15px',
	    marginBottom: '10px',
	    display: 'flex',
	    justifyContent: 'space-between',
	    width: '400px'
	},

	uppertext : {
	    color:'white',
	    fontSize:'12px',
	    weight:'400',
	    position:'relative',
	    top:'10px'
	},

	lowertext : {
	    color:'white',
	    fontSize:'22px',
	    fontWeight:'700'
	},

	logo : {
	    marginTop: 'auto',
	    marginBottom: 'auto',
	    position:'relative',
	    right:'10px'
	}
    }

    render() {
	return (
	    <div style={this.styles.outerdiv}>
		<div style={{position:'relative', left:'10px'}}>
		    <p style={this.styles.uppertext}>My balance</p>
		    <p style={this.styles.lowertext}>{'$' + this.state.balance}</p>
		</div>
		<div style={this.styles.logo}>
		    <Logo/>
		</div>
	    </div>
	);
    } 
};


class Bar extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    renderInfo: false
	};

	this.showInfo = this.showInfo.bind(this);
	this.hideInfo = this.hideInfo.bind(this);
    }

    showInfo() {
	this.setState({renderInfo: true});
    }

    hideInfo() {
	this.setState({renderInfo: false});
    }

    styles = {
	day : {
	    textAlign:'center',
	    fontWeight:'100',
	    color:'grey'
	},

	barinfo_div : {
	    borderRadius: '5px',
	    position: 'absolute',
	    backgroundColor: 'black',
	    width: '60px',
	    height: '30px',
	    transform: 'translate(-7px, 0)',
	},

	barinfo_text : {
	    color:'white',
	    textAlign: 'center',
	    top: '50%',
	    transform: 'translateY(-50%)'
	}
    }

    render() {
	let height = this.props.amount / this.props.max_amount * this.props.max_height;

	let bar_style = {
	    height: Math.floor(height) + 'px',
	    width: '45px',
	    backgroundColor: this.props.color,
	    marginLeft:'auto',
	    marginRight:'auto',
	    borderRadius: '5px',
	    marginTop: '40px'
	    
	};

	return (
	    <div style={{display:'block'}}>
		{this.state.renderInfo &&
		 <div style={this.styles.barinfo_div}>
		     <p style={this.styles.barinfo_text}>
			 {'$' + this.props.amount}
		     </p>
		 </div>}
		<div style        = {bar_style}
		     onMouseEnter = {this.showInfo}
		     onMouseLeave = {this.hideInfo}/>
		<p style={this.styles.day}>{this.props.day}</p>
	    </div>
	);
    }
}


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
    }

    render() {
	let data   = this.state.data;
	let params = Object.keys(this.state.data).map((key) => [data[key].day, data[key].amount]);


	return (
	    <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end'}}>
		{
		    params.map(([day, amount])=>{
			let color = 'hsl(10, 79%, 65%)';
			if (amount === this.state.max_amount) {
			    color = 'hsl(186, 34%, 60%)';
			};
			return (<Bar day={day} amount={amount}
				     key={day} max_amount={this.state.max_amount}
				     max_height={this.state.max_height}
				     color={color}/>);
		    })}
	    </div>
	);
    }
};


class MonthTotal extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    month_total: props.month_total,
	    difference: props.difference
	};
    }

    styles = {
	total : {
	    fontSize: '35px',
	    fontWeight: '1800',
	    marginTop:'0',
	    marginBottom:'0',
	    verticalAlign:'bottom'
	},

	annotation : {
	    fontSize: '12px',
	    color: 'grey',
	    marginTop: '0',
	    marginBottom: '5px'
	},

	difference : {
	    textAlign: 'right',
	    fontWeight: 'bold',
	    marginTop: '0',
	    marginBottom: '0',
	},

	outerdiv : {
	    display:'flex',
	    justifyContent:'space-between',
	    alignItems:'flex-end',
	    marginTop:'20px'
	}
    }

    render() {
	let difference;

	if (this.state.difference > 0) {
	    difference = '+' + this.state.difference + '%';
	} else {
	    difference = this.state.difference + '%';
	}

	return (
	    <div style={this.styles.outerdiv}>
		<div>
		    <p style={this.styles.annotation}>Total this month</p>
		    <p style={this.styles.total}>{"$" + this.state.month_total}</p>
		</div>
		<div>
		    <p style={this.styles.difference}>{difference}</p>
		    <p style={this.styles.annotation}>from last month</p>
		</div>
	    </div>
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

    let month_total = Object.keys(mock_data).map(key => mock_data[key].amount);
    month_total     = month_total.reduce((a, b)=>a+b, 0);

    let difference = -2.4;

    return (
	<div style={main_div_style}>
	    <Balance balance={1000}/>
	    <div style={bot_div_style}>
		<p style={{fontSize:'22px', fontWeight:'700'}}>Spending - Last 7 days</p>
		<Chart data={mock_data}/>
		<div style={{height:'2px', backgroundColor:'hsl(27, 66%, 92%)'}}></div>
		<MonthTotal month_total={month_total} difference={difference}/>
	    </div>
	</div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
	<App style={{backgroundColor: 'hsl(27, 66%, 92%)'}}/>
    </React.StrictMode>
)
