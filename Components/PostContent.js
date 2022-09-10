import Avatar from "./Avatar";
import ReactTimeAgo from "react-time-ago";
import Link from "next/link";
import PostButtons from "./PostButtons";

function PostContent({
  text,author,createdAt,_id,
  likesCount,likedByMe,commentsCount,
  images,
  big=false}) {

  function showImages() {
    if (!images?.length) {
      return '';
    }
    return (
      <div  style={{display:"flex"}}>
        {images.length > 0 && images.map(img => (
          <div className="m-1" key={img}>
            <img src={img} alt=""/>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div style={{display:"flex",width:"100%"}}>
        <div>
          {!!author?.image && (
            <Link href={'/'+author?.username}>
              <div style={{cursor:"pointer"}}>
                <Avatar src={author.image} />
              </div>
            </Link>
          )}
        </div>
        <div className="pl-2 grow">
          <div>
            <Link href={'/'+author?.username}>
              <span style={{cursor:"pointer",font:"bold",paddingRight:"10px"}}>{author?.name}</span>
            </Link>
            {big && (<br />)}
            <Link href={'/'+author?.username}>
              <span style={{cursor:"pointer",color:"#71767b"}}>@{author?.username}</span>
            </Link>
            {createdAt && !big && (
              <span style={{paddingLeft:"10px",cursor:"pointer",color:"#71767b"}}>
              {/* <ReactTimeAgo date={createdAt} timeStyle={'twitter'} /> */}
            </span>
            )}
          </div>
          {!big && (
            <div>
              <Link href={`/${author?.username}/status/${_id}`}>
                <div className="w-full cursor-pointer">
                  {text}
                  {showImages()}
                </div>
              </Link>
              <PostButtons username={author?.username} id={_id} likesCount={likesCount} likedByMe={likedByMe} commentsCount={commentsCount} />
            </div>
          )}
        </div>
      </div>
      {big && (
        <div className="mt-2">
          <Link href={`/${author?.username}/status/${_id}`}>
            <div>
              {text}
              {showImages()}
            </div>
          </Link>
          {createdAt && (
            <div className="text-twitterLightGray text-sm">
              {(new Date(createdAt))
                .toISOString()
                .replace('T', ' ')
                .slice(0,16)
                .split(' ')
                .reverse()
                .join(' ')
              }
            </div>
          )}
          <PostButtons username={author?.username} id={_id} likesCount={likesCount} likedByMe={likedByMe} commentsCount={commentsCount} />
        </div>
      )}
    </div>
  );
}

export default PostContent;