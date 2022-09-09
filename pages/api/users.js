import {initMongoose} from "../../lib/mongoose"
import User from "../../models/User";
import {unstable_getServerSession} from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
export default async function handleUser(req,res)
{
    await initMongoose();
    if (req.method === 'PUT') {
        const session = await unstable_getServerSession(req, res, authOptions);
        console.log(session);
        const {username} = req.body;
        await User.findOneAndUpdate({email:session.user.email}, {username});
        res.json("ok");
    }
    else if(req.method==="GET")
    {
        const id=req.query.id;
        const user=await User.findOne({email:id});
        if(user)
        {
            console.log(user)
            res.json(user);
    
        }
        else
            res.status(400).json("not found");
        
    }
}