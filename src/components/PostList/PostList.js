import React from 'react';
import './PostList.css';

const CommentList = ({articles}) => {
    const list = articles.map(
        article => (<li key={article.id}>{article.title}</li>)
    );
    return (
        <ul className="PostList">
            {list}
        </ul>
    );
};


export default CommentList;