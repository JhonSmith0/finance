declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly BCRYPT_SALT: number;
      //
      readonly CLIENT_HOST: string;
      readonly CLIENT_PORT: string;
      //
      readonly JWT_EXPIRATION_TIME: string;
      readonly JWT_SECRET_KEY: string;
    }
  }

  export type Matching<T, V> = {
    [K in keyof T as T[K] extends V ? K : never]: T[K];
  };

  export type ClassMethods<T> = Matching<T, Function>;
  export type ClassProperties<T> = Omit<T, keyof ClassMethods<T>>;

  export type OptionalProps<T, K extends keyof T> = Omit<T, K> &
    Partial<Pick<T, K>>;
}

export {};
