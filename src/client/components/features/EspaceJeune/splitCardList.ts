import { CarteEspaceJeune } from '~/server/cms/domain/espaceJeune';

type SplitCardList = Array<Array<CarteEspaceJeune>>

export function splitCardList(remainingCardList: CarteEspaceJeune[], maxCardPerRow: number) {
  return remainingCardList.reduce<SplitCardList>((acc, curr) => {
    const cardListLength = acc.length;
    const currentIndex = cardListLength - 1;
    if (cardListLength === 0 || acc[currentIndex].length === maxCardPerRow) {
      acc.push([curr]);
    } else {
      acc[currentIndex].push(curr);
    }
    return acc;
  }, []);
}
