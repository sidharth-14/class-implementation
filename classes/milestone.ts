import { graphql } from '@octokit/graphql';
import { rainfall as rainfallNamespace } from "../interfaces/milestone";
import { owner, repo, headers } from "../constants/index.js";

export namespace rainfall {
    export class Milestone implements rainfallNamespace.IMilestone {
        milestoneId: string;
        name: string;
        description: string;
        dueDate: Date;
        state: string;
        creator: string;
        createdAt: Date;
        updatedAt: Date;
        closedAt: Date;

        async fetchMilestones() {
            try {
                const query = `
          query GetMilestones($owner: String!, $repo: String!) {
            repository(owner: $owner, name: $repo) {
              milestones(first: 100) {
                edges {
                  node {
                    id
                    title
                    description
                    dueOn
                    state
                    creator {
                        login
                    }
                    createdAt
                    updatedAt
                    closedAt
                  }
                }
              }
            }
          }
        `;

                const response: any = await graphql(query, {
                    owner,
                    repo,
                    headers: headers,
                });

                // Check for network errors in the response
                if (response.errors) {
                    console.error('GraphQL query errors:', response.errors);
                    throw new Error('GraphQL query errors occurred.');
                }

                const milestoneData = response.repository.milestones.edges;
                if (milestoneData.length > 0) {
                    // Create an array to store milestone objects
                    const milestoneObjects = [];

                    // Iterate through all milestones and create milestone objects
                    for (const milestoneEdge of milestoneData) {
                        const milestoneNode = milestoneEdge.node;
                        const milestoneObject = new Milestone();

                        milestoneObject.milestoneId = milestoneNode.id;
                        milestoneObject.name = milestoneNode.title;
                        milestoneObject.description = milestoneNode.description;
                        milestoneObject.dueDate = new Date(milestoneNode.dueOn);
                        milestoneObject.state = milestoneNode.state;
                        milestoneObject.creator = milestoneNode.creator.login;
                        milestoneObject.createdAt = new Date(milestoneNode.createdAt);
                        milestoneObject.updatedAt = new Date(milestoneNode.updatedAt);
                        milestoneObject.closedAt = new Date(milestone.closedAt);

                        milestoneObjects.push(milestoneObject);
                    }

                    // Return the array of milestone objects
                    return milestoneObjects;
                } else {
                    console.warn('No milestones found.');
                    return [];
                }
            } catch (error) {
                console.error('Error fetching milestone data:', error);
                throw error;
            }
        }

        // TO-DO Create Milestone

        setName(name: string): boolean {
            this.name = name;
            return true;
        }

        setDescription(description: string): boolean {
            this.description = description;
            return true;
        }

        setDueDate(dueDate: Date): boolean {
            this.dueDate = dueDate;
            return true;
        }
        setState(state: string): boolean {
            this.state = state;
            return true;
        }

        setCreator(creator: string): boolean {
            this.creator = creator;
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
        setClosedAt(closedAt: Date): boolean {
            this.closedAt = closedAt;
            return true;
        }
        getMilestoneId(): string {
            return this.milestoneId;
        }
        getName(): string {
            return this.name;
        }
        getDescription(): string {
            return this.description;
        }
        getDueDate(): Date {
            return this.dueDate;
        }
        getState(): string {
            return this.state;
        }
        getCreator(): string {
            return this.creator;
        }
        getCreatedAt(): Date {
            return this.createdAt;
        }
        getUpdatedAt(): Date {
            return this.updatedAt;
        }
        getClosedAt(): Date {
            return this.closedAt;
        }
    }
}

// Example Usage:

const milestone = new rainfall.Milestone();

milestone.fetchMilestones()
    .then((milestones) => {
        if (milestones.length > 0) {
            for (const milestoneObject of milestones) {
                console.log('Milestone ID', milestoneObject.getMilestoneId());
                console.log('Milestone Name', milestoneObject.getName());
                console.log('Milestone Description', milestoneObject.getDescription());
                console.log('Milestone Due Date', milestoneObject.getDueDate());
                console.log('Milestone State', milestoneObject.getState());
                console.log('Milestone Creator', milestoneObject.getCreator());
                console.log('Milestone Created At', milestoneObject.getCreatedAt());
                console.log('Milestone Updated At', milestoneObject.getUpdatedAt());
                console.log('Milestone Closed At', milestoneObject.getClosedAt());
                console.log('-----------------------------');
            }
        } else {
            console.log('No milestones to display.');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });

