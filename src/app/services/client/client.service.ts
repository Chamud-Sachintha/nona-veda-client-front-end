import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../../shared/models/Client/client';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  addNewClientInfo(clientInfo: Client) {
    const path = environment.apiUrl + "add-new-client";
    return this.http.post(path, clientInfo);
  }
}
