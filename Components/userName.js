import { useRef } from "react"

export default function UserName(){
    const nameRef=useRef()
    return <div style={{width:"50%",margin:"auto"}}>
        <div style={{display:"flex" , flexDirection:"column" , gap:"10px"}}>
            <input type="text" 
            style={{
                padding: "10px",
                borderRadius: "50px",} }
            ref={nameRef}
             placeholder="Pick a username"></input>
            <button style={{
                padding: "10px",
                backgroundColor: "#308CD8",
                color: "white",
                borderRadius: "50px",} }>continue</button>
        </div>
    </div>
}