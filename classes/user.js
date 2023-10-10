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
    class User {
        constructor(userId) {
            this.userId = userId;
        }
        fetchUserData() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const query = `
                query GetUserData($userId: ID!){
                    node(id: $userId) {
                      ... on User {
                        login
                        name
                        bio
                        email
                        avatarUrl
                        location
                        websiteUrl
                        followers {
                          totalCount
                        }
                        following {
                          totalCount
                        }
                        repositories(first: 100) {
                          totalCount
                        }
                        organizations(first: 100) {
                          nodes {
                            login
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
                    const usersData = response.node;
                    this.loginName = usersData.login;
                    this.userName = usersData.name;
                    this.bio = usersData.bio;
                    this.email = usersData.email;
                    this.avatarUrl = usersData.avatarUrl;
                    this.websiteUrl = usersData.websiteUrl;
                    this.followers = usersData.followers.totalCount;
                    this.following = usersData.following.totalCount;
                    this.repositories = usersData.repositories.totalCount;
                    this.organizationName = usersData.organizations.nodes.login;
                }
                catch (error) {
                    console.error('Error fetching user data:', error);
                    throw error;
                }
            });
        }
        setLoginName(loginName) {
            this.loginName = loginName;
            return true;
        }
        setUserName(userName) {
            this.userName = userName;
            return true;
        }
        setBio(bio) {
            this.bio = bio;
            return true;
        }
        setEmail(email) {
            this.email = email;
            return true;
        }
        setAvatarUrl(avatarUrl) {
            this.avatarUrl = avatarUrl;
            return true;
        }
        setWebsiteUrl(websiteUrl) {
            this.websiteUrl = websiteUrl;
            return true;
        }
        getUserId() {
            return this.userId;
        }
        getLoginName() {
            return this.loginName;
        }
        getUsername() {
            return this.userName;
        }
        getBio() {
            return this.bio;
        }
        getEmail() {
            return this.email;
        }
        getAvatarUrl() {
            return this.avatarUrl;
        }
        getWebsiteUrl() {
            return this.websiteUrl;
        }
        getFollowers() {
            return this.followers;
        }
        getFollowing() {
            return this.following;
        }
        getRepository() {
            return this.repositories;
        }
        getOrganizationName() {
            return this.organizationName;
        }
    }
    rainfall.User = User;
})(rainfall || (exports.rainfall = rainfall = {}));
const userId = "U_kgDOBXpxYQ";
const user = new rainfall.User(userId);
user.fetchUserData()
    .then(() => {
    console.log("User Id:", user.getUserId());
    console.log("Login Name:", user.getLoginName());
    console.log("User Name:", user.getUsername());
    console.log("Bio: ", user.getBio());
    console.log("Email: ", user.getEmail());
    console.log("Avatar Url: ", user.getAvatarUrl());
    console.log("Website Url: ", user.getWebsiteUrl());
    console.log("Followers count: ", user.getFollowers());
    console.log("Following  Count: ", user.getFollowing());
    console.log("Number of repository: ", user.getRepository());
    console.log("Oragnization Name: ", user.getOrganizationName());
})
    .catch((error) => {
    console.error('Error:', error);
});
