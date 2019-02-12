import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "orderBy" })
export class OrderByPipe implements PipeTransform {
  transform(arr: any[], fieldName: string): any[] {
    if (!arr || !Array.isArray(arr) || !fieldName) {
      return arr;
    }

    return arr.sort();
  }
}
