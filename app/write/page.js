import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Image from "./Image";

export default async function Write() {
    let session = await getServerSession(authOptions);
    if (!session) {
        return <div>로그인 하세요</div>
    }
    return (
        <div className="p-20">
            <h4>글작성</h4>
            <form action="/api/post/new" method="POST">
                <input name="title" placeholder="글제목" />
                <input name="content" placeholder="글내용" />
                <Image />
                <button type="submit">전송</button>
            </form>
        </div>
    )
} 