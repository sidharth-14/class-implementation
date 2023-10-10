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
    class Discussion {
        constructor(repositoryId, discussionNum) {
            this.discussionNum = discussionNum;
            this.repositoryId = repositoryId;
        }
        fetchDataFromDiscussion() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const query = `
                query GetDiscussion($repo: ID!, $discussionNum: Int!) {
                    node(id: $repo){
                        ... on Repository{
                            discussion(number: $discussionNum) {
                                id
                                title
                                body
                                createdAt
                                updatedAt
                                category {
                                    id
                                    name
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
                    const discussionData = response.node.discussion;
                    this.discussionId = discussionData.id;
                    this.title = discussionData.title;
                    this.body = discussionData.body;
                    this.createdAt = new Date(discussionData.createdAt);
                    this.updatedAt = new Date(discussionData.updatedAt);
                }
                catch (error) {
                    console.error('Error fetching discussion data:', error);
                    throw error;
                }
            });
        }
        updateDiscussion(discussionID, newTitle, newBody) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const mutation = `
                        mutation UpdateDiscussion($discussionID: ID!, $title: String!, $body: String! ) {
                            updateDiscussion(input: {discussionId: $discussionID, title: $title, body: $body}) {
                            clientMutationId
                        }
                    }
                `;
                    const response = yield (0, graphql_1.graphql)(mutation, {
                        discussionID: discussionID,
                        title: newTitle,
                        body: newBody,
                        headers: index_js_1.headers
                    });
                    if (response && response.updateDiscussion) {
                        this.title = newTitle;
                        this.body = newBody;
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                catch (error) {
                    console.error('Error updating discussion:', error);
                    throw error;
                }
            });
        }
        createDiscussion(categoryId, body, title) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const mutation = `
                mutation CreateDisussion($repositoryId: ID!, $categoryId: ID!, $body: String!, $title: String!) {
                    createDiscussion(
                      input: {repositoryId: $repositoryId, categoryId: $categoryId, body: $body, title: $title}
                    ) {
                      discussion {
                        title
                        url
                      }
                    }
                  }
                `;
                    const response = yield (0, graphql_1.graphql)(mutation, {
                        repositoryId: this.repositoryId,
                        categoryId: categoryId,
                        body: body,
                        title: title,
                        headers: index_js_1.headers
                    });
                    if (response && response.createDiscussion) {
                        this.title = title;
                        this.body = body;
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                catch (error) {
                    console.error('Error creating discussion:', error);
                    throw error;
                }
            });
        }
        setDiscussionID(disucssionId) {
            this.discussionId = disucssionId;
            return true;
        }
        setTitle(title) {
            this.title = title;
            return true;
        }
        setBody(body) {
            this.body = body;
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
        getdiscussionNum() {
            return this.discussionNum;
        }
        getDiscussionID() {
            return this.discussionId;
        }
        getTitle() {
            return this.title;
        }
        getBody() {
            return this.body;
        }
        getCreatedAt() {
            return this.createdAt;
        }
        getUpdatedAt() {
            return this.updatedAt;
        }
    }
    rainfall.Discussion = Discussion;
})(rainfall || (exports.rainfall = rainfall = {}));
