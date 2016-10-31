import React,{ Component } from 'react';
import classNames from 'classNames';

export default class Team extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showMenu: false,
			selectedValue: '',
			data: this.props.data
		}
	}

	toggleMenu(event) {
		event.preventDefault();
		event.stopPropagation();
		const menuState = !this.state.showMenu;
		menuState?this.handleFocusEvent():this.handleBlurEvent();
	}

	handleFocusEvent(event) {
		event && event.preventDefault();
		event && event.stopPropagation();
		this.setState({
			showMenu: true
		});
	}

	handleBlurEvent(event) {
		event && event.preventDefault();
		event && event.stopPropagation();
		const inputValue = this.state.selectedValue;
		this.setState({
			showMenu: false,
			selectedValue: inputValue
		});
	}

	handleInputChange(event) {
		event.preventDefault();
		event.stopPropagation();
		const currentTarget = event.currentTarget;
		const value = currentTarget.value;
		const newData = this.substringMatcher(value);
		this.setState({
			selectedValue: value,
			data: newData
		});
	}

	handleTeamChange(event) {
		event.preventDefault();
		event.stopPropagation();
		const currentTarget = event.currentTarget;
		const value = currentTarget.textContent;
		this.setState({
			showMenu: false,
			selectedValue: value
		});
		this.props.handleChange(value);
	}

	substringMatcher(q) {
		const matches = [];
		const substringRegex = new RegExp(q, 'i');
		const newData = this.props.data.filter((item) => {
			return substringRegex.test(item);
		});
		return newData;
	}

	renderItems() {
		return this.state.data.map((item) => {
			return <div className='item' key={item} onMouseDown={(event) => this.handleTeamChange(event)}>{item}</div>
		});
	}

	render() {
		let menuClass = classNames('menu transition', { 'active': this.state.showMenu });
		let focussedClass = classNames('dialog-dropdown', { 'focussed': this.state.showMenu });
		let caretClass = classNames('dropdown-caret', { 'focussed': this.state.showMenu });
		let defaultTextClass = classNames('default text', { 'focussed': this.state.selectedValue.trim().length > 0 });

		return (
			<div className='dialog-dropdown-container'>
				<label>{this.props.label}</label>
				<div className={ focussedClass }>
					<span className={ caretClass } onMouseDown={(event) => this.toggleMenu(event)}></span>
					<input
						type="text"
						className="search"
						autoComplete="off"
						tabIndex="0"
						onFocus={(event)=>this.handleFocusEvent(event)}
						onBlur={(event)=>this.handleBlurEvent(event)}
						onChange={(event)=>this.handleInputChange(event)}
						id={this.props.id}
						value={this.state.selectedValue} />
					<div className={defaultTextClass}>{this.props.defaultText}</div>
					<div className={ menuClass }>
						{ this.renderItems() }
					</div>
				</div>
			</div>
		)
	}
}
