import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";

@Pipe({ name: "timeFromNow" })
export class TimeFromNowPipe implements PipeTransform {
  transform(value: Date): string {
    if (!value) {
      return null;
    }

    return moment(value).fromNow();
  }
}
