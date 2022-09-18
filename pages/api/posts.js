import Post from "../../models/Post";
import {unstable_getServerSession} from "next-auth"
import { authOptions } from "./auth/[...nextauth]";
import { initMongoose } from "../../lib/mongoose";
import axios from "axios";
import Like from "../../models/Like"
import User from "../../models/User";

export default async function handlePost(req,res)
{
    await initMongoose();
    const session=await unstable_getServerSession(req,res,authOptions);
    if(req.method==="GET")
    {

    const {id,email} = req.query;
    if (id) {
      const post = await Post.findById(id)
      .populate('author')
      .populate({
        path: 'parent',
        populate: 'author',
      });
      console.log("post ",post)
      res.json({post});
    }
      else
      {
        console.log(session)
        const user=await User.findOne({email})
        console.log(user);
        const parent=req.query.parent||null
        const author=req.query.author;
        let searchFilter;
        if (author) {
          searchFilter = {author};
        }
        if (parent) {
          searchFilter = {parent};
        }
        const posts =await Post.find(searchFilter).populate('author').populate({
          path: 'parent',
          populate: 'author',
        }).sort({createdAt:-1});
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
        const {text,parent}=req.body;
        const post=await Post.create({
            text,
            parent,
            author:session.user.id
        });
        if (parent) {
          const parentPost = await Post.findById(parent);
          parentPost.commentsCount = await Post.countDocuments({parent});
          await parentPost.save();
        }
        res.json(post);
    }
}