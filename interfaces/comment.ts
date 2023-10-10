export namespace rainfall {
    export interface IComment {
        repositoryId: string;
        discussionNum: number;
        issueNum:  number;
        pullRequestNum: number;
        createdBy: string;
        commentId: string;
        comment: string;
        createdAt: Date;
        updatedAt: Date;

        setCreatedBy(createdBy: string): boolean;
        setCommentId(commentId: string): boolean;
        setComment(comment: string): boolean;
        setCreatedAt(createdAt: Date): boolean;
        setUpdatedAt(updatedAt: Date): boolean;

        getRepositoryID(): string;
        getDiscussionNum(): number;
        getIssueNum(): number;
        getPullRequestNum(): number;
        getCreatedBy(): string;
        getCommentId(): string;
        getComment(): string;
        getCreatedAt(): Date;
        getUpdatedAt(): Date;

    }
}