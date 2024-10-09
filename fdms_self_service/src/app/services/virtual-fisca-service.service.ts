import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VirtualFiscaServiceService {
private baseUrl = environment.apiBaseUrl;
  constructor(
    private http: HttpClient,
  ) {
   }
  uploadRequestFile(data: any) {
    const url = `${this.baseUrl}/docsAi/companyVerifier`;

    console.log('posting', data)
    console.log(url)
    return this.http.post(url, data);
}


registerCompany(data:any):Observable<any> {
  const url=  `${this.baseUrl}/virtualFiscalisation/register-company`
  console.log("sent the requesst");
  console.log("this is the data",data)
  return this.http.post(url, data,);
    } 
}
