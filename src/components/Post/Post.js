import React from 'react';
import './Post.css';
import { CommentList } from '../';

const Post = ({article, comments}) => (
    <div className="Post">
        <h1>{article.title}</h1>
        <p>{article.body}</p>
        <CommentList comments={comments}/>
    </div>
);

export default Post;