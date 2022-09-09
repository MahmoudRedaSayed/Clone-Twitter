import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import UserName from "../Components/userName";
import useUserInfo from "../hooks/useUserInfo";

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
    <div >
      index
    </div>
  )
}
