import { graphql } from '@octokit/graphql';
import { headers } from '../constants/index.js';
import { rainfall as rainfallNamespace } from '../interfaces/project';

export namespace rainfall {
    export class Project implements rainfallNamespace.IProject {

        userId: string;
        projectId: string;
        projectTitle: string;
        projectDescription: string;
        createdBy: string;
        createdAt: Date;
        updatedAt: Date;

        constructor(userId?: string) {
            if (userId)
                this.userId = userId;
        }

        // Retrieve Projects
        async fetchProjectData() {
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

                const response: any = await graphql(query, {
                    userId: this.userId,
                    headers: headers
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


            } catch (error) {
                console.error('Error fetching Project data:', error);
                throw error;
            }
        }

        // Create Project 
        async createProject(newTitle: string) {
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
                const response: any = await graphql(mutation, {
                    ownerId: this.userId,
                    title: newTitle,
                    headers: headers
                });

                console.log(response);
                if (response && response.createProjectV2 && response.createProjectV2.projectV2) {
                    this.projectTitle = newTitle;
                    return true;
                } else {
                    return false;
                }
            } catch (error) {
                console.error('Error Creating Project', error);
                throw error;
            }
        }

        // TO-DO: Update the Project 

        // Implementing setters and getters

        setProjectTitle(projectTitle: string): boolean {
            this.projectTitle = projectTitle;
            return true;
        }
        setProjectDescription(projectDescription: string): boolean {
            this.projectDescription = projectDescription;
            return true;
        }
        setCreatedBy(createdBy: string): boolean {
            this.createdBy = createdBy;
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
        getProjectId(): string {
            return this.projectId;
        }
        getProjectTitle(): string {
            return this.projectTitle;
        }
        getProjectDiscription(): string {
            return this.projectDescription;
        }
        getCreatedBy(): string {
            return this.createdBy
        }
        getCreatedAt(): Date {
            return this.createdAt;
        }
        getUpdatedAt(): Date {
            return this.updatedAt;
        }
    }
}
// const userId = "U_kgDOBXpxYQ";
// const project = new rainfall.Project(userId);

// project.fetchProjectData()
//     .then((projects) => {
//         for (const projectObject of projects) {
//             console.log("Project Id:", projectObject.getProjectId());
//             console.log("Project Title: ", projectObject.getProjectTitle());
//             console.log("Project description: ", projectObject.getProjectDiscription());
//             console.log("Created By: ", projectObject.getCreatedBy());
//             console.log("Created at: ", projectObject.getCreatedAt());
//             console.log("Updated at: ", projectObject.getUpdatedAt());
//             console.log("----------------------------------");
//         }
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });

// const userId = "U_kgDOBXpxYQ";
// const project = new rainfall.Project(userId);
// project.createProject('Testing Project Created By Graphql')
//     .then((updated) => {
//         if (updated) {
//             console.log('Project Created successfully.');
//         } else {
//             console.error('Failed to create project.');
//         }
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });    
