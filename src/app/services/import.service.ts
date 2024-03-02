import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ImportService {

  constructor(private _api : ApiService) { }

  importFile(file: File, importType: string, accountName : string) {
    const formData = new FormData();
    formData.append('file', file, file.name);

    const url = `${importType}/import?accountName=${accountName}`;
    return this._api.post(url, formData);
  }
}
