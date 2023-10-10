import { graphql } from '@octokit/graphql';
import { headers } from '../constants/index.js';
import { rainfall as rainfallNamespace } from '../interfaces/user';

export namespace rainfall {
    export class User implements rainfallNamespace.IUser {

        userId: string;
        loginName: string;
        userName: string;
        bio: string;
        email: string;
        avatarUrl: string;
        websiteUrl: string;
        followers: number;
        following: number;
        repositories: number;
        organizationName: string;

        constructor( userId: string){
            this.userId = userId;
        }

        async fetchUserData(){
            try{

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

                const response: any = await graphql(query, {
                    userId: this.userId,
                    headers: headers
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
        }

        // Implementing setters and getters

        setLoginName(loginName: string): boolean {
            this.loginName = loginName;
            return true;
        }
        setUserName(userName: string): boolean {
            this.userName = userName;
            return true;
        }
        setBio(bio: string): boolean {
            this.bio = bio;
            return true;
        }
        setEmail(email: string): boolean {
            this.email = email;
            return true;
        }
        setAvatarUrl(avatarUrl: string): boolean {
            this.avatarUrl = avatarUrl;
            return true;
        }
        setWebsiteUrl(websiteUrl: string): boolean {
            this.websiteUrl = websiteUrl;
            return true;
        }

        getUserId(): string {
            return this.userId;
        }
        getLoginName(): string {
            return this.loginName;
        }
        getUsername(): string {
            return this.userName
        }
        getBio(): string {
            return this.bio;
        }
        getEmail(): string {
            return this.email;
        }
        getAvatarUrl(): string {
            return this.avatarUrl;
        }
        getWebsiteUrl(): string {
            return this.websiteUrl;
        }
        getFollowers(): number {
            return this.followers;
        }
        getFollowing(): number {
            return this.following;
        }
        getRepository(): number {
            return this.repositories;
        }
        getOrganizationName(): string {
            return this.organizationName;
        }
    }
}

const userId = "U_kgDOBXpxYQ";
const user = new rainfall.User(userId);

user.fetchUserData()
    .then(() => {
        console.log("User Id:", user.getUserId());
        console.log("Login Name:", user.getLoginName());
        console.log("User Name:", user.getUsername());
        console.log("Bio: ", user.getBio());
        console.log("Email: ",user.getEmail());
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
