class DecodingError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "DecodingError";
  }
}

class InternalError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "InternalError";
  }
}
