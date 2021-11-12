import { LoginComponent } from "../02-components/LoginComponent"
import { SignupComponent } from "../02-components/SignupComponent"
import { ChatContext } from "../../context/ChatContext"
import { useContext } from "react"

const AuthComponent = () => {
    const { isVisible } = useContext( ChatContext )

    return(
        <div className="auth">
            { isVisible ? <LoginComponent/> : <SignupComponent/> }  
        </div>
    )
}

export { AuthComponent }