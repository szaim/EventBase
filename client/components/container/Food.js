const React = require('react');
const CardEvent = require('../cardEvent');
const connect = require('react-redux').connect;
const actions = require('../../redux/action');
const $ = require('jquery');


const Food = React.createClass({

	// componentWillMount: function() {
	// 	this.props.dispatch(actions.fetchFood('40.7,-74'));
	// },
	onNext: function(e) {
		// this.props.dispatch(actions.fetchFood('40.7,-74'));
		this.props.dispatch(actions.nextFood());
		console.log("clicked")
			e.preventDefault();
			console.log('jquery working');
			console.log('this', this);
			// $('#food-button').siblings('.card-animation').toggleClass('animation');

			
			$('#food-button').siblings('.card-animation').animate({right: "1200px"}, "slow", function () {
			$('#food-button').siblings('.card-animation').toggle().css('animation', 'imageAnimation 3s linear 1');
        	$('#food-button').siblings('.card-animation').css('right', '0');

    });
		},

	render: function() {
	    let settings = {
			  slideRatio: 4,
			  slidePending: true
	    };
		let foodList = this.props.subFood.map((event,index) => {
			let prefix;
			let suffix;
			//if no photos set default image
			if(!event.venue.photos.groups.length){
				prefix = 'https://igx.4sqi.net/img/general/'; 
				suffix = '/48623284_fqbPs5xy6jImyJu6U2w_xkkR7lilKCVfZEE8qSC66WU.jpg';
			} else {
				prefix = event.venue.photos.groups[0].items[0].prefix;
				suffix = event.venue.photos.groups[0].items[0].suffix;
			}
			return (
				<CardEvent 
				key={index}
				prefix={prefix} 
				suffix={suffix}
				title={event.venue.name}
				rating={event.venue.rating}/>
			)
		});
		return (

	
		<div className='row'>
			<h3 className='category-title'>Food & Drink</h3>
			<div className='category-wrapper'>
				{foodList}
			<button className="nextArrow-button" id='food-button' type='button' onClick={this.onNext}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
				<path fillRule="evenodd" d="M4.293 1.707A1 1 0 1 1 5.708.293l7.995 8a1 1 0 0 1 0 1.414l-7.995 8a1 1 0 1 1-1.415-1.414L11.583 9l-7.29-7.293z">
				</path></svg>
			</button>
			</div>
		</div>

		)
	}
});

let mapStateToProps = function(state, props) {
	return {
		food: state.food,
		subFood: state.subFood
	}
};



const Container = connect(mapStateToProps)(Food);

module.exports = Container;