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
    class Project {
        constructor(userId) {
            if (userId)
                this.userId = userId;
        }
        fetchProjectData() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const query = `
                query GetProjectData($userId: ID!){
                    node(id: $userId){
                      ... on User{
                        projectsV2(first: 100){
                          nodes{
                            id
                            title
                            shortDescription
                            creator{
                              login
                            }
                            createdAt
                            updatedAt
                          }
                        }
                      }
                    }
                  }
                `;
                    const response = yield (0, graphql_1.graphql)(query, {
                        userId: this.userId,
                        headers: index_js_1.headers
                    });
                    const projectsData = response.node.projectsV2.nodes;
                    if (projectsData && projectsData.length > 0) {
                        const projectsObjects = [];
                        for (const projectData of projectsData) {
                            const projectObject = new rainfall.Project();
                            projectObject.projectId = projectData.id;
                            projectObject.projectTitle = projectData.title;
                            projectObject.projectDescription = projectData.shortDescription;
                            projectObject.createdBy = projectData.creator.login;
                            projectObject.createdAt = projectData.createdAt;
                            projectObject.updatedAt = projectData.updatedAt;
                            projectsObjects.push(projectObject);
                        }
                        return projectsObjects;
                    }
                }
                catch (error) {
                    console.error('Error fetching Project data:', error);
                    throw error;
                }
            });
        }
        createProject(newTitle) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const mutation = `
                mutation CreateProject($ownerId: ID!, $title: String!){
                    createProjectV2(input: {
                      ownerId: $ownerId,
                      title: $title
                    }) {
                      projectV2 {
                        id
                      }
                    }
                  }
                `;
                    const response = yield (0, graphql_1.graphql)(mutation, {
                        ownerId: this.userId,
                        title: newTitle,
                        headers: index_js_1.headers
                    });
                    console.log(response);
                    if (response && response.createProjectV2 && response.createProjectV2.projectV2) {
                        this.projectTitle = newTitle;
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                catch (error) {
                    console.error('Error Creating Project', error);
                    throw error;
                }
            });
        }
        setProjectTitle(projectTitle) {
            this.projectTitle = projectTitle;
            return true;
        }
        setProjectDescription(projectDescription) {
            this.projectDescription = projectDescription;
            return true;
        }
        setCreatedBy(createdBy) {
            this.createdBy = createdBy;
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
        getUserId() {
            return this.userId;
        }
        getProjectId() {
            return this.projectId;
        }
        getProjectTitle() {
            return this.projectTitle;
        }
        getProjectDiscription() {
            return this.projectDescription;
        }
        getCreatedBy() {
            return this.createdBy;
        }
        getCreatedAt() {
            return this.createdAt;
        }
        getUpdatedAt() {
            return this.updatedAt;
        }
    }
    rainfall.Project = Project;
})(rainfall || (exports.rainfall = rainfall = {}));
