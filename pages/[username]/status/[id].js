import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
import PostContent from "../../../components/PostContent";
import Layout from "../../../Components/Layout";
import Link from "next/link";
import useUserInfo from "../../../hooks/useUserInfo";
import PostForm from "../../../components/PostForm";
import TopNavLink from "../../../components/TopNavLink";

export default function postPage() {
  const router = useRouter();
  const {id} = router.query;
  const [post,setPost] = useState();
  const [replies,setReplies] = useState([]);
  const [repliesLikedByMe,setRepliesLikedByMe] = useState([]);
  const {userInfo} = useUserInfo();

  function fetchData() {
    axios.get('/api/posts?id='+id)
      .then(response => {
        setPost(response.data.post);
      });
    axios.get('/api/posts?parent='+id)
      .then(response => {
        setReplies(response.data.posts);
        setRepliesLikedByMe(response.data.idsLikedByMe);
      })
  }

  useEffect(() => {
    if (!id) {
      return;
    }
    fetchData();
  }, [id]);

  return (
    <Layout>
      {!!post?._id && (
        <div className="px-5 py-2" style={{padding:"20px 50px"}}>
          <TopNavLink />
          {post.parent && (
            <div className="pb-1">
              <PostContent {...post.parent} />
              <div className="ml-5 h-12 relative" style={{position:"relative",height:"50px",marginLeft:"10px"}}>
                <div className="h-20 border-l-2 border-twitterBorder absolute -top-5"
                     style={{marginLeft:'2px',height:"60px",borderLeft:"2px solid #2f3336 " ,position:"absolute",top:"-5px"}}></div>
              </div>
            </div>
          )}
          <div>
            <PostContent {...post} big />
          </div>
        </div>
      )}
      {!!userInfo && (
        <div className="border-t border-twitterBorder py-5" style={{border:"1px solid #2f3336",padding:"10px"}}>
          <PostForm onPost={fetchData}
                    parent={id}
                    compact placeholder={'Tweet your reply'} />
        </div>
      )}
      <div className="">
        {replies.length > 0 && replies.map(reply => (
          <div style={{padding:"10px",border:"1px solid #2f3336"}} key={reply._id}>
            <PostContent {...reply} likedByMe={repliesLikedByMe.includes(reply._id)} />
          </div>
        ))}
      </div>
    </Layout>
  );
}