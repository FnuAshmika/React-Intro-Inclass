import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Post from '../components/Post';
import { DataContext } from "../contexts/DataProvider";

export default function PostSingle() {
    const { uid, id } = useParams()
    const [post, setPost] = useState({})
    const [error, setError] = useState(false)
    const { getPost } = useContext(DataContext)
  
    useEffect(() => {
        async function handleLoad() {
            try{
                const data = await getPost(uid, id)
                setPost(data)
            }catch(err){
                setError(true)
            }
        }
        handleLoad()

    }, [])
    return (
        <div>
            {error ? <>
                <p>404 Page not found</p>  
                </>: <>
                    <h1>Post Single: {id}</h1>
                    <Post post={post} hideLink={true} /> </>

            }

        </div>
    )
}