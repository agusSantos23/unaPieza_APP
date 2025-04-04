import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiUnaPiezaService {

  private apiUrl:string = 'http://127.0.0.1:8000/';

  constructor(private http: HttpClient) { }


  viewCharacters():Observable<any>{
    return this.http.get(this.apiUrl)
  }
  
  findCharacter(id: number | undefined): Observable<any>{
    return this.http.get(this.apiUrl + `character/${id}`)
  }


  getCsrfToken(): Observable<any> {
    return this.http.get(this.apiUrl + 'csrf-token', { withCredentials: true });
  }


  saveCharacter(characterData: any): Observable<any> {
    return this.getCsrfToken().pipe(
      switchMap((response: any) => {

        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': response.csrf_token 
        });

        return this.http.post(this.apiUrl + "character/save", characterData, { headers, withCredentials: true });  
      })
    );
  }

  updateCharacter(id: number | undefined, characterData: any): Observable<any>{
    return this.getCsrfToken().pipe(
      switchMap((response: any) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': response.csrf_token 
        }); 

        return this.http.put(this.apiUrl + `character/update/${id}`, characterData ,{ headers, withCredentials: true });

      })
    )
  }


  deleteCharacter(id: number | undefined): Observable<any>{
    return this.getCsrfToken().pipe(
      switchMap((response: any) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': response.csrf_token 
        });
  
        return this.http.delete(this.apiUrl + `character/delete/${id}`, { headers, withCredentials: true });
      })
    );
  }
}
