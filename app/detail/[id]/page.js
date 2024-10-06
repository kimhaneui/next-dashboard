import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database";
import Comment from "./Comment";
import { notFound } from "next/navigation";

export default async function Detail(props) {
    try {
        if (!ObjectId.isValid(props.params.id)) {
            throw new Error("Invalid ObjectId format");
        }

        const postId = new ObjectId(props.params.id);
        
        let db = (await connectDB).db('forum');
        let result = await db.collection('post').findOne({ _id: postId });

        if (!result) {
            return notFound();
        }

        return (
            <div>
                <h4>상세페이지임</h4>
                <h4>{result.title}</h4>
                <p>{result.content}</p>
                <Comment _id={result._id.toString()} />
            </div>
        );
    } catch (error) {
        console.error(error);
        return notFound();
    }
}
