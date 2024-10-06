import { connectDB } from "@/util/database.js"
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(rq, rs) {
  if (rq.method == 'POST'){
    let session = await getServerSession(rq, rs, authOptions);
    
    let data = {title : rq.body.title, content : rq.body.content}
    let db = (await connectDB).db('forum')
    let find = await db.collection('post').findOne({ _id: new ObjectId(rq.body._id) });
    if (find.author == session.user.email) {
        let result = await db.collection('post').updateOne(
          {_id : new ObjectId(rq.body._id)}, 
          { $set : data} 
        );
        rs.redirect(302, '/list')
    } else {
        return rs.status(500).json('현재유저와 작성자 불일치')
    }
  }
}