import { db } from '../../firebase/config'
import { collection, query, onSnapshot } from "firebase/firestore";
import { useState, useEffect, useContext, useRef } from 'react'
import { ContentComponent } from '../02-components/ContentComponent'
import { LikeComponent } from '../02-components/LikeComponent'
import { ChatContext } from "../../context/ChatContext"

const ChatSection = () => {

    const { uid } = useContext( ChatContext )
    const [ state, setState ] = useState([])
    const chatRef = useRef(null)
   
    const getList = async() => {
        try {
            if(uid!==false){
                
                const q = await query(collection(db, "chat"))
                onSnapshot(q, (querySnapshot) => {
                    
                    let msgList = []
                    querySnapshot.forEach((msg) => {
                    
                        msgList = [
                            ...msgList,
                            {
                                messageID: msg.id,
                                usernameID: msg.data().username,
                                dname: msg.data().dname,
                                content: msg.data().content,
                                reactions: msg.data().reactions,
                                timestamp: msg.data().timestamp
                            }
                        ]
                        
                        return msgList.sort((a,b) => a.timestamp - b.timestamp )
                    })
                    setState( msgList )
                })
            }
            else{
                console.log('Debes estar logueado para ver los mensajes')
                setState([])
            }
        } catch (error) { }
	}

    const scrollToBottom = () => chatRef.current.scrollIntoView({ behavior: "smooth" })
      
    
    useEffect(() => {
        scrollToBottom()
    }, [state])
    
	useEffect(() => {
		getList()
	},[uid])


    return(
        <div className="chat" >
            <div className="chat__list">
                {
                    state.map( msg => 
                        <article className={`chat__item ${uid !== msg.usernameID ? 'chat__item--current': null}`} key={ msg.messageID } >
                            <ContentComponent 
                                messageID = { msg.messageID }
                                usernameID = { msg.usernameID }
                                content = { msg.content }
                                dname = { msg.dname }
                                uid = { uid }
                            />
                            {
                                <LikeComponent 
                                    messageID = { msg.messageID }
                                    reactions = { msg.reactions }
                                    dname = { msg.dname }
                                    uid = { uid }
                                />
                            }
                            
                        </article>
                    )
                }
                <div ref={chatRef}></div>
            </div>
        </div>
    )
}

export { ChatSection }