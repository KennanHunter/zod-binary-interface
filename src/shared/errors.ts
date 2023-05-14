export class DecodingError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "DecodingError";
  }
}

export class InternalError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "InternalError";
  }
}
