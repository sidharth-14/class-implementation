export namespace rainfall {
    export interface ILabel {
        repositoryId: string;
        labelID: string;
        name: string;
        color: string;
        description: string;

        setlabelID(labelID: string): boolean;
        setName(name: string): boolean;
        setColor(color: string): boolean;
        setDescription(description: string): boolean;
        getRepositoryId():string;
        getLabelID(): string;
        getName(): string;
        getColor(): string;
        getDescription(): string;
    }
}
