export class EmploiNotFoundError extends Error {
  constructor(id: string) {
    super(`Cannot find emploi with id ${id}`);
    this.name = "EmploiNotFoundError";
  }
}
