class AuthError extends Error {
  type: string;

  constructor(message: string, type: string) {
    super(message);
    this.name = 'AuthError';
    this.type = type;
  }
}
