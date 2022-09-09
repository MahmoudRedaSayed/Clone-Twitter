import { useRef, useState } from "react"
import { useRouter } from "next/router";
export  default  function UserName({email}){
    const [username,setUsername]=useState(email?.split("@")[0])
    const router=useRouter();
    const handleSubmit= async ()=>{
        await fetch('/api/users', {
            method: 'PUT',
            headers: {'content-type':'application/json'},
            body: JSON.stringify({username}),
          }).then(()=>router.reload());

    }
    return <div style={{width:"50%",margin:"auto"}}>
        <div style={{display:"flex" , flexDirection:"column" , gap:"10px"}}>
            <input type="text" 
            style={{
                padding: "10px",
                borderRadius: "50px",} }
            value={username}
            onChange={(e)=>{setUsername(e.target.value)}}
             placeholder="Pick a username"
             ></input>
            <button style={{
                padding: "10px",
                backgroundColor: "#308CD8",
                color: "white",
                borderRadius: "50px",} }
                onClick={handleSubmit}>continue</button>
        </div>
    </div>
}