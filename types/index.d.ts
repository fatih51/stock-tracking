export {};

declare global {
    namespace Express {
      interface Request {
        user: {
          id: number;
          name: string;
          email: string;
          password: string;
        }
      }
    }
  }