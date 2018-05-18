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