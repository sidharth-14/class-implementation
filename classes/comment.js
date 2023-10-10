"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rainfall = void 0;
const graphql_1 = require("@octokit/graphql");
const index_js_1 = require("../constants/index.js");
var rainfall;
(function (rainfall) {
    class Comment {
        constructor(repositoryId, discussionNum, issueNum, pullRequestNum) {
            if (repositoryId)
                this.repositoryId = repositoryId;
            if (discussionNum)
                this.discussionNum = discussionNum;
            if (issueNum)
                this.issueNum = issueNum;
            if (pullRequestNum)
                this.pullRequestNum = pullRequestNum;
        }
        fetchDiscussionComment() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const query = `
                query GetDiscussionComments($repo: ID!, $discussionNum: Int!) {
                    node(id: $repo) {
                      ... on Repository {
                        discussion(number: $discussionNum) {
                          author{
                            login
                          }
                          comments(first: 10) {
                            nodes {
                              id
                              body
                              createdAt
                              updatedAt
                            }
                          }
                        }
                      }
                    }
                  }
                `;
                    const response = yield (0, graphql_1.graphql)(query, {
                        repo: this.repositoryId,
                        discussionNum: this.discussionNum,
                        headers: index_js_1.headers
                    });
                    const discussionComments = response.node.discussion;
                    if (discussionComments.comments.nodes && discussionComments.comments.nodes.length > 0) {
                        const discussionCommentObjects = [];
                        for (const discussionComment of discussionComments.comments.nodes) {
                            const discussionCommentObject = new rainfall.Comment();
                            discussionCommentObject.createdBy = discussionComments.author.login;
                            discussionCommentObject.commentId = discussionComment.id;
                            discussionCommentObject.comment = discussionComment.body;
                            discussionCommentObject.createdAt = discussionComment.createdAt;
                            discussionCommentObject.updatedAt = discussionComment.updatedAt;
                            discussionCommentObjects.push(discussionCommentObject);
                        }
                        return discussionCommentObjects;
                    }
                }
                catch (error) {
                    console.error('Error fetching discussion comment data:', error);
                    throw error;
                }
            });
        }
        fetchIssueComment() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const query = `
                query GetIssueComments($repo: ID!, $issueNum: Int!) {
                    node(id: $repo) {
                      ... on Repository {
                        issue(number: $issueNum) {
                          author{
                            login
                          }
                          comments(first: 10) {
                            nodes {
                              id
                              body
                              createdAt
                              updatedAt
                            }
                          }
                        }
                      }
                    }
                }`;
                    const response = yield (0, graphql_1.graphql)(query, {
                        repo: this.repositoryId,
                        issueNum: this.issueNum,
                        headers: index_js_1.headers
                    });
                    const issueComments = response.node.issue;
                    if (issueComments.comments.nodes && issueComments.comments.nodes.length > 0) {
                        const issueCommentObjects = [];
                        for (const issueComment of issueComments.comments.nodes) {
                            const issueCommentObject = new rainfall.Comment();
                            issueCommentObject.createdBy = issueComments.author.login;
                            issueCommentObject.commentId = issueComment.id;
                            issueCommentObject.comment = issueComment.body;
                            issueCommentObject.createdAt = issueComment.createdAt;
                            issueCommentObject.updatedAt = issueComment.updatedAt;
                            issueCommentObjects.push(issueCommentObject);
                        }
                        return issueCommentObjects;
                    }
                }
                catch (error) {
                    console.error('Error fetching issue comment data:', error);
                    throw error;
                }
            });
        }
        fetchPullRequestComment() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const query = `
                query GetPullRequestComments($repo: ID!, $pullRequestNum: Int!) {
                    node(id: $repo) {
                      ... on Repository {
                        pullRequest(number: $pullRequestNum) {
                          author{
                            login
                          }
                          comments(first: 10) {
                            nodes {
                              id
                              body
                              createdAt
                              updatedAt
                            }
                          }
                        }
                      }
                    }
                  }
                  
                `;
                    const response = yield (0, graphql_1.graphql)(query, {
                        repo: this.repositoryId,
                        pullRequestNum: this.pullRequestNum,
                        headers: index_js_1.headers
                    });
                    const pullRequestComments = response.node.pullRequest;
                    if (pullRequestComments.comments.nodes && pullRequestComments.comments.nodes.length > 0) {
                        const pullRequestCommentObjects = [];
                        for (const pullRequestComment of pullRequestComments.comments.nodes) {
                            const pullRequestCommentObject = new rainfall.Comment();
                            pullRequestCommentObject.createdBy = pullRequestComments.author.login;
                            pullRequestCommentObject.commentId = pullRequestComment.id;
                            pullRequestCommentObject.comment = pullRequestComment.body;
                            pullRequestCommentObject.createdAt = pullRequestComment.createdAt;
                            pullRequestCommentObject.updatedAt = pullRequestComment.updatedAt;
                            pullRequestCommentObjects.push(pullRequestCommentObject);
                        }
                        return pullRequestCommentObjects;
                    }
                }
                catch (error) {
                    console.error('Error fetching pull request comment data:', error);
                    throw error;
                }
            });
        }
        setCreatedBy(createdBy) {
            this.createdBy = createdBy;
            return true;
        }
        setCommentId(commentId) {
            this.commentId = commentId;
            return true;
        }
        setComment(comment) {
            this.comment = comment;
            return true;
        }
        setCreatedAt(createdAt) {
            this.createdAt = createdAt;
            return true;
        }
        setUpdatedAt(updatedAt) {
            this.updatedAt = updatedAt;
            return true;
        }
        getRepositoryID() {
            return this.repositoryId;
        }
        getDiscussionNum() {
            return this.discussionNum;
        }
        getIssueNum() {
            return this.issueNum;
        }
        getPullRequestNum() {
            return this.pullRequestNum;
        }
        getCreatedBy() {
            return this.createdBy;
        }
        getCommentId() {
            return this.commentId;
        }
        getComment() {
            return this.comment;
        }
        getCreatedAt() {
            return this.createdAt;
        }
        getUpdatedAt() {
            return this.updatedAt;
        }
    }
    rainfall.Comment = Comment;
})(rainfall || (exports.rainfall = rainfall = {}));
