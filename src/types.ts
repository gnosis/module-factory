export interface KnownContracts {
  dao: string;
  amb: string;
  delay: string;
  factory: string;
}

export type ContractAddresses = Record<keyof KnownContracts, string>;

export type KnownModules = Omit<KnownContracts, "factory" | "oracle">;
