import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(rq, rs) {
    if (rq.method === 'DELETE') {
        let session = await getServerSession(rq, rs, authOptions)
        try {
            const { id } = rq.query; // URL parameter에서 id를 가져옴
            let db = (await connectDB).db('forum');
            let find = await db.collection('post').findOne({ _id: new ObjectId(id) });
            if (find.author == session.user.email) {
                let result = await db.collection('post').deleteOne({ _id: new ObjectId(id) });
                console.log(result);
                rs.status(200).json('삭제완료');
            } else {
                return 응답.status(500).json('현재유저와 작성자 불일치')
            }
        } catch (error) {
            console.error(error);
            rs.status(500).json('서버 오류');
        }
    } else {
        rs.status(404).json({ message: 'Not Found' });
    }
}