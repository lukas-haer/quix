export class UsernameTakenError extends Error {
  constructor() {
    super("Username is taken");
    this.name = "UsernameTakenError";
  }
}

export class WeakPasswordError extends Error {
  constructor() {
    super("Password needs to be at least 8 characters long and contain a number and a special character");
    this.name = "WeakPasswordError";
  }
}

export class UserNotFoundError extends Error {
  constructor() {
    super("No user with this name exists");
    this.name = "UserNotFoundError";
  }
}

export class InvalidPasswordOrUsernameError extends Error {
    constructor() {
    super("Invalid Password or Username.");
    this.name = "InvalidPasswordOrUsernameError";
  }
}

export class InvalidPasswordError extends Error {
  constructor() {
    super("Wrong password for this user name");
    this.name = "InvalidPasswordError";
  }
}

export class InvalidPasswordRepeatError extends Error {
  constructor() {
    super("Passwords don't match");
    this.name = "InvalidPasswordRepeatError";
  }
}