import { db } from '../../firebase/config'
import { collection, addDoc } from "firebase/firestore"
import { useState, useContext } from 'react'
import { ChatContext } from "../../context/ChatContext"
import { v4 as uuidv4 } from 'uuid'

const FormSection = () => {
    const [ input, setInput ] = useState('')
    const { uid, displayName } = useContext( ChatContext )

    const createMessage = async(e) => {
        e.preventDefault()
        
        try {
            if(uid){
                const message =  {
                    id: uuidv4(),
                    username: uid,
                    dname: displayName,
                    content: input,
                    reactions: [],
                    timestamp: Date.now(),
                }
           
                await addDoc(collection(db, "chat"), message )

                setInput('')
            }
            else{ console.log('Debes estar logueado para enviar un mensaje') }

        } catch (error) {}
    }

    return(
        <form className="form" onSubmit={(e)=>createMessage(e)} >
            <input className="form__input" type="text" placeholder="Send a message" value={input} onChange={(e)=>setInput(e.target.value)}/>
            <button className="form__submit" type="submit" >Send</button>
        </form>
    )
}
export { FormSection }