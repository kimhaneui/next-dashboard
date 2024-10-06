'use client'
import Link from "next/link";
export default function ListItem({ result }) {
    return (
        <div>
            {result.map((a, i) =>
                <div className="list-item" key={i}>
                    <Link href={'/detail/' + result[i]._id}>{result[i].title}</Link>
                    <Link href={'/edit/' + result[i]._id} className="list-btn">✏️</Link>
                    <button className="list-btn" onClick={(e) => {
                        fetch(`/api/post/delete?id=${result[i]._id}`, {
                            method: 'DELETE'
                        })
                            .then((res) => {
                                console.log(res, 'res');
                                if (res.status == 200) {
                                    e.target.parentElement.style.opacity = 0;
                                    setTimeout(() => {
                                        e.target.parentElement.style.display = 'none';
                                    }, 1000)
                                } else {
                                    alert(res.statusText)
                                }

                            })
                    }}>🗑️</button>
                    <p>{result[i].content}</p>
                </div>
            )}
        </div>
    )
}