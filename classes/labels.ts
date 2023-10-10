import { graphql } from '@octokit/graphql';
import { rainfall as rainfallNamespace } from "../interfaces/label";
import { owner, repo, headers } from "../constants/index.js";

export namespace rainfall {
  export class Label implements rainfallNamespace.ILabel {

    repositoryId: string;
    labelID: string;
    name: string;
    color: string;
    description: string;

    constructor(repositoryId?: string) {
      if (repositoryId)
        this.repositoryId = repositoryId;
    }

    async fetchRepositoryLabels() {
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

        const response: any = await graphql(query, {
          repo: this.repositoryId,
          headers: headers
        });

        const labelsData = response.node.labels.nodes;
        if (labelsData.length > 0) {
          // Create an array to store label objects
          const labelObjects = [];

          // Iterate through all labels and create label objects
          for (const labelData of labelsData) {
            const labelObject = new rainfall.Label();
            labelObject.labelID = labelData.id;
            labelObject.name = labelData.name;
            labelObject.color = labelData.color;
            labelObject.description = labelData.description;

            labelObjects.push(labelObject);
          }

          // Return the array of label objects
          return labelObjects;
        }
      } catch (error) {
        console.error('Error fetching label data:', error);
        throw error;
      }
    }

    async fetchDiscussionLabels(discussionNum: number) {
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

        const response: any = await graphql(query, {
          repo: this.repositoryId,
          discussionNum: discussionNum,
          headers: headers
        });

        const labelsData = response.node.discussion.labels.nodes;
        if (labelsData.length > 0) {
          // Create an array to store label objects
          const labelObjects = [];

          // Iterate through all labels and create label objects
          for (const labelData of labelsData) {
            const labelObject = new rainfall.Label();
            labelObject.labelID = labelData.id;
            labelObject.name = labelData.name;
            labelObject.color = labelData.color;
            labelObject.description = labelData.description;

            labelObjects.push(labelObject);
          }

          // Return the array of label objects
          return labelObjects;
        }
      } catch (error) {
        console.error('Error fetching label data:', error);
        throw error;
      }
    }

    async fetchIssueLabels(issueNum: number) {
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

        const response: any = await graphql(query, {
          repo: this.repositoryId,
          issueNum: issueNum,
          headers: headers
        });

        const labelsData = response.node.issue.labels.nodes;
        if (labelsData.length > 0) {
          // Create an array to store label objects
          const labelObjects = [];

          // Iterate through all labels and create label objects
          for (const labelData of labelsData) {
            const labelObject = new rainfall.Label();
            labelObject.labelID = labelData.id;
            labelObject.name = labelData.name;
            labelObject.color = labelData.color;
            labelObject.description = labelData.description;

            labelObjects.push(labelObject);
          }

          // Return the array of label objects
          return labelObjects;
        }
      } catch (error) {
        console.error('Error fetching Issue label data:', error);
        throw error;
      }
    }


    async fetchPullRequestLabels(pullRequestNum: number) {
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

        const response: any = await graphql(query, {
          repo: this.repositoryId,
          pullRequestNum: pullRequestNum,
          headers: headers
        });

        const labelsData = response.node.pullRequest.labels.nodes;
        if (labelsData.length > 0) {
          // Create an array to store label objects
          const labelObjects = [];

          // Iterate through all labels and create label objects
          for (const labelData of labelsData) {
            const labelObject = new rainfall.Label();
            labelObject.labelID = labelData.id;
            labelObject.name = labelData.name;
            labelObject.color = labelData.color;
            labelObject.description = labelData.description;

            labelObjects.push(labelObject);
          }

          // Return the array of label objects
          return labelObjects;
        }
      } catch (error) {
        console.error('Error fetching Issue label data:', error);
        throw error;
      }
    }


    // Todo Create and update labels function


    // Implement setters and getters
    setlabelID(labelID: string): boolean {
      this.labelID = labelID;
      return true;
    }
    setName(name: string): boolean {
      this.name = name;
      return true;
    }

    setColor(color: string): boolean {
      this.color = color;
      return true;
    }

    setDescription(description: string): boolean {
      this.description = description;
      return true;
    }

    // Implement getters
    getRepositoryId(): string {
        return this.repositoryId;
    }
    getLabelID(): string {
      return this.labelID;
    }

    getName(): string {
      return this.name;
    }

    getColor(): string {
      return this.color;
    }

    getDescription(): string {
      return this.description;
    }
  }
}

// Example Usage:
// const repositoryId = "R_kgDOKG9dNg";
// const discussionNum = 190;
// const issueNum = 203;
// const pullrequestNum =202;
// const label = new rainfall.Label(repositoryId);
// label.fetchRepositoryLabels()
//   .then((labels) => {
//     for (const labelObject of labels) {
//       console.log('Label ID', labelObject.getLabelID());
//       console.log('Label Name', labelObject.getName());
//       console.log('Label Color', labelObject.getColor());
//       console.log('Label Description', labelObject.getDescription());
//       console.log('-----------------------------');
//     }
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });

// label.fetchDiscussionLabels(discussionNum)
//   .then((labels) => {
//     for (const labelObject of labels) {
//       console.log('Label ID', labelObject.getLabelID());
//       console.log('Label Name', labelObject.getName());
//       console.log('Label Color', labelObject.getColor());
//       console.log('Label Description', labelObject.getDescription());
//       console.log('-----------------------------');
//     }
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });

  // label.fetchIssueLabels(issueNum)
  // .then((labels) => {
  //   for (const labelObject of labels) {
  //     console.log('Label ID', labelObject.getLabelID());
  //     console.log('Label Name', labelObject.getName());
  //     console.log('Label Color', labelObject.getColor());
  //     console.log('Label Description', labelObject.getDescription());
  //     console.log('-----------------------------');
  //   }
  // })
  // .catch((error) => {
  //   console.error('Error:', error);
  // });

  // label.fetchPullRequestLabels(pullrequestNum)
  // .then((labels) => {
  //   for (const labelObject of labels) {
  //     console.log('Label ID', labelObject.getLabelID());
  //     console.log('Label Name', labelObject.getName());
  //     console.log('Label Color', labelObject.getColor());
  //     console.log('Label Description', labelObject.getDescription());
  //     console.log('-----------------------------');
  //   }
  // })
  // .catch((error) => {
  //   console.error('Error:', error);
  // });