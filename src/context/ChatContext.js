import { createContext, useState } from 'react'
//========================
const ChatContext = createContext()

const ChatProvider = ({children}) => {

    const [ uid, setUid ] = useState(false)
    const [ displayName, setDisplayName ] = useState(false)
    const [ loggedout, setLoggedout ] = useState(true)
    const [ isVisible, setIsVisible ] = useState(true)
    const [ notification, setNotification ] = useState(null)

    const data = {
        uid,
        setUid,
        displayName, 
        setDisplayName,
        loggedout,
        setLoggedout,
        isVisible,
        setIsVisible,
        notification,
        setNotification,
    }

	return(
		<ChatContext.Provider value={ data }>
			{children}
		</ChatContext.Provider>
	)
}

export { ChatContext, ChatProvider }
