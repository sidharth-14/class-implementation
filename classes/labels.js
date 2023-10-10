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
    class Label {
        constructor(repositoryId) {
            if (repositoryId)
                this.repositoryId = repositoryId;
        }
        fetchRepositoryLabels() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const query = `
            query GetDiscussion($repo: ID!) {
              node(id: $repo) {
                ... on Repository {
                    labels(first:100){
                      nodes{
                        id 
                        name
                        color
                        description
                    }
                  }
                }
              }
            }
          `;
                    const response = yield (0, graphql_1.graphql)(query, {
                        repo: this.repositoryId,
                        headers: index_js_1.headers
                    });
                    const labelsData = response.node.labels.nodes;
                    if (labelsData.length > 0) {
                        const labelObjects = [];
                        for (const labelData of labelsData) {
                            const labelObject = new rainfall.Label();
                            labelObject.labelID = labelData.id;
                            labelObject.name = labelData.name;
                            labelObject.color = labelData.color;
                            labelObject.description = labelData.description;
                            labelObjects.push(labelObject);
                        }
                        return labelObjects;
                    }
                }
                catch (error) {
                    console.error('Error fetching label data:', error);
                    throw error;
                }
            });
        }
        fetchDiscussionLabels(discussionNum) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const query = `
                query GetDiscussionLabels($repo: ID!, $discussionNum: Int!) {
                  node(id: $repo) {
                    ... on Repository {
                      discussion(number: $discussionNum) {
                        labels(first:100){
                          nodes{
                            id 
                            name
                            color
                            description
                          }
                        }
                      }
                    }
                  }
                }
              `;
                    const response = yield (0, graphql_1.graphql)(query, {
                        repo: this.repositoryId,
                        discussionNum: discussionNum,
                        headers: index_js_1.headers
                    });
                    const labelsData = response.node.discussion.labels.nodes;
                    if (labelsData.length > 0) {
                        const labelObjects = [];
                        for (const labelData of labelsData) {
                            const labelObject = new rainfall.Label();
                            labelObject.labelID = labelData.id;
                            labelObject.name = labelData.name;
                            labelObject.color = labelData.color;
                            labelObject.description = labelData.description;
                            labelObjects.push(labelObject);
                        }
                        return labelObjects;
                    }
                }
                catch (error) {
                    console.error('Error fetching label data:', error);
                    throw error;
                }
            });
        }
        fetchIssueLabels(issueNum) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const query = `
                query GetIssueLabels($repo: ID!, $issueNum: Int!) {
                  node(id: $repo) {
                    ... on Repository {
                      issue(number: $issueNum) {
                        labels(first:100){
                          nodes{
                            id 
                            name
                            color
                            description
                          }
                        }
                      }
                    }
                  }
                }
              `;
                    const response = yield (0, graphql_1.graphql)(query, {
                        repo: this.repositoryId,
                        issueNum: issueNum,
                        headers: index_js_1.headers
                    });
                    const labelsData = response.node.issue.labels.nodes;
                    if (labelsData.length > 0) {
                        const labelObjects = [];
                        for (const labelData of labelsData) {
                            const labelObject = new rainfall.Label();
                            labelObject.labelID = labelData.id;
                            labelObject.name = labelData.name;
                            labelObject.color = labelData.color;
                            labelObject.description = labelData.description;
                            labelObjects.push(labelObject);
                        }
                        return labelObjects;
                    }
                }
                catch (error) {
                    console.error('Error fetching Issue label data:', error);
                    throw error;
                }
            });
        }
        fetchPullRequestLabels(pullRequestNum) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const query = `
                query GetIssueLabels($repo: ID!, $pullRequestNum: Int!) {
                  node(id: $repo) {
                    ... on Repository {
                      pullRequest(number: $pullRequestNum) {
                        labels(first:100){
                          nodes{
                            id 
                            name
                            color
                            description
                          }
                        }
                      }
                    }
                  }
                }
              `;
                    const response = yield (0, graphql_1.graphql)(query, {
                        repo: this.repositoryId,
                        pullRequestNum: pullRequestNum,
                        headers: index_js_1.headers
                    });
                    const labelsData = response.node.pullRequest.labels.nodes;
                    if (labelsData.length > 0) {
                        const labelObjects = [];
                        for (const labelData of labelsData) {
                            const labelObject = new rainfall.Label();
                            labelObject.labelID = labelData.id;
                            labelObject.name = labelData.name;
                            labelObject.color = labelData.color;
                            labelObject.description = labelData.description;
                            labelObjects.push(labelObject);
                        }
                        return labelObjects;
                    }
                }
                catch (error) {
                    console.error('Error fetching Issue label data:', error);
                    throw error;
                }
            });
        }
        setlabelID(labelID) {
            this.labelID = labelID;
            return true;
        }
        setName(name) {
            this.name = name;
            return true;
        }
        setColor(color) {
            this.color = color;
            return true;
        }
        setDescription(description) {
            this.description = description;
            return true;
        }
        getRepositoryId() {
            return this.repositoryId;
        }
        getLabelID() {
            return this.labelID;
        }
        getName() {
            return this.name;
        }
        getColor() {
            return this.color;
        }
        getDescription() {
            return this.description;
        }
    }
    rainfall.Label = Label;
})(rainfall || (exports.rainfall = rainfall = {}));
