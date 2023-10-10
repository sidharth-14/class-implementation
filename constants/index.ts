const owner: string = 'sidharth-14';
const repo: string = 'actions-test';
const token: string = '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';

// const owner = 'rainfall-one'; //Add your repo owner here
// const repo = 'gitops-test'; //Add your repo name here
// const token = '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'; //Add your github token

const headers = {
    Authorization: `token ${token}`,
};

export { owner, repo, headers }