export const sortResults = (array, entity, descendent) =>
  array.sort((a, b) => {
    if (a[entity] < b[entity]) {
      return descendent ? -1 : 1;
    }
    if (a[entity] > b[entity]) {
      return descendent ? 1 : -1;
    }
    return 0;
  });

export const concatWithoutDuplicates = (array1, array2) => {
  return [
    ...array1,
    ...array2.filter(
      (item) =>
        !array1.map((comparingItem) => comparingItem.id).includes(item.id)
    ),
  ];
};
