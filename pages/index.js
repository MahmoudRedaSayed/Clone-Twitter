import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import UserName from "../Components/userName";
import useUserInfo from "../hooks/useUserInfo";
import PostForm from "../Components/postForm";
import axios from "axios";
import PostContent from "../Components/PostContent";


export default function Home() {
  const {userInfo,setUserInfo,infoStatus}=useUserInfo();
  const [posts,setPosts]=useState([]);
  async function fetchPosts(){
    await axios.get("/api/posts").then(response=>{
      setPosts(response.data);
    });
  }
  useEffect(()=>{
    fetchPosts();
  })
  if(!infoStatus)
  {
    return "loading info of the user "
  }
  else
  {
    if(!userInfo.username)
    {
      return <UserName email={userInfo.email}></UserName>
    }
  }
  return (
    <div className="max-w-lg  border-l border-r min-h-screen" style={{borderWidth:"1px",borderColor:"#2f3336",borderStyle:"solid",margin:"0 20% 0 20%",borderTop:"none"}}>
        <h1 className="text-lg font-bold p-4">Home</h1>
        <PostForm onPost={()=>{fetchPosts();}} />
        {posts.length > 0 && posts.map(post => (
          <div className="border-twitterBorder p-5" style={{borderTop:"solid 1px #2f3336"}} key={post._id}>
            <PostContent {...post}></PostContent>
            </div>
          ))}
    </div>
  )
}
