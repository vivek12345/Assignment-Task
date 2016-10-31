import React,{ Component } from 'react';
import ReactDom from 'react-dom';
import DialogBox from './components/dialogBox';

/**
 * Parent component to render the dialog box component
 */
class Index extends Component {
	render() {
		return (
			<DialogBox />
		);
	}
}
ReactDom.render(<Index />, document.querySelector('.main-container'));
