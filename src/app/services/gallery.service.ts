import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Album } from '../models/Album';
import { environment } from 'src/environments/environment';
import { ResponseData } from '../interfaces/response.Interface';
@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  private url: string = environment.apiDomain + '/api/album';

  refresh = new BehaviorSubject<Album>(new Album(0,"","","",new Date(),new Date()));
 
  constructor(private http:HttpClient) { }

 
  postAlbum(album:FormData):Observable<ResponseData>  {
  return this.http.post<ResponseData>(this.url,album);
}

getAlbums(){
  return this.http.get<ResponseData>(this.url);
}
deleteAlbum(id:number):Observable<ResponseData>{
  return this.http.delete<ResponseData>(`${this.url}/${id}`);
}
getAlbumsById(id:number):Observable<ResponseData>{
  return this.http.get<ResponseData>(`${this.url}/${id}`);
}

  
}
