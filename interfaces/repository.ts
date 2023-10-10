export namespace rainfall {
    export interface IRepository {
        userId: string;
        totalRepository:number;
        repositoryId:string;
        repositoryName: string;
        repositoryVisibility: string;
        repositoryDescription:string;
        collaboratorsCount: number;
        collaboratorName: string;
        collaboratorId:string;
        createdAt: Date;
        updatedAt: Date;

        setTotalRepository(totalRepository: number):boolean;
        setRepositoryId(repositoryId:string):boolean;
        setRepositoryName(repositoryName:string):boolean;
        setRepositoryVisibility(repositoryVisibility:string):boolean;
        setRepositoryDescription(repositoryDescription:string):boolean;
        setCollaboratorsCount(collaboratorsCount:number):boolean;
        setCollaboratorName(collaboratorName:string):boolean;
        setCollaboratorId(collaboratorId:string):boolean;
        setCreatedAt(createdAt: Date):boolean;
        setUpdatedAt(updatedAt: Date):boolean;

        getUserId():string;
        getTotalRepository():number;
        getRepositoryId():string;
        getRepositoryName():string;
        getRepositoryVisibility():string;
        getRepositoryDescription():string;
        getCollaboratorsCount():number;
        getCollaboratorName():string;
        getCollaboratorId():string;
        getCreatedAt():Date;
        getUpdatedAt():Date;

    }
}