import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import UserName from "../Components/userName";
import useUserInfo from "../hooks/useUserInfo";
import PostForm from "../Components/postForm";

export default function Home() {
  const {userInfo,setUserInfo,infoStatus}=useUserInfo();
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
    <div className="max-w-lg  border-l border-r min-h-screen" style={{borderWidth:"1px",borderColor:"#fff",borderStyle:"solid",margin:"0 20% 0 20%"}}>
        <h1 className="text-lg font-bold p-4">Home</h1>
        <PostForm />
    </div>
  )
}
