export default class Utils{
  static checkFavorite(item, items) {
    let id = item.id ? item.id.toString() : item.fullName;
    for (let i = 0; i < items.length; i ++) {
      if (id === items[i]) return true;
    }
    return false;
  }
}