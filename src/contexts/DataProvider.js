import { useState, useEffect, createContext, useContext } from "react";
import { getFirestore, getDocs, collection, doc, getDoc, addDoc, Timestamp, collectionGroup, query } from '@firebase/firestore';
import { AuthContext } from "./AuthProvider";

export const DataContext = createContext()
export const DataProvider = function (props) {
    const [posts, setPosts] = useState([])
    const { user } = useContext(AuthContext)
    const db = getFirestore()
    useEffect(() => {
        async function getPosts() {
            // const response = await fetch('https://cdn109-fakebook.onrender.com/api/posts')
            // const data = await response.json()
            // setPosts(data)
            const postQuery = query(collectionGroup(db, 'posts'))
            const querySnapshot = await getDocs(postQuery)
            const loadedPosts = []
            querySnapshot.forEach((doc) => {

                loadedPosts.push({
                    id: doc.id,
                    uid: doc.ref.parent.parent.id,
                    ...doc.data()
                })
            })
            setPosts(loadedPosts)
        }
        getPosts()
    }, [])
    async function getPost(uid, id) {
        // const response = await fetch(`https://cdn109-fakebook.onrender.com/api/post/${id}`)
        // const data = await response.json()
        // return data
        const docRef = doc(db,'users',uid,'posts',id)
        const docSnap = await getDoc(docRef)
        if (!docSnap.exists()){
            throw new Error
        }
            return docSnap.data()
    }
    async function getPokemonData(pokemonId) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        const data = await response.json()
        return data
    }
    async function addPost(title, body){
        const newPost = {
            title,
            body,
            dateCreated: Timestamp.now(),
            username: user.displayName
        }
        const docRef = await addDoc(collection(db, 'users',user.uid ,'posts'), newPost)
        newPost.id = docRef.id
        setPosts([
            newPost,
            ...posts   
        ])
        return newPost
    }
    const value = {
        // title:title is equivqlent to title(if key and value is same)
        posts,
        getPost,
        getPokemonData,
        addPost
    }
    return (
        <DataContext.Provider value={value}>
            {props.children}
        </DataContext.Provider>
    )
}