import { OffreEmploiFiltre } from "~/server/offresEmploi/domain/offreEmploi";

export function anOffreEmploiFiltre(
  override?: Partial<OffreEmploiFiltre>
): OffreEmploiFiltre {
  return {
    motClé: override?.motClé ?? "boulanger",
    page: override?.page ?? 1,
  };
}
