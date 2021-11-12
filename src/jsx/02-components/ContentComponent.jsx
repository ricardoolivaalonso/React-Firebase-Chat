import { db } from '../../firebase/config'
import { doc, deleteDoc } from "firebase/firestore"
import { useState } from 'react'


const ContentComponent = ({uid, dname, messageID, usernameID, content }) => {
    const [icon, setIcon ] = useState(false)

    const deleteMessage = async(e,messageID) => {
        try {
            if(uid === usernameID) await deleteDoc(doc(db, 'chat', messageID))
        } catch (error) {}
    }

    return(
        <div 
            className="chat__content" 
            id={ messageID } 
            onDoubleClick={(e)=>setIcon(true)} 
            onMouseLeave={(e)=>setIcon(false)}
        >
            <p className="chat__description">{ content }</p>
            <span className="chat__username"> { dname }</span>
            {
                icon && (
                    uid === usernameID ? (
                        <div className="chat__bg">
                            <svg className="svg-icon chat__delete" viewBox="0 0 20 20"  onClick={(e)=>deleteMessage(e, messageID)}>
                                <path fill="#f9f9f9" d="M16.471,5.962c-0.365-0.066-0.709,0.176-0.774,0.538l-1.843,10.217H6.096L4.255,6.5c-0.066-0.362-0.42-0.603-0.775-0.538C3.117,6.027,2.876,6.375,2.942,6.737l1.94,10.765c0.058,0.318,0.334,0.549,0.657,0.549h8.872c0.323,0,0.6-0.23,0.656-0.549l1.941-10.765C17.074,6.375,16.833,6.027,16.471,5.962z"/>
                                <path fill="#f9f9f9" d="M16.594,3.804H3.406c-0.369,0-0.667,0.298-0.667,0.667s0.299,0.667,0.667,0.667h13.188c0.369,0,0.667-0.298,0.667-0.667S16.963,3.804,16.594,3.804z" />
                                <path fill="#f9f9f9" d="M9.25,3.284h1.501c0.368,0,0.667-0.298,0.667-0.667c0-0.369-0.299-0.667-0.667-0.667H9.25c-0.369,0-0.667,0.298-0.667,0.667C8.583,2.985,8.882,3.284,9.25,3.284z" />
                            </svg>
                        </div>
                    ) : null
                )
            }
        </div>
    )
}

export { ContentComponent }
