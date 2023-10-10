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
    class Repository {
        constructor(userId, repositoryId) {
            if (userId)
                this.userId = userId;
            if (repositoryId)
                this.repositoryId = repositoryId;
        }
        fetchRepository() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const query = `
            query GetRepository($userId: ID!) {
                node(id: $userId) {
                  ... on User {
                    repositories(first: 100) {
                      totalCount
                      nodes {
                        id
                        name
                        visibility
                        description
                        collaborators {
                            totalCount
                            nodes {
                              login
                              id
                            }
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
                    const repositoriesData = response.node.repositories;
                    if (repositoriesData.nodes && repositoriesData.nodes.length > 0) {
                        const repositoryObjects = [];
                        for (const repositoryData of repositoriesData.nodes) {
                            const repositoryObject = new rainfall.Repository();
                            repositoryObject.totalRepository = repositoriesData.totalCount;
                            repositoryObject.repositoryId = repositoryData.id;
                            repositoryObject.repositoryName = repositoryData.name;
                            repositoryObject.repositoryVisibility = repositoryData.visibility;
                            repositoryObject.repositoryDescription = repositoryData.description;
                            repositoryObject.collaboratorsCount = repositoryData.collaborators.totalCount;
                            repositoryObject.collaboratorName = repositoryData.collaborators.nodes.login;
                            repositoryObject.collaboratorId = repositoryData.collaborators.nodes.id;
                            repositoryObject.createdAt = repositoryData.createdAt;
                            repositoryObject.updatedAt = repositoryData.updatedAt;
                            repositoryObjects.push(repositoryObject);
                        }
                        return repositoryObjects;
                    }
                }
                catch (error) {
                    console.error('Error fetching repository data:', error);
                    throw error;
                }
            });
        }
        setTotalRepository(totalRepository) {
            this.totalRepository = totalRepository;
            return true;
        }
        setRepositoryId(repositoryId) {
            this.repositoryId = repositoryId;
            return true;
        }
        setRepositoryName(repositoryName) {
            this.repositoryName = repositoryName;
            return true;
        }
        setRepositoryVisibility(repositoryVisibility) {
            this.repositoryVisibility = repositoryVisibility;
            return true;
        }
        setRepositoryDescription(repositoryDescription) {
            this.repositoryDescription = repositoryDescription;
            return true;
        }
        setCollaboratorsCount(collaboratorsCount) {
            this.collaboratorsCount = collaboratorsCount;
            return true;
        }
        setCollaboratorName(collaboratorName) {
            this.collaboratorName = collaboratorName;
            return true;
        }
        setCollaboratorId(collaboratorId) {
            this.collaboratorId = collaboratorId;
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
        getTotalRepository() {
            return this.totalRepository;
        }
        getRepositoryId() {
            return this.repositoryId;
        }
        getRepositoryName() {
            return this.repositoryName;
        }
        getRepositoryVisibility() {
            return this.repositoryVisibility;
        }
        getRepositoryDescription() {
            return this.repositoryDescription;
        }
        getCollaboratorsCount() {
            return this.collaboratorsCount;
        }
        getCollaboratorName() {
            return this.collaboratorName;
        }
        getCollaboratorId() {
            return this.collaboratorId;
        }
        getCreatedAt() {
            return this.createdAt;
        }
        getUpdatedAt() {
            return this.updatedAt;
        }
    }
    rainfall.Repository = Repository;
})(rainfall || (exports.rainfall = rainfall = {}));
const userId = "U_kgDOBXpxYQ";
const repository = new rainfall.Repository(userId);
repository.fetchRepository()
    .then((repositories) => {
    for (const repositoryObject of repositories) {
        console.log('Total Repository', repositoryObject.getTotalRepository());
        console.log('Repository Id', repositoryObject.getRepositoryId());
        console.log('Repository Name', repositoryObject.getRepositoryName());
        console.log('Repository Visibility', repositoryObject.getRepositoryVisibility());
        console.log('Repository description', repositoryObject.getRepositoryDescription());
        console.log('Total Collaborators', repositoryObject.getCollaboratorsCount());
        console.log('Collaborators Name', repositoryObject.getCollaboratorName());
        console.log('Collaborator Id', repositoryObject.getCollaboratorId());
        console.log('Created At', repositoryObject.getCreatedAt());
        console.log('Updated At', repositoryObject.getUpdatedAt());
        console.log('-----------------------------');
    }
})
    .catch((error) => {
    console.error('Error:', error);
});
