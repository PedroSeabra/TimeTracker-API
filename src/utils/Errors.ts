export class Exception extends Error {
  private httpStatus: number = 500;
  private httpMessage: string = '';
  constructor(message: string, status: number) {
    super(message);
    this.httpMessage = message;
    this.httpStatus = status;
  }

  get status() {
    return this.httpStatus;
  }

  get message() {
    return this.httpMessage;
  }
}

export class NotFoundException extends Exception {
  constructor(recurso: string) {
    super(`${recurso} não encontrado`, 404);
  }
}

export class InvalidTokenException extends Exception {
  constructor() {
    super(`Token inválido`, 401);
  }
}

export class ExpiredTokenException extends Exception {
  constructor() {
    super(`Token expirado`, 401);
  }
}

export class CreateException extends Exception {
  constructor(recurso: string) {
    super(`${recurso} já foi cadastrado`, 400);
  }
}

export class DatabaseException extends Exception {
  constructor() {
    super(`Erro no banco de dados`, 503);
  }
}

export class InvalidParametersException extends Exception {
  constructor() {
    super(`Parâmetros inválidos`, 400);
  }
}

export class EmailServiceException extends Exception {
  constructor() {
    super(`Token expirado`, 503);
  }
}
