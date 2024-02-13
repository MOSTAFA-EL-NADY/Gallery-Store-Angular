import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseData } from '../interfaces/response.Interface';
import  buildQuery  from 'odata-query';
@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private url: string = environment.apiDomain + '/api/image';
  constructor(private http:HttpClient) { }

  postImage(image:FormData):Observable<ResponseData>  {
    return this.http.post<ResponseData>(this.url,image);
  }
  getFilterdImages(albumId: number, name?: string, size?: number, type?: string): Observable<ResponseData> {
    let queryOptions: any = {  };

   
    if (name) {
      queryOptions.filter = { ...queryOptions.filter, name };
    }
  
    if (size) {
      var sizeInMB=Number(size);
      queryOptions.filter = { ...queryOptions.filter,sizeInMB};
    }
  
    if (type) {
      queryOptions.filter = { ...queryOptions.filter, type };
    }
 
    const queryString = buildQuery(queryOptions);
  
    return this.http.get<ResponseData>(`${this.url}/${albumId}?$expand=Result(${queryString.substring(1)})`);
  }

  getImages(albumId:number):Observable<ResponseData>{
    return this.http.get<ResponseData>(`${this.url}/${albumId}`);
  }
}
