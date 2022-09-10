import Post from "../../models/Post";
import {unstable_getServerSession} from "next-auth"
import { authOptions } from "./auth/[...nextauth]";
import { initMongoose } from "../../lib/mongoose";
import axios from "axios";

export default async function handlePost(req,res)
{
    await initMongoose();
    const session=await unstable_getServerSession(req,res,authOptions);
    if(req.method==="GET")
    {
        res.json(await Post.find({}).populate("author").sort({createdAt:-1}));
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