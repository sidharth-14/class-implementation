export namespace rainfall {
    export interface IDiscussion {
        repositoryId:string;
        discussionNum: number;
        discussionId:string;
        title: string;
        body: string;
        createdAt: Date;
        updatedAt: Date;

        setDiscussionID(disucssionId:string):boolean;
        setTitle(title: string): boolean;
        setBody(body: string): boolean;
        setCreatedAt(createdAt: Date): boolean;
        setUpdatedAt(updatedAt: Date): boolean;

        getRepositoryID():string;
        getdiscussionNum(): number;
        getDiscussionID():string;
        getTitle(): string;
        getBody(): string;
        getCreatedAt(): Date;
        getUpdatedAt(): Date;
    }
}