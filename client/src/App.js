import React from "react";
import PostCreate from "./PostCreate";
import PostList from "./PostList";

export default () => {
    return <div className="container">
        <h1> Client Post</h1>
        <PostCreate />
        <hr />
        <div>
        <h1>Post Lists</h1>
        <PostList />
        </div>
    </div>
};