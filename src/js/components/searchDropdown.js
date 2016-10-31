import React,{ Component } from 'react';
import classNames from 'classNames';

/*State of this component is as follows:-
	-------------------------
	|	showMenu  			|
	|	selectedValue		|
	|	data				|
	-------------------------
*/

/**
 * A common componnet created for the search boxes of team and employee
 * Since they both have common functionailty, inorder to be DRY, this component takes care of both of them
 */

export default class SearchDropdown extends Component {

	/**
	 * [constructor description] Initialize the state to not show the menu, selected value to be empty and data to the props paased by it's parent
	 * @param  {[Object]} props [An object containing the data,defaultText, label and handleChange handler]
	 */
	constructor(props) {
		super(props);
		this.state = {
			showMenu: false,
			selectedValue: '',
			data: this.props.data
		}
	}

	/**
	 * [toggleMenu description] Open/close the dropdown and focus the textbox
	 * @param  {[Object]} event [Click event object]
	 */
	toggleMenu(event) {
		event.preventDefault();
		event.stopPropagation();
		const menuState = !this.state.showMenu;
		menuState?this.handleFocusEvent():this.handleBlurEvent();
	}

	/**
	 * [handleFocusEvent description] Event handler fired when user focusses on the text input box
	 * @param  {[Object]} event [Focus event object]
	 */
	handleFocusEvent(event) {
		event && event.preventDefault();
		event && event.stopPropagation();
		this.setState({
			showMenu: true
		});
	}

	/**
	 * [handleBlueEvent description] Event handler fired when user focusses out of the text input box
	 * state is mutated to the new state where the menu needs to be shown
	 * @param  {[Object]} event [Blur event object]
	 */
	handleBlurEvent(event) {
		event && event.preventDefault();
		event && event.stopPropagation();
		const inputValue = this.state.selectedValue;
		this.setState({
			showMenu: false,
			selectedValue: inputValue
		});
	}

	/**
	 * [handleInputChange description] Event hanlder when the user starts typing something into the text box
	 * state is mutated to the new state where the menu needs to be shown with the new typed value inside text box and new values in the dropdown list
	 * based on query typed
	 * @param  {[Object]} event [Input change event object]
	 */
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

	/**
	 * [handleChange description] Event handler when someone click on the one of the items of the dropdown menu
	 * This function will call it's parent function if team needs to be updated, which in turn will update the team
	 * and re render the UI
	 * @param  {[Object]} event [Change event object]
	 */
	handleChange(event) {
		event.preventDefault();
		event.stopPropagation();
		const currentTarget = event.currentTarget;
		const value = currentTarget.textContent;
		this.setState({
			showMenu: false,
			selectedValue: value
		});
		if(this.props.handleChange) this.props.handleChange(value);
	}

	/**
	 * [substringMatcher description] A simple utility to filter out the dropdown items based on the query string.
	 * Used regex matching
	 * @param  {[String]} q [This is the user typed value in the text box]
	 * @return {[Array]}   [It returns filterted array consisting of only those employee names whose name matches the regex]
	 */
	substringMatcher(q) {
		const matches = [];
		const substringRegex = new RegExp(q, 'i');
		const newData = this.props.data.filter((item) => {
			return substringRegex.test(item);
		});
		return newData;
	}

	/**
	 * [componentWillReceiveProps description] A react lifecycle event which check if the employee data coming from parent has changed or not
	 * if it has, then the render function needs to be called,to update the UI
	 * @param  {[Object]} nextProps [New props data passed by parent when the team changes]
	 */
	componentWillReceiveProps(nextProps) {
		if(this.props.data !== nextProps.data) {
			this.setState({
				data: nextProps.data
			});
		}
	}

	/**
	 * [renderItems description] This funcion renders all the items required inside the the dropdown menu basically the list items of the list.
	 * @return {[Object Nodes]}
	 */
	renderItems() {
		return this.state.data.map((item) => {
			return <div className='item' key={item} onMouseDown={(event) => this.handleChange(event)}>{item}</div>
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
