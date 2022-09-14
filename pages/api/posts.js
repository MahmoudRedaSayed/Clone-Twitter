import Post from "../../models/Post";
import {unstable_getServerSession} from "next-auth"
import { authOptions } from "./auth/[...nextauth]";
import { initMongoose } from "../../lib/mongoose";
import axios from "axios";
import Like from "../../models/Like"

export default async function handlePost(req,res)
{
    await initMongoose();
    const session=await unstable_getServerSession(req,res,authOptions);
    if(req.method==="GET")
    {

        const {id} = req.query;
    if (id) {
      const post = await Post.findById(id)
        .populate('author')
        .populate({
          path: 'parent',
          populate: 'author',
        });
      res.json({post});
    }
      else
      {
        const posts =await Post.find({}).populate("author").sort({createdAt:-1});
          let postsLikedByMe = [];
          if (session) {
            postsLikedByMe = await Like.find({
              author:session.user.id,
              post:posts.map(p => p._id),
            });
          }
          let idsLikedByMe = postsLikedByMe.map(like => like.post);
          res.json({
            posts,
            idsLikedByMe,
          });
        }
      
    }
    if(req.method==='POST')
    {
        const {text,id}=req.body;
        
        const post=await Post.create({
            text,
            author:id
        });
        res.json(post);
    }
}