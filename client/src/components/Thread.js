import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/post.actions";
import Card from "./Post/Card";
import { isEmpty } from "./Utils";

export default function Thread() {
    const [loadPost, setLoadPost] = useState(true);
    const [count, setCount] = useState(5);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postReducer);

    useEffect(() => {
        if (loadPost) {
            dispatch(getPosts(count));
            setLoadPost(false);
            setCount(count + 5);
        }

        // window.addEventListener('scroll', loadMore);
        // return () => window.removeEventListener('scroll', loadMore);
    }, [loadPost, dispatch, count]);

    return (
        <div>
            <div className="thread-container">
                <ul>
                    {!isEmpty(posts[0]) && 
                    posts.map((post) => {
                        return <Card post={post} key={post._id}/>
                    })
                    }
                </ul>
            </div>
        </div>
    )
}
