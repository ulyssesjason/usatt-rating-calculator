export class CommonUtil {
  static arrayRemove(arr, input) {
    arr.forEach((item, index) => {
      if (item === input) {
        arr.splice(index, 1);
      }
    });
  }

  static median(values) {
    if (values.length === 0) {
      return 0;
    }

    values.sort((a, b) => a - b);

    const half = Math.floor(values.length / 2);

    if (values.length % 2) {
      return values[half];
    }

    return Math.floor((values[half - 1] + values[half]) / 2);

  }
}
