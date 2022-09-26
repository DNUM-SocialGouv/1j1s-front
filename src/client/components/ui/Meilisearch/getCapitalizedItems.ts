export const getCapitalizedItems = (label: string) => {
  const labelSplit = label.split(' / ');
  for (let i = 0; i < labelSplit.length; i++) {
    labelSplit[i] = labelSplit[i].charAt(0).toUpperCase() + labelSplit[i].slice(1);
  }
  return labelSplit.join(' / ');
};
