export class AccountAlreadyExistsError extends Error {
    constructor(accountId: string) {
        super(`Account with id ${accountId} already exists`);
    }
}
