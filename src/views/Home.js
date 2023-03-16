import { useEffect, useState, useContext } from "react";
import Post from '../components/Post';
import { DataContext } from "../contexts/DataProvider";
import PostForm from "../components/PostForm";
import { AuthContext } from "../contexts/AuthProvider";

export default function Home(){
    const { posts } = useContext(DataContext)
    const { user } = useContext(AuthContext)
    return (
        <div>
            <h1>Home</h1>
            {user.loggedIn?
            <PostForm />
            : <></>}
            { posts.map((post)=> <Post post={post} key={post.id}/>) }
        </div>
    )
}