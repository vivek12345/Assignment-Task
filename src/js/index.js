import React,{ Component } from 'react';
import ReactDom from 'react-dom';
import DialogBox from './components/dialogBox';

class Index extends Component {
	render() {
		return (
			<DialogBox />
		);
	}
}
ReactDom.render(<Index />, document.querySelector('.main-container'));
