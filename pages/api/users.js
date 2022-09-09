import {initMongoose} from "../../lib/mongoose"
import User from "../../models/User";
export default async function handleUser(req,res)
{
    await initMongoose();
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