import { connectDB } from '@/util/database';
import { authOptions } from '../auth/[...nextauth]';
import { getServerSession } from 'next-auth';

export default async function handler(rq, rs) {
    let session = await getServerSession(rq, rs, authOptions)
  if (session) {
    rq.body.author = session.user.email
  }
    if (rq.method === 'POST') {
        if (rq.body.title === '') {
            return rs.status(400).json('제목써라');
        }
        if (rq.body.content === '') {
            return rs.status(400).json('내용써라');
        }
        
        try {
            let db = (await connectDB).db('forum');
            let result = await db.collection('post').insertOne(rq.body);
            return rs.redirect(302, '/list');
        } catch (error) {
            console.error('Error inserting post:', error);
            return rs.status(500).json('서버 오류'); 
        }
    }
    
    return rs.status(405).json('Method Not Allowed');
}
