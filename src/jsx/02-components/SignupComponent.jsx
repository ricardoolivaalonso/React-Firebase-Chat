import { useState, useContext } from 'react'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { ChatContext } from "../../context/ChatContext"
import { NotificationComponent } from "./NotificationComponent"

const SignupComponent = () => {
    const [ newEmail, setNewEmail ] = useState('')
    const [ newPassword, setNewPassword ] = useState('')
    const [ newName, setNewName ] = useState('')

    const { 
        notification, 
        setLoggedout, 
        setUid, 
        setDisplayName,
        setIsVisible, 
        setNotification 
    } = useContext( ChatContext )


    const SignUp = async(e) => {
        e.preventDefault()
		const auth = getAuth()

		try {
			const createUser = await createUserWithEmailAndPassword(auth, newEmail, newPassword)
			const user = await createUser.user 

            await updateProfile(auth.currentUser, { displayName: newName })

			if(user.error) throw new Error({myStatus: user.error})

            setLoggedout(false)
            setUid(user.uid)
            setDisplayName(user.displayName)

		} catch ( error ) { setNotification(error.code) }
	}

    return(
        <form className="auth__form" onSubmit={(e)=>SignUp(e)}>
            <div className="auth__row">
                <h2 className="auth__title">Sign Up</h2>
            </div>

            <div className="auth__row">
                <input 
                    className="auth__input" 
                    type="input"
                    id="username" 
                    required
                    value={newName} 
                    onChange={(e)=>setNewName(e.target.value)} 
                />
                { !newName && <label className="auth__label" htmlFor="username" >Name</label> }
            </div>

            <div className="auth__row">
                <input 
                    className="auth__input" 
                    type="email" 
                    id="email"
                    value={newEmail} 
                    onChange={(e)=>setNewEmail(e.target.value)} 
                />
                { !newEmail && <label className="auth__label" htmlFor="email" >Email</label> }
            </div>
            <div className="auth__row">
                <input 
                    className="auth__input" 
                    type="password" 
                    id="pass"
                    minLength="6"
                    required
                    value={newPassword} 
                    onChange={(e)=>setNewPassword(e.target.value)} 
                />
                { !newPassword && <label className="auth__label" htmlFor="pass" >Password</label> }
            </div>

            <div className="auth__row">
                <button className="auth__submit" type="submit">Create account</button>
            </div>

            { notification && <NotificationComponent />}

            <hr className="auth__hr"/>
            
            <div className="auth__row">
                <button className="auth__create" type="button" onClick={()=>setIsVisible(true)}>Login</button>
            </div>
        </form>
    )
}

export { SignupComponent }