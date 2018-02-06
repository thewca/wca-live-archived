import { environment } from '../../environments/environment';

export class Settings {
  public static get apiBaseUrl(): string {
    return environment.apiUrl;
  }
}
