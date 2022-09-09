import {getProviders, signIn, useSession} from "next-auth/react";
import { useRouter } from "next/router";
export default function login({providers}){
    const {data,status}=useSession();
    const router=useRouter();
    if(status==="loading")
    {
        return " ";
    }
    else if(status==="authenticated")
    {
        router.push("/")
    }
    return <div 
    style={{display:"flex" 
    , alignItems:"center"
    ,justifyContent:"center"
    ,marginTop:"45%"}}>
        {
            Object.values(providers).map(provider=>(
                <div key={provider.name}>
                <button onClick={async()=>{
                    await signIn(provider.id);
                }} style={{display:"flex",backgroundColor:"#fefefe" ,color:"#308CD8",padding:"30px",borderRadius:"30px"}}>
                    <img src="/Google.png" style={{width:"50px",borderRadius:"40px"}}></img><p>signin with {provider.name}</p></button>
                </div>
            ))
        }
    </div>
}

export async function getServerSideProps(){
    const providers=await getProviders();
    return {props:{
        providers
    }}
}