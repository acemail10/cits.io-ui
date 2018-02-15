import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setArticlesData } from "../../actions/setArticlesData";
import { setArticleEditState } from "../../actions/setArticleEditState";
import { setCurrentArticleEntry } from "../../actions/setCurrentArticleEntry";
import { setCurrentViewArticle } from "../../actions/setCurrentViewArticle";
import ArticleEntry from "./ArticleEntry";
import ArticleEntryForm from './ArticleEntryForm';
import ArticleProfile from './ArticleProfile';
import axios from "axios";
import './articles.css';

class Articles extends Component {
  constructor(props) {
    super(props);
    this.config = {
      headers: {
        authorization: ''
      }
    };
  }

  async componentWillMount() {
    this.REST_URL = (process.env.NODE_ENV === 'production') ? process.env.REST_SERVER_AWS_HOST : process.env.REST_SERVER_LOCAL_HOST;
    
    this.config.headers.authorization = await localStorage.getItem('token');
    this.props.setArticleEditState('0');
    this.props.setCurrentViewArticle('0');
    const { data } = await axios.get(`${this.REST_URL}/api/articles/fetchAllArticles/${localStorage.getItem('propertyId')}`, this.config);
    await this.props.setArticlesData(data);
  }

  async onAddHandler() {
    await this.props.setCurrentArticleEntry({});
    await this.props.setArticleEditState('1');
    
  }

  async onCancelHandler() {
    await this.props.setArticleEditState('0');
  }

  render() {
    return (
      <div>
        <h2 align="center">NEWS</h2>
        <br/>
        <div className="container">
          <div className="row">
                {localStorage.getItem('type') === '1' ? (
                  this.props.currentArticleEntry &&
                  this.props.articleEditState !== '0' ? (
                    <div>
                    <ArticleEntryForm data={this.props.currentArticleEntry}  />
                    <button onClick={this.onCancelHandler.bind(this)}>CANCEL</button> 
                    </div>
                  ) : 
                  this.props.articlesData && this.props.currentViewArticle === '0' ? (
                    this.props.articlesData.map(article => {
                      return <ArticleEntry article={article} key={article.id} />;
                    })
                  ) : (
                    <div>
                      <ArticleProfile/>
                    </div>
                  )
                ) : this.props.articlesData && this.props.currentViewArticle === '0'? (
                  this.props.articlesData.map(article => {
                    return <ArticleEntry article={article} key={article.id} />;
                  })
                ) : (
                  <div>
                    <ArticleProfile/>
                  </div>
                )}

              </div>
                {this.props.articleEditState === "0" &&
                localStorage.getItem('type') === '1' && this.props.currentViewArticle === '0' ? (
                  <button onClick={this.onAddHandler.bind(this)}>ADD NEW ENTRY</button>
                ) : null}
            </div>
          </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    articlesData: state.articlesData,
    currentArticleEntry: state.currentArticleEntry,
    articleEditState: state.articleEditState,
    currentProperty: state.currentProperty,
    currentViewArticle: state.currentViewArticle,
    currentArticlePosts: state.currentArticlePosts
  };
};

const matchDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setArticlesData: setArticlesData,
      setCurrentArticleEntry: setCurrentArticleEntry,
      setArticleEditState: setArticleEditState,
      setCurrentViewArticle: setCurrentViewArticle
    },
    dispatch
  );
};

export default connect(mapStateToProps, matchDispatchToProps)(Articles);
