declare module 'jsonwebtoken' {
    export function sign(
      payload: string | Buffer | object,
      secretOrPrivateKey: string | Buffer,
      options?: object
    ): string;
  
    export function verify(
      token: string,
      secretOrPublicKey: string | Buffer,
      options?: object,
      callback?: (err: Error, decoded: object) => void
    ): object | undefined;
  
    export function decode(token: string, options?: object): null | { [key: string]: any } | string;
  }
  