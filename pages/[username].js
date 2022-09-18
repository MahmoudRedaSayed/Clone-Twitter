import {useRouter} from "next/router";
import Layout from "../components/Layout";
import TopNavLink from "../components/TopNavLink";
import {useEffect, useState} from "react";
import axios from "axios";
import Cover from "../components/Cover";
import Avatar from "../components/Avatar";
import PostContent from "../components/PostContent";
import useUserInfo from "../hooks/useUserInfo";

export default function UserPage() {
  const router = useRouter();
  const {username} = router.query;
  const [profileInfo,setProfileInfo] = useState();
  const [originalUserInfo,setOriginalUserInfo] = useState();
  const {userInfo} = useUserInfo();
  const [posts,setPosts] = useState([]);
  const [postsLikedByMe,setPostsLikedByMe] = useState([]);
  const [editMode,setEditMode] = useState(false);
  const [isFollowing,setIsFollowing] = useState(false);

  useEffect(() => {
    if (!username) {
      return;
    }
    console.log("username ",username)
    axios.get('/api/users?username='+username)
      .then(response => {
        setProfileInfo(response.data);
        setOriginalUserInfo(response.data);
        console.log("here")
        console.log(response)
        // setIsFollowing(!!response.data.follow);
      })
  }, [username]);

  useEffect(() => {
    if (!profileInfo?._id) {
        console.log("here2")
      return;
    }
    axios.get('/api/posts?author='+profileInfo._id)
      .then(response => {
        setPosts(response.data.posts);
        setPostsLikedByMe(response.data.idsLikedByMe);
      })
  }, [profileInfo]);

  function updateUserImage(type, src) {
    setProfileInfo(prev => ({...prev,[type]:src}));
  }

  async function updateProfile() {
    const {bio,name,username} = profileInfo;
    await axios.put('/api/profile', {
      bio,name,username,id:profileInfo._id
    });
    setEditMode(false);
  }

  function cancel() {
    setProfileInfo(prev => {
      const {bio,name,username} = originalUserInfo;
      return {...prev,bio,name,username};
    });
    setEditMode(false);
  }

  function toggleFollow() {
    setIsFollowing(prev => !prev);
    axios.post('/api/followers', {
      destination: profileInfo?._id,
    })
  }

  const isMyProfile = profileInfo?._id === userInfo?._id;

  return (
    <Layout>
      {!!profileInfo && (
        <div style={{position:"relative"}}>
          <div className="px-5 pt-2">
            <TopNavLink title={profileInfo.name} />
          </div>
          <Cover src={profileInfo.cover}
                 editable={isMyProfile}
                 onChange={src => updateUserImage('cover',src)} />
          <div  style={{display:"flex",justifyContent:"space-between"}}>
            <div style={{marginLeft:"20px "}}>
              <div  style={{position:"absolute",bottom:editMode?"40%":"30%",left:"5%",overflow:"hidden"}}>
                <Avatar big src={profileInfo.image} editable={isMyProfile}
                        onChange={src => updateUserImage('image',src)} />
              </div>
            </div>
            <div style={{padding:"10px"}}>
              {!isMyProfile && (
                <button onClick={toggleFollow}
                        style={(isFollowing ? {backgroundColor:"#308CD8",borderRadius:"50px" ,color:"white"} : {backgroundColor:"black" ,color:"red",borderRadius:"50px"})}>
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              )}
              {isMyProfile && (
                <div>
                  {!editMode && (
                    <button
                      onClick={() => setEditMode(true)}
                      style={{backgroundColor:"#308CD8",borderRadius:"50px" ,color:"white"}}>Edit profile</button>
                  )}
                  {editMode && (
                    <div>
                      <button
                        onClick={() => cancel()}
                        style={{backgroundColor:"#308CD8",borderRadius:"50px" ,marginRight:"10px",color:"white"}}>Cancel</button>
                      <button
                        onClick={() => updateProfile()}
                        style={{backgroundColor:"#308CD8",borderRadius:"50px" ,color:"white"}}>Save profile</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div style={{marginTop:"20px",padding:"10px"}}>
            {!editMode && (
              <h1 className="font-bold text-xl leading-5">{profileInfo.name}</h1>
            )}
            {editMode && (
              <div  style={{borderRadius:"25px",marginBottom:"10px",overflow:"hidden" ,width:"fit-content",height:"fit-content"}}>
                <input type="text" value={profileInfo.name}
                       onChange={ev => setProfileInfo(prev => ({...prev,name:ev.target.value}))}
                       style={{backgroundColor:"#2f3336",padding:"5px",borderRedius:"25px",border:"none",color:"white"}}/>
              </div>
            )}
            {!editMode && (
              <h2 className="text-twitterLightGray text-sm" style={{fontSize:"small",color:"#71767b"}}>@{profileInfo.username}</h2>
            )}
            {editMode && (
              <div  style={{borderRadius:"25px",marginBottom:"10px",overflow:"hidden" ,width:"fit-content",height:"fit-content"}}>
                <input type="text" value={profileInfo.username}
                       onChange={ev => setProfileInfo(prev => ({...prev,username:ev.target.value}))}
                       style={{backgroundColor:"#2f3336",padding:"5px",borderRedius:"25px",border:"none",color:"white"}}/>
              </div>
            )}
            {!editMode && (
              <div className="text-sm mt-2 mb-2">{profileInfo.bio}</div>
            )}
            {editMode && (
              <div style={{ marginBottom:"10px",width:"fit-content",height:"fit-content",overflow:"hidden"}}>
                <textarea value={profileInfo.bio}
                          onChange={ev => setProfileInfo(prev => ({...prev,bio:ev.target.value}))}
                          style={{backgroundColor:"#2f3336",padding:"5px",border:"none",color:"white"}}  />
              </div>
            )}
          </div>
        </div>
      )}
      {posts?.length > 0 && posts.map(post => (
        <div  style={{borderTop:"1px solid #2f3336 ",padding:"5px"}} key={post._id}>
          <PostContent {...post} likedByMe={postsLikedByMe.includes(post._id)} />
        </div>
      ))}
    </Layout>
  );
}