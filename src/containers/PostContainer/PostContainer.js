import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as articleActions from '../../redux/modules/article';
import { PostWrapper, Navigator, Post, PostList } from '../../components';

class PostContainer extends Component {
    state = {
        warningVisibility: false
    };

    static  propTypes = {
        articleId: PropTypes.number,
        loading: PropTypes.bool, // tells whether the request is waiting for response or not
        post: PropTypes.object,
        article: PropTypes.object,
        articles: PropTypes.object,
        comments: PropTypes.object,
        state: PropTypes.object
    }

    // static defaultProps = {
    //     articleId: 1,
    //     fetching: false,
    //     post: {},
    //     comments: [],
    //     state: null
    // };

    componentDidMount() {
        const {articleId, get, list} = this.props;
        list();
        get(articleId);
    }

    handleNavigateClick = (type) => {
        const {articleId, get} = this.props;
        if(type === 'NEXT') {
            get(articleId+1);
        } else {
            get(articleId-1);
        }
    }

    render() {
        //console.log(this.props.state.article.get('articles'));
        console.log(this.props.state.article.get('comments'));
        const {warningVisibility} = this.state;
        const {get, articleId, fetching, article, comments, articles} = this.props;
        return (
            <PostWrapper>
                <PostList
                    articles={articles.toJS()}
                />
                <Navigator
                    articleId={articleId}
                    disabled={fetching}
                    onClick={this.handleNavigateClick}
                />
                <Post
                    articleId={articleId}
                    article={article}
                    comments={comments.toJS()}
                />
            </PostWrapper>
        )
    }
}

// store 안의 state 값을 props 로 연결해줍니다.
const mapStateToProps = (state) => ({
    articleId: state.article.get('id'),
    loading: state.article.get('loading'), // tells whether the request is waiting for response or not
    article: state.article.get('article'),
    articles: state.article.get('articles'),
    comments: state.article.get('comments'),
    state: state
});

const mapDispatchToProps = (dispatch) => ({
    list: () => dispatch(articleActions.listAsync()),
    get: (id) => dispatch(articleActions.getAsync(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostContainer);