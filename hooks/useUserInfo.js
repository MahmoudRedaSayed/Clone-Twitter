import {useEffect,useState} from "react";
import {useSession} from "next-auth/react";

export default function useUserInfo() {

    const {data:session,status}=useSession();
    const [userInfo,setUserInfo]=useState();
    const [infoStatus,setInfoStatus]=useState(false);
    async function getUserInfo(){
      if(status==="loading")
        return ;
        if(status==="authenticated")
        {
            console.log(session)
             fetch( `/api/users?id=${session.user.email}`).then(response=>{
                response.json().then(data=>{
                setUserInfo(data);
                setInfoStatus(true)
                })
            })
        }
    }
    useEffect(()=>{
      getUserInfo();
    },[status])

  return {userInfo,setUserInfo,infoStatus};
}