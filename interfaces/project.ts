export namespace rainfall {
    export interface IProject{

        userId: string;
        projectId: string;
        projectTitle: string;
        projectDescription: string;
        createdBy:string;
        createdAt: Date;
        updatedAt: Date;

        setProjectTitle(projectTitle: string): boolean;
        setProjectDescription(projectDescription: string): boolean;
        setCreatedBy(createdBy: string): boolean;
        setCreatedAt(createdAt: Date): boolean;
        setUpdatedAt(updatedAt: Date): boolean;

        getUserId(): string;
        getProjectId(): string;
        getProjectTitle(): string;
        getProjectDiscription(): string;
        getCreatedBy(): string;
        getCreatedAt(): Date;
        getUpdatedAt(): Date;

    }
}
