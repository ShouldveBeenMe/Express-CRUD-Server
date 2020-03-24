export class OperationError extends Error {
    constructor(public message: string, public status: number, public name: string) { super(); }
}

export class InvalidInputError extends OperationError {
    constructor(message = `Input is invalid`) {
        super(message, 400, 'InvalidInputError');
    }
}

export class InvalidRequest extends OperationError {
    constructor(message = `The request isn't supported`) {
        super(message, 400, 'InvalidRequest');
    }
}

export class DataBaseError extends OperationError {
    constructor(message = `Database couldn't finish`) {
        super(message, 400, 'DataBaseError');
    }
}

export class DuplicateFieldError extends OperationError {
    constructor(message = `Mongo Error`) {
        super(message, 400, 'DuplicateFieldError');
    }
}
