import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable()
export class ConfigService {
  private config: Config = null;

  constructor(private apiService: ApiService) {}

  initConfig(): Promise<Config> {
    return new Promise((resolve, reject) => {
      this.apiService
        .get<Config>("/config")
        .then(activeConfig => {
          this.config = activeConfig;
          resolve();
        })
        .catch(err => reject(err));
    });
  }

  getConfig(): Config {
    return this.config;
  }

  updateConfig(patchObj: any): Promise<Config> {
    return new Promise((resolve, reject) => {
      this.apiService
        .patch<Config>(`/config/${this.config._id}`, patchObj)
        .then(() => {
          this.config = { ...this.config, ...patchObj };
          resolve(this.config);
        })
        .catch(err => reject(err));
    });
  }
}
