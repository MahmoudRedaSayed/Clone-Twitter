import {initMongoose} from "../../lib/mongoose";
import {authOptions} from "./auth/[...nextauth]";
import {unstable_getServerSession} from "next-auth";
import User from "../../models/User";

export default async function handler(req, res) {
  await initMongoose();
  const session = await unstable_getServerSession(req, res, authOptions);
  const {bio,name,username,id} = req.body;
  await User.findByIdAndUpdate(id, {bio,name,username});
  res.json('ok');
}