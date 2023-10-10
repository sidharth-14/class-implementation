export namespace rainfall {
    export interface IUser{
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

        setLoginName(loginName: string): boolean;
        setUserName(userName: string): boolean;
        setBio(bio: string): boolean;
        setEmail(email: string):boolean;
        setAvatarUrl(avatarUrl: string) :boolean;
        setWebsiteUrl(websiteUrl: string):boolean;

        getUserId(): string;
        getLoginName():string;
        getUsername(): string;
        getBio():string;
        getEmail(): string;
        getAvatarUrl():string;
        getWebsiteUrl(): string;
        getFollowers(): number;
        getFollowing(): number;
        getRepository(): number;
        getOrganizationName(): string;

    }
}