import { useSession,signOut } from "next-auth/react"
import { useEffect, useState } from "react";
import UserName from "../Components/userName";
import useUserInfo from "../hooks/useUserInfo";
import PostForm from "../Components/postForm";
import axios from "axios";
import PostContent from "../Components/PostContent";
import { useRouter } from "next/router";
import { data } from "autoprefixer";
import ClipLoader from "react-spinners/ClipLoader";


export default function Home() {
  const {data:session} = useSession();
  const {userInfo,setUserInfo,infoStatus:userInfoStatus,uid} = useUserInfo();
  const [posts,setPosts] = useState([]);
  const [idsLikedByMe,setIdsLikedByMe] = useState([]);
  const router = useRouter();

  function fetchPosts() {
    axios.get('/api/posts?email='+session?.user.email).then(response => {
      setPosts(response.data.posts);
      setIdsLikedByMe(response.data.idsLikedByMe);
    });
  }

  async function logout() {
    setUserInfo(null);
    await signOut();
  }

  useEffect(() => {
    console.log(session)
    fetchPosts();
  }, []);
  if(!userInfoStatus)
  {
    return <ClipLoader color={"red"} loading={userInfoStatus} size={150}/>
  }
  else
  {
    if(userInfo&&!(userInfo.username))
    {
      return <UserName email={userInfo?.email}></UserName>
    }
  }
  return (
    <div className="max-w-lg  border-l border-r min-h-screen" style={{borderWidth:"1px",borderColor:"#2f3336",borderStyle:"solid",margin:"0 20% 0 20%",borderTop:"none"}}>
        <h1 className="text-lg font-bold p-4">Home</h1>
      {session&&<PostForm onPost={()=>{fetchPosts();}} />}
        {posts.length > 0 && posts.map(post => (
          <div className="border-twitterBorder p-5" style={{borderTop:"solid 1px #2f3336"}} key={post._id}>
             {post.parent && (
              <div>
                <PostContent {...post.parent} />
                <div className="ml-5 h-12 relative" style={{position:"relative",height:"50px",marginLeft:"10px"}}>
                <div className="h-20 border-l-2 border-twitterBorder absolute -top-5"
                     style={{marginLeft:'2px',height:"60px",borderLeft:"2px solid #2f3336 " ,position:"absolute",top:"-5px"}}></div>
              </div>
              </div>
            )}
            <PostContent {...post} likedByMe={idsLikedByMe.includes(post._id)}></PostContent>
            </div>
          ))}
          {userInfo && (
        <div className="p-5 text-center border-t border-twitterBorder" style={{padding:"5px",textAlgin:"center",borderTop:"1px solid #2f3336 "}}>
          <button onClick={logout} className="bg-twitterWhite text-black px-5 py-2 rounded-full">Logout</button>
        </div>
      )}
    </div>
  )
}
