import { graphql } from '@octokit/graphql';
import { headers } from '../constants/index.js';
import { rainfall as rainfallNamespace } from '../interfaces/repository';

export namespace rainfall {
    export class Repository implements rainfallNamespace.IRepository {

        userId: string;
        totalRepository: number;
        repositoryId: string;
        repositoryName: string;
        repositoryVisibility: string;
        repositoryDescription: string;
        collaboratorsCount: number;
        collaboratorName: string;
        collaboratorId: string;
        createdAt: Date;
        updatedAt: Date;

        constructor(userId?: string, repositoryId?: string) {
            if (userId)
                this.userId = userId;

            if (repositoryId)
                this.repositoryId = repositoryId;
        }


        async fetchRepository() {
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

                const response: any = await graphql(query, {
                    userId: this.userId,
                    headers: headers
                });

                const repositoriesData = response.node.repositories;
                if (repositoriesData.nodes && repositoriesData.nodes.length > 0) {
                    // Create an array to store repository objects
                    const repositoryObjects = [];

                    // Iterate through all repositories and create repository objects
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
            } catch (error) {
                console.error('Error fetching repository data:', error);
                throw error;
            }
        }

        // Implement setters and getters

        setTotalRepository(totalRepository: number): boolean {
            this.totalRepository = totalRepository;
            return true;
        }

        setRepositoryId(repositoryId: string): boolean {
            this.repositoryId = repositoryId;
            return true;
        }
        setRepositoryName(repositoryName: string): boolean {
            this.repositoryName = repositoryName;
            return true;
        }
        setRepositoryVisibility(repositoryVisibility: string): boolean {
            this.repositoryVisibility = repositoryVisibility;
            return true;
        }
        setRepositoryDescription(repositoryDescription: string): boolean {
            this.repositoryDescription = repositoryDescription;
            return true;
        }
        setCollaboratorsCount(collaboratorsCount: number): boolean {
            this.collaboratorsCount = collaboratorsCount;
            return true;
        }
        setCollaboratorName(collaboratorName: string): boolean {
            this.collaboratorName = collaboratorName;
            return true;
        }
        setCollaboratorId(collaboratorId: string): boolean {
            this.collaboratorId = collaboratorId;
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

        getUserId(): string {
            return this.userId;

        }
        getTotalRepository(): number {
            return this.totalRepository;
        }
        getRepositoryId(): string {
            return this.repositoryId;
        }
        getRepositoryName(): string {
            return this.repositoryName;
        }
        getRepositoryVisibility(): string {
            return this.repositoryVisibility;
        }
        getRepositoryDescription(): string {
            return this.repositoryDescription;
        }
        getCollaboratorsCount(): number {
            return this.collaboratorsCount;
        }
        getCollaboratorName(): string {
            return this.collaboratorName;
        }
        getCollaboratorId(): string {
            return this.collaboratorId;
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
