import React,{ Component } from 'react';
import SearchDropdown from './searchDropdown';
import classNames from 'classNames';

export default class DialogBox extends Component {
	constructor(props) {
		super(props);
		const data = [{
				team: 'Engineering',
				employees: ['Lawana Fan', 'Larry Rainer', 'Rahul Malik', 'Leah Shumway']
			},{
				team: 'Executive',
				employees: ['Rohan Gupta', 'Ronda Dean', 'Robby Maharaj']
			},{
				team: 'Finance',
				employees: ['Caleb Brown', 'Carol Smithson', 'Carl Sorensen']
			},{
				team: 'Sales',
				employees: ['Ankit Jain', 'Anjali Maulingkar']
		}];
		const processedData = this.processData(data);
		this.state = {
			data: processedData,
			selectedTeam: '',
			isChecked: true,
			error: ''
		}
	}

	processData(data) {
		const processedData = {};
		data.forEach((item) => {
			processedData[item.team] = item.employees;
		});
		return processedData;
	}

	handleChange(selectedTeam) {
		this.setState({
			selectedTeam: selectedTeam,
		});
	}

	handleSubmitButton(event) {
		event.preventDefault();
		event.stopPropagation();
		const teamValue = document.getElementById('team').value;
		const employeeValue = document.getElementById('employee').value;
		const employees = this.state.data[teamValue];
		let employeeFound = false;
		if(employees) {
			employees.forEach((employee) => {
				if(employee === employeeValue) {
					employeeFound = true;
				}
			});
		}
		if(!employeeFound) {
			this.setState({
				error: "Employee selected cannot be found"
			});
		} else {
			this.setState({
				error: ""
			});
			alert('Saved Successfully');
		}
	}

	handleCancelButton(event) {
		const teamValue = document.getElementById('team').value;
		const employeeValue = document.getElementById('employee').value;
		if(teamValue || employeeValue) {
			if(confirm('Are you sure you want to close')) {
				document.querySelector('.dialog-container').remove();
			}
		} else {
			document.querySelector('.dialog-container').remove();
		}
	}

	toggleCheckBox(event) {
		this.setState({
			isChecked: event.target.checked
		});
	}

	render() {
		let teamData = Object.keys(this.state.data);
		let employees = this.state.data[this.state.selectedTeam] || [];
		let alertClass = classNames('alert-error', {'active': this.state.error.length > 0});

		return (
			<div className='dialog-container'>
				<div className='close' onClick={(event)=>this.handleCancelButton(event)}></div>
				<div className='dialog-title'>Select an Employee</div>
				<div className={alertClass}>{ this.state.error }</div>
				<div className='dialog-welcome-email'>
					<input
						type='checkbox'
						id="welcome-email"
						name="welcome-email-checkbox"
						checked={this.state.isChecked}
						onChange={(event)=>this.toggleCheckBox(event)} />
					<label htmlFor='welcome-email'></label>
					<span className='checkbox-text'>Send welcome email to employee</span>
				</div>

				<SearchDropdown
					data={teamData}
					id={'team'}
					label='Select a Team in the Organization'
					defaultText='Select Team...'
					handleChange={(selectedValue)=>this.handleChange(selectedValue)} />
				<SearchDropdown
					data={employees}
					id={'employee'}
					label='Select an Employee'
					defaultText='Select Employee...' />

				<div className='bottom-container'>
					<button className='btn cancel-btn' onClick={(event)=>this.handleCancelButton(event)}>Cancel</button>
					<button className='btn ok-btn' onClick={(event)=>this.handleSubmitButton(event)}>OK</button>
				</div>
			</div>
		);
	}
}
