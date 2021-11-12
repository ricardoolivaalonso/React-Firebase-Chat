import { getAuth, onAuthStateChanged } from "firebase/auth"
import { HeaderSection } from "./01-sections/HeaderSection"
import { ChatSection } from "./01-sections/ChatSection"
import { FormSection } from "./01-sections/FormSection"
import { AuthComponent } from "./01-sections/AuhComponent"
import { useEffect, useContext } from "react"
import { ChatContext } from "../context/ChatContext"
import '../scss/styles.scss'

const App = () => {

	const {
		loggedout, 
		setLoggedout,
		setUid,
		setDisplayName
	} = useContext( ChatContext )

	useEffect(() => {
		const auth = getAuth()

		onAuthStateChanged(auth, (user) => {
			if (user) {
				setLoggedout(false)
				setUid(user.uid)
				setDisplayName(user.displayName)
			} 
		})

	}, [])

	return(
		<div className="main">
			{ loggedout && <AuthComponent />}
			<HeaderSection/>
			
			<main className="container">
				<ChatSection/>
				<FormSection/>
			</main> 
		</div>
	)
}

export default App;
