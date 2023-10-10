import { graphql } from '@octokit/graphql';
import { headers } from '../constants/index.js';
import { rainfall as rainfallNamespace } from '../interfaces/comment';

export namespace rainfall {
    export class Comment implements rainfallNamespace.IComment {
        repositoryId: string;
        discussionNum: number;
        issueNum: number;
        pullRequestNum: number;
        createdBy: string;
        commentId: string;
        comment: string;
        createdAt: Date;
        updatedAt: Date;

        constructor(repositoryId?: string, discussionNum?: number, issueNum?: number, pullRequestNum?: number) {
            if (repositoryId)
                this.repositoryId = repositoryId;

            if (discussionNum)
                this.discussionNum = discussionNum;

            if (issueNum)
                this.issueNum = issueNum

            if (pullRequestNum)
                this.pullRequestNum = pullRequestNum
        }

        async fetchDiscussionComment() {
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

                const response: any = await graphql(query, {
                    repo: this.repositoryId,
                    discussionNum: this.discussionNum,
                    headers: headers
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
            } catch (error) {
                console.error('Error fetching discussion comment data:', error);
                throw error;
            }
        }

        async fetchIssueComment(){
            try{
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

                const response: any = await graphql(query, {
                    repo: this.repositoryId,
                    issueNum: this.issueNum,
                    headers: headers
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
                

            } catch (error) {
                console.error('Error fetching issue comment data:', error);
                throw error;
            }
        }

        async fetchPullRequestComment(){
            try{

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

                const response: any = await graphql(query, {
                    repo: this.repositoryId,
                    pullRequestNum: this.pullRequestNum,
                    headers: headers
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

            } catch (error) {
                console.error('Error fetching pull request comment data:', error);
                throw error;
            }
        }

        // TO-DO Create Comment
        
        setCreatedBy(createdBy: string): boolean {
            this.createdBy = createdBy;
            return true;
        }
        setCommentId(commentId: string): boolean {
            this.commentId = commentId;
            return true;
        }
        setComment(comment: string): boolean {
            this.comment = comment;
            return true;
        }
        setCreatedAt(createdAt: Date): boolean {
            this.createdAt = createdAt;
            return true;
        }
        setUpdatedAt(updatedAt: Date): boolean {
            this.updatedAt = updatedAt;
            return true;
        }
        getRepositoryID(): string {
            return this.repositoryId;
        }
        getDiscussionNum(): number {
            return this.discussionNum;
        }
        getIssueNum(): number {
            return this.issueNum;
        }
        getPullRequestNum(): number {
            return this.pullRequestNum;
        }
        getCreatedBy(): string {
            return this.createdBy;
        }
        getCommentId(): string {
            return this.commentId;
        }
        getComment(): string {
            return this.comment;
        }
        getCreatedAt(): Date {
            return this.createdAt;
        }
        getUpdatedAt(): Date {
            return this.updatedAt;
        }
    }
}

// Example Usage:
// const repositoryId = "R_kgDOKG9dNg";
// const discussionNum = 190;
// const comment = new rainfall.Comment(repositoryId, discussionNum);
// comment.fetchDiscussionComment()
//     .then((discussionComments) => {
//         for (const discussionCommentObject of discussionComments) {
//             console.log('Comment created by: ', discussionCommentObject.getCreatedBy());
//             console.log('Comment id: ', discussionCommentObject.getCommentId());
//             console.log('Comment: ', discussionCommentObject.getComment());
//             console.log('Comment created at: ', discussionCommentObject.getCreatedAt());
//             console.log('Comment updated at:', discussionCommentObject.getUpdatedAt());
//             console.log('-----------------------------');
//         }
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });

// const issueNum = 203;
// const discussionNum = 0 ;
// const comment = new rainfall.Comment(repositoryId, discussionNum ,issueNum);
// comment.fetchIssueComment()
//     .then((issueComments) => {
//         for (const issueCommentObject of issueComments) {
//             console.log('Comment created by: ', issueCommentObject.getCreatedBy());
//             console.log('Comment id: ', issueCommentObject.getCommentId());
//             console.log('Comment: ', issueCommentObject.getComment());
//             console.log('Comment created at: ', issueCommentObject.getCreatedAt());
//             console.log('Comment updated at:', issueCommentObject.getUpdatedAt());
//             console.log('-----------------------------');
//         }
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });


// const pullRequestNum = 202;
// const discussionNum = 0 ;
// const issueNum = 0;
// const comment = new rainfall.Comment(repositoryId, discussionNum, issueNum, pullRequestNum);
// comment.fetchPullRequestComment()
//     .then((issueComments) => {
//         for (const pullRequestCommentObject of issueComments) {
//             console.log('Comment created by: ', pullRequestCommentObject.getCreatedBy());
//             console.log('Comment id: ', pullRequestCommentObject.getCommentId());
//             console.log('Comment: ', pullRequestCommentObject.getComment());
//             console.log('Comment created at: ', pullRequestCommentObject.getCreatedAt());
//             console.log('Comment updated at:', pullRequestCommentObject.getUpdatedAt());
//             console.log('-----------------------------');
//         }
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });
