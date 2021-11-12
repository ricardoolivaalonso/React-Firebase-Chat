import { useState, useEffect } from 'react'
import { db } from './firebase'
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const App = () => {

	const [usuarios, setUsuarios] = useState([])
	let usuario = []

	const getData = async() => {
		const querySnapshot = await getDocs(collection(db, "usuarios"));
		querySnapshot.forEach((doc) => {

			usuario = [
				...usuario,
				{
					id: doc.id,
					nombre: doc.data().nombre,
					mensajes: doc.data().mensajes
				}
			]

			setUsuarios( usuario )
		});

		const querySnapshot2 = doc(db, "usuarios", "iAidJm6bXeEEdXKr3lqe")
		const docSnap = await getDoc(querySnapshot2);
		// console.log(docSnap.data().mensajes[1])


	}

	const setData = async() => {
		const usuario = { 
			nombre: 'panchito',
			mensajes: [
				{	
					id: "m0001",
					contenido: 'Testing'
				},
				{	
					id: "m0002",
					contenido: 'Testing 2'
				}
			]
		}
		const tema = {
			nombre: 'chistes',
			lista: [
				{
					id: "c0001",
					contenido: 'chiste 1'
				}
			]
		}
		// const datos = await addDoc(collection(db, "usuarios"), usuario );
		const datos = await addDoc(collection(db, "temas"), tema );

	}

	const updateData = async() => {
		const usuario = { 
			nombre: 'panchito esta actualizado',
			mensajes: [
				{	
					id: "m0001",
					contenido: 'Testing actualizado'
				},
				{	
					id: "m0002",
					contenido: 'Testing 2'
				}
			]
		}


		await updateDoc(doc(db, 'usuarios', 'Ck0IKZp2maEZgXye4rvl'), usuario)
	}

	const deletaData = async() => {
		await deleteDoc(doc(db, 'usuarios', 'Ck0IKZp2maEZgXye4rvl'));
	}

	const createUser = async() => {
		const auth = getAuth()
		let email = 'email3@gmail.com'
		let password = '123456'

		try {
			const create = await createUserWithEmailAndPassword(auth, email, password)
			const done = await create.user 

			if(done.error) throw {myStatus: done.error}

			console.log("crear", done.email)

		} catch ( error ) {
			console.log("crear", error.message,"<==>" ,error.code )
		}
	}

	const Login = async() => {

		const auth = getAuth()
		let email = 'email1@gmail.com'
		let password = '123456'

		try {
			const getuser = await signInWithEmailAndPassword(auth, email, password)
			const done = await getuser.user 

			if(done.error) throw {myStatus: done.error}

			console.log("Login",done.email)

		} catch ( error ) {
			console.log("login",error.message,"<==>" ,error.code )
		}
	}

	

		


	
	useEffect(() => {
		getData()
		// updateData()
		// setData()
		// deletaData()
		createUser()
		// Login()


	}, [])





	return(
		<div>
			{
				usuarios.map( usr => 
					<div key={ usr.id }>
						<h1>{ usr.id } { usr.nombre } </h1> 
						{ usr.mensajes.map( msj => <h2 key={ msj.id }> { msj.id } - { msj.contenido }</h2> ) }
					</div>
				)
			}
		
				
			
		</div>
	)
}

export default App;
