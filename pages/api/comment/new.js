import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"

export default async function handler(rq, rs) {
  let session = await getServerSession(rq, rs, authOptions)
  if(!session){
    return rs.status(500).json('Error')
  }
  if (rq.method == 'POST'){
    rq.body = JSON.parse(rq.body)
    let 저장할거 = {
      content : rq.body.comment,
      parent : new ObjectId(rq.body._id),
      author : session.user.email
    }
    let db = (await connectDB).db('forum');
    let result = await db.collection('comment').insertOne(저장할거);
    console.log(result,'result');
    
    rs.status(200).json(저장할거)
  }
} 