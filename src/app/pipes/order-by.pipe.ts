import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "orderBy" })
export class OrderByPipe implements PipeTransform {
  transform(arr: any[], fieldName: string, desc: boolean = false): any[] {
    if (!arr || !Array.isArray(arr)) {
      return arr;
    }

    const sorted = fieldName
      ? arr.sort((a, b) => this.compare(a[fieldName], b[fieldName]))
      : arr.sort(this.compare);

    return desc ? sorted.reverse() : sorted;
  }

  compare(a: any, b: any): number {
    if (a instanceof Date && a instanceof Date) {
      return a.getTime() - b.getTime();
    }

    if (
      isNaN(parseFloat(a)) ||
      !isFinite(a) ||
      (isNaN(parseFloat(b)) || !isFinite(b))
    ) {
      // Isn't a number so do a caseless string comparisson
      if (a.toLowerCase() < b.toLowerCase()) {
        return -1;
      }
      if (a.toLowerCase() > b.toLowerCase()) {
        return 1;
      }
    } else {
      // Parse numbers then compare
      if (parseFloat(a) < parseFloat(b)) {
        return -1;
      }
      if (parseFloat(a) > parseFloat(b)) {
        return 1;
      }
    }

    // They're equal
    return 0;
  }
}
