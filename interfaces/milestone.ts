export namespace rainfall {
    export interface IMilestone {

        milestoneId: string;
        name: string;
        description: string;
        dueDate: Date;
        state: string;
        creator: string;
        createdAt: Date;
        updatedAt: Date;
        closedAt:Date;

        setName(name: string): boolean;
        setDescription(description: string): boolean;
        setDueDate(dueDate: Date): boolean;
        setState(state: string):boolean;
        setCreator(creator: string):boolean;
        setCreatedAt(createdAt: Date): boolean;
        setUpdatedAt(updatedAt: Date):boolean;
        setClosedAt(closedAt: Date):boolean;
        getMilestoneId(): string;
        getName(): string;
        getDescription(): string;
        getDueDate(): Date;
        getState():string;
        getCreator():string;
        getCreatedAt():Date;
        getUpdatedAt():Date;
        getClosedAt():Date;

    }
}