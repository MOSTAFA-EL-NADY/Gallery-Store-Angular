import { Component, OnInit } from '@angular/core';
import { ResponseData } from 'src/app/interfaces/response.Interface';
import { Album } from 'src/app/models/Album';
import { GalleryService } from 'src/app/services/gallery.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-album-data',
  templateUrl: './album-data.component.html',
  styleUrls: ['./album-data.component.css']
 
})
export class AlbumDataComponent implements OnInit {
      
  userAlbums :Album [];
  serverUrl:string =environment.apiDomain+'/';
  searchKeyword: string = '';

  constructor(private galleryService: GalleryService) {
        
  } 
  isImageAvailable(album: Album): boolean {
    return album.mainImage !== null && album.mainImage !== undefined && album.mainImage.trim() !== '';
  }
  ngOnInit() {

     this.galleryService.getAlbums().subscribe({
       next: (responseData: ResponseData) => {
        if(responseData.statusCode ===200)
        {
          this.userAlbums =<Album[]> responseData.result;
          console.log(this.userAlbums);
         
        }
        
       },
     })

     this.galleryService.refresh.subscribe({
      next: (album: Album) => {
        album.mainImage =`${this.serverUrl}${album.mainImage}`;
       debugger
        this.userAlbums=[album, ...this.userAlbums];
       
      }
     })


  }

  deleteAlbum(albumId: number) {
    this.galleryService.deleteAlbum(albumId).subscribe({
      next: (responseData: ResponseData) => {
        if (responseData.statusCode === 200) {
          // Remove the deleted album from the array
          Swal.fire({
            title: "Success",
            text: "Album Deleted Successfullly",
            icon: "success"
          });
          this.userAlbums = this.userAlbums.filter(album => album.id !== albumId);

        }
      },
      error: (error: any) => {
        Swal.fire({
          title: "Error",
          text:"try Again !",
          icon: "error"
        });
        console.error('Error deleting album:', error);
        // Handle the error, e.g., show an alert
      }
    });
  }

  searchAlbums() {
    if (this.searchKeyword.trim() !== '') {
      
      this.userAlbums = this.userAlbums.filter(album =>
        album.title.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
    } else {
     
      this.refreshAlbums();
    }
  }

  refreshAlbums() {
    // Retrieve the original list of albums
    this.galleryService.getAlbums().subscribe({
      next: (responseData: ResponseData) => {
        if (responseData.statusCode === 200) {
          this.userAlbums = <Album[]>responseData.result;
        }
      },
    });
  }
}



