import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import UserName from "../Components/userName";
import useUserInfo from "../hooks/useUserInfo";
import PostForm from "../Components/postForm";
import axios from "axios";
import PostContent from "../Components/PostContent";
import { useRouter } from "next/router";


export default function Home() {
  const {data:session} = useSession();
  const {userInfo,setUserInfo,status:userInfoStatus} = useUserInfo();
  const [posts,setPosts] = useState([]);
  const [idsLikedByMe,setIdsLikedByMe] = useState([]);
  const router = useRouter();

  function fetchPosts() {
    axios.get('/api/posts').then(response => {
      setPosts(response.data.posts);
      setIdsLikedByMe(response.data.idsLikedByMe);
    });
  }

  async function logout() {
    setUserInfo(null);
    await signOut();
  }

  useEffect(() => {
    fetchPosts();
  }, []);
  if(userInfoStatus)
  {
    return "loading info of the user "
  }
  else
  {
    if(!userInfo?.username)
    {
      return <UserName email={userInfo?.email}></UserName>
    }
  }
  return (
    <div className="max-w-lg  border-l border-r min-h-screen" style={{borderWidth:"1px",borderColor:"#2f3336",borderStyle:"solid",margin:"0 20% 0 20%",borderTop:"none"}}>
        <h1 className="text-lg font-bold p-4">Home</h1>
        <PostForm onPost={()=>{fetchPosts();}} />
        {posts.length > 0 && posts.map(post => (
          <div className="border-twitterBorder p-5" style={{borderTop:"solid 1px #2f3336"}} key={post._id}>
            <PostContent {...post} likedByMe={idsLikedByMe.includes(post._id)}></PostContent>
            </div>
          ))}
    </div>
  )
}
