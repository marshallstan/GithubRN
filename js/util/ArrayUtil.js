export const updateArray = (array, item) => {
  let len = array.length;
  for (let i = 0; i < len; i++) {
    if (item === array[i]) {
      array.splice(i, 1);
      return;
    }
  }
  array.push(item);
};

export const clone = from => {
  if (!from) return [];
  let [...newArray] = from;
  return newArray;
};

export const isEqual = (arr1, arr2) => {
  if (!arr1 || !arr2) return false;
  if (arr1.length !== arr2.length) return false;
  return JSON.stringify(arr1) === JSON.stringify(arr2);
};

export const remove = (arr, item) => {
  if (!arr) return false;
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    if (item === arr[i]) arr.splice(i, 1);
  }
};