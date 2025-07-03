export class UsernameTakenError extends Error {
  constructor() {
    super("Username is taken");
    this.name = "UsernameTakenError";
  }
}

export class WeakPasswordError extends Error {
  constructor() {
    super("Password needs to be at least characters long and contain a number and a special character");
    this.name = "WeakPasswordError";
  }
}