import React from 'react';
import ReactDOM from 'react-dom';
import App from './jsx/App';
import { ChatProvider } from "./context/ChatContext";


ReactDOM.render(
	<React.StrictMode>
		<ChatProvider>
			<App />
		</ChatProvider>
	</React.StrictMode>,
	document.getElementById('root')
);


