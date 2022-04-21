import "reflect-metadata";

import {
  Dependencies,
  dependenciesContainer,
} from "./configuration/dependencies.container";

declare type Nullable<T> = T | null;

export class DependenciesContainerSingleton {
  private static _dependenciesContainer: Nullable<Dependencies> = null;

  static getInstance(): Dependencies {
    if (this._dependenciesContainer === null) {
      this._dependenciesContainer = dependenciesContainer();
    }
    return this._dependenciesContainer;
  }
}

export const dependencies = DependenciesContainerSingleton.getInstance();
