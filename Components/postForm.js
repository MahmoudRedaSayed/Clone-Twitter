import useUserInfo from "../hooks/useUserInfo";
import {useState} from "react";
import axios from "axios";

export default function PostForm({compact,parent,placeholder='What\'s happening?',onPost}) {
  const {userInfo,status} = useUserInfo();
  const [text,setText] = useState('');
  const [images,setImages] = useState([]);

  async function handlePostSubmit(e) {
    e.preventDefault();
    await axios.post('/api/posts', {text,parent,images});
    setText('');
    setImages([]);
    if(onPost) {
      onPost();
    }
  }

  if (status === 'loading') {
    return '';
  }
  return (
    
    <form className="mx-5" onSubmit={handlePostSubmit}>
        <div className="flex" style={{gap:"10px"}}>
        <div className="p-2" style={{display:"flex",flexDirection:"row",alignItems:"center",gap:"10px"}}>
          <img style={{borderRadius:"50%"}} src={userInfo?.image} alt="avtar" />
          <p>{userInfo?.username}</p>
        </div>
        <div  className="grow pl-2">
              <textarea className="w-full p-2 bg-transparent text-twitterWhite" style={{color:"#fff" , width:"100%" , border:"none"}}
                        value={text}
                        onChange={e => setText(e.target.value)}
                        placeholder={placeholder} />

      {!compact && (<div className="text-right border-t border-twitterBorder p-2"style={{display:"flex",flexDirection:"row-reverse"}}>
                  <button className=" text-white px-5 py-1 rounded-full" style={{backgroundColor:"#308CD8",borderRadius:"50px"}}>Tweet replay2 </button>
              </div>)}
        {compact && (
          <div className="pl-2" style={{display:"flex",flexDirection:"row-reverse"}}>
            <button className=" text-white px-5 py-1 rounded-full"  style={{backgroundColor:"#308CD8",borderRadius:"50px"}}>Tweet replay </button>
          </div>
        )}
        </div>
        </div>
     </form>
  );
}