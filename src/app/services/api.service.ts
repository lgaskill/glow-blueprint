import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Constants } from "../config/constants";

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  private API_HOST: string = environment.production
    ? Constants.API_HOST_PROD
    : Constants.API_HOST_LOCAL;

  async get<T>(url: string): Promise<T> {
    return this.http
      .get<T>(this.API_HOST + url, { params: { key: Constants.API_KEY } })
      .toPromise();
  }

  async post<T>(url: string, postObj: any): Promise<T> {
    return this.http
      .post<T>(this.API_HOST + url, postObj, {
        params: { key: Constants.API_KEY }
      })
      .toPromise();
  }

  async patch<T>(url: string, patchObj: any): Promise<T> {
    return this.http
      .patch<T>(this.API_HOST + url, patchObj, {
        params: { key: Constants.API_KEY }
      })
      .toPromise();
  }

  async delete<T>(url: string): Promise<T> {
    return this.http
      .delete<T>(this.API_HOST + url, { params: { key: Constants.API_KEY } })
      .toPromise();
  }
}
