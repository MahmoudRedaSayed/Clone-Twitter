import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import UserName from "../Components/userName";

export default function Home() {
  const {data:session,status}=useSession();
  const [userInfo,setUserInfo]=useState();
  const [infoStatus,setInfoStatus]=useState(false);
  async function getUserInfo(){
    if(status==="loading")
      return ;
    console.log(session.user.email);
    await fetch( `/api/users?id=${session.user.email}`).then(response=>{
      response.json().then(data=>{
        setUserInfo(data);
        console.log("data",data)
        console.log("userInfo",userInfo);
        setInfoStatus(true)
      })
    })
  }
  useEffect(()=>{
    getUserInfo();
  },[status])
  if(!infoStatus)
  {
    return "loading info of the user "
  }
  else
  {
    if(!userInfo.username)
    {
      return <UserName></UserName>
    }
  }
  return (
    <div >
      index
    </div>
  )
}
