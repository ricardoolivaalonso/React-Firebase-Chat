import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useState, useContext } from 'react'
import { ChatContext } from "../../context/ChatContext"
import { NotificationComponent } from "./NotificationComponent"


const LoginComponent = () => {
    const [ getEmail, setNewEmail ] = useState('')
    const [ getPassword, setNewPassword ] = useState('')
    const { 
        notification, 
        setLoggedout, 
        setUid, 
        setDisplayName,
        setIsVisible, 
        setNotification 
    } = useContext( ChatContext )

    const Login = async(e) => {
        e.preventDefault()
		const auth = getAuth()

		try {
            
			const signIn = await signInWithEmailAndPassword(auth, getEmail, getPassword)
			const user = await signIn.user 

			if(user.error) throw new Error ({myStatus: user.error})

            setLoggedout(false)
            setUid(user.uid)
            setDisplayName(user.displayName)

		} catch ( error ) { 
            setNotification(error.code) 
            console.log("--",error.code) 
        }
	}

    return(
        <form className="auth__form" onSubmit={(e)=>Login(e)}>

            <div className="auth__row">
                <h2 className="auth__title">Log in</h2>
            </div>

            <div className="auth__row">
                <input 
                    className="auth__input" 
                    type="email"
                    id="email" 
                    required
                    value={getEmail} 
                    onChange={(e)=>setNewEmail(e.target.value)} 
                />
                { !getEmail && <label className="auth__label" htmlFor="email" >Email</label> }
            </div>

            <div className="auth__row">
                <input 
                    className="auth__input" 
                    type="password" 
                    id="pass"
                    minLength="6"
                    required
                    value={getPassword} 
                    onChange={(e)=>setNewPassword(e.target.value)} 
                />
                { !getPassword && <label className="auth__label" htmlFor="pass">Password</label> }
            </div>

            <div className="auth__row">
                <button className="auth__submit" type="submit">Log in</button>
            </div>

            { notification && <NotificationComponent />}

            <hr className="auth__hr"/>
            
            <div className="auth__row">
                <button className="auth__create" type="button" onClick={()=>setIsVisible(false)}>Create account</button>
            </div>
        </form>
    )
}

export { LoginComponent }