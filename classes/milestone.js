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
    class Milestone {
        fetchMilestones() {
            return __awaiter(this, void 0, void 0, function* () {
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
                    const response = yield (0, graphql_1.graphql)(query, {
                        owner: index_js_1.owner,
                        repo: index_js_1.repo,
                        headers: index_js_1.headers,
                    });
                    if (response.errors) {
                        console.error('GraphQL query errors:', response.errors);
                        throw new Error('GraphQL query errors occurred.');
                    }
                    const milestoneData = response.repository.milestones.edges;
                    if (milestoneData.length > 0) {
                        const milestoneObjects = [];
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
                        return milestoneObjects;
                    }
                    else {
                        console.warn('No milestones found.');
                        return [];
                    }
                }
                catch (error) {
                    console.error('Error fetching milestone data:', error);
                    throw error;
                }
            });
        }
        setName(name) {
            this.name = name;
            return true;
        }
        setDescription(description) {
            this.description = description;
            return true;
        }
        setDueDate(dueDate) {
            this.dueDate = dueDate;
            return true;
        }
        setState(state) {
            this.state = state;
            return true;
        }
        setCreator(creator) {
            this.creator = creator;
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
        setClosedAt(closedAt) {
            this.closedAt = closedAt;
            return true;
        }
        getMilestoneId() {
            return this.milestoneId;
        }
        getName() {
            return this.name;
        }
        getDescription() {
            return this.description;
        }
        getDueDate() {
            return this.dueDate;
        }
        getState() {
            return this.state;
        }
        getCreator() {
            return this.creator;
        }
        getCreatedAt() {
            return this.createdAt;
        }
        getUpdatedAt() {
            return this.updatedAt;
        }
        getClosedAt() {
            return this.closedAt;
        }
    }
    rainfall.Milestone = Milestone;
})(rainfall || (exports.rainfall = rainfall = {}));
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
    }
    else {
        console.log('No milestones to display.');
    }
})
    .catch((error) => {
    console.error('Error:', error);
});
