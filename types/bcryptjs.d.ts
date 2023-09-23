declare module 'bcryptjs' {
    export interface HashOptions {
      salt: string;
      rounds: number;
    }
  
    export function genSalt(rounds: number): Promise<string>;
  
    export function hash(data: string | Buffer, saltOrRounds: string | number): Promise<string>;
  
    export function compare(data: string | Buffer, encrypted: string): Promise<boolean>;
  
    export function getRounds(encrypted: string): Promise<number>;
  }
  