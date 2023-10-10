import { graphql } from '@octokit/graphql';
import { headers } from '../constants/index.js';
import { rainfall as rainfallNamespace } from '../interfaces/discussion';


export namespace rainfall {
    export class Discussion implements rainfallNamespace.IDiscussion {

        repositoryId: string;
        discussionNum: number;
        discussionId: string;
        title: string;
        body: string;
        createdAt: Date;
        updatedAt: Date;

        constructor(repositoryId: string, discussionNum: number) {
            this.discussionNum = discussionNum;
            this.repositoryId = repositoryId;
        }


        async fetchDataFromDiscussion() {
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

                const response: any = await graphql(query, {
                    repo: this.repositoryId,
                    discussionNum: this.discussionNum,
                    headers: headers
                });

                const discussionData = response.node.discussion;

                this.discussionId = discussionData.id;
                this.title = discussionData.title;
                this.body = discussionData.body;
                this.createdAt = new Date(discussionData.createdAt);
                this.updatedAt = new Date(discussionData.updatedAt);
            } catch (error) {
                console.error('Error fetching discussion data:', error);
                throw error;
            }
        }

        async updateDiscussion(discussionID: string, newTitle: string, newBody: string): Promise<boolean> {
            try {

                const mutation = `
                        mutation UpdateDiscussion($discussionID: ID!, $title: String!, $body: String! ) {
                            updateDiscussion(input: {discussionId: $discussionID, title: $title, body: $body}) {
                            clientMutationId
                        }
                    }
                `;

                const response: any = await graphql(mutation, {
                    discussionID: discussionID,
                    title: newTitle,
                    body: newBody,
                    headers: headers
                });

                // Check if the update was successful and return true or false accordingly
                if (response && response.updateDiscussion) {
                    this.title = newTitle;
                    this.body = newBody;
                    return true;
                } else {
                    return false;
                }
            } catch (error) {
                console.error('Error updating discussion:', error);
                throw error;
            }
        }

        async createDiscussion(categoryId: string, body: string, title: string): Promise<boolean>  {
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

                const response: any = await graphql(mutation, {
                    repositoryId: this.repositoryId,
                    categoryId: categoryId,
                    body: body,
                    title: title,
                    headers: headers
                });
                // Check if the update was successful and return true or false accordingly
                if (response && response.createDiscussion) {
                    this.title = title;
                    this.body = body;
                    return true;
                } else {
                    return false;
                }
            } catch (error) {
                console.error('Error creating discussion:', error);
                throw error;
            }
        }

        // Implement setters
        setDiscussionID(disucssionId: string): boolean {
            this.discussionId = disucssionId;
            return true;
        }

        setTitle(title: string): boolean {
            this.title = title;
            return true;
        }

        setBody(body: string): boolean {
            this.body = body;
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

        // Implement getters
        getRepositoryID(): string {
            return this.repositoryId
        }

        getdiscussionNum(): number {
            return this.discussionNum;
        }

        getDiscussionID(): string {
            return this.discussionId
        }

        getTitle(): string {
            return this.title;
        }

        getBody(): string {
            return this.body;
        }

        getCreatedAt(): Date {
            return this.createdAt;
        }

        getUpdatedAt(): Date {
            return this.updatedAt;
        }
    }
}

// //Example usage:
// const discussionNum = 197;
// const repositoryId = 'R_kgDOKG9dNg';
// const discussion = new rainfall.Discussion(repositoryId, discussionNum);

// discussion.fetchDataFromDiscussion()
//     .then(() => {
//         console.log('Repository ID', discussion.getRepositoryID());
//         console.log('Discussion ID', discussion.getDiscussionID());
//         console.log('Discussion Number', discussion.getdiscussionNum());
//         console.log('Discussion title:', discussion.getTitle());
//         console.log('Discussion body:', discussion.getBody());
//         console.log('Discussion created at:', discussion.getCreatedAt());
//         console.log('Discussion updated at:', discussion.getUpdatedAt());
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });


// discussion.updateDiscussion('D_kwDOKG9dNs4AVdfl','6th Update', 'This is done 6th time using graphql mutation')
//     .then((updated) => {
//         if (updated) {
//             console.log('Discussion updated successfully.');
//         } else {
//             console.error('Failed to update discussion.');
//         }
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });


// discussion.createDiscussion('DIC_kwDOKG9dNs4CZRiJ', 'This discussion is created using graphql',  'testing the creation')
//     .then((updated) => {
//         if (updated) {
//             console.log('Discussion created successfully.');
//         } else {
//             console.error('Failed to create discussion.');
//         }
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });