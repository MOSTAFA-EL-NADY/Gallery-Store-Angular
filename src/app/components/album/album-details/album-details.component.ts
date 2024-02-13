import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponseData } from 'src/app/interfaces/response.Interface';
import { Album } from 'src/app/models/Album';
import { AlbumImage } from 'src/app/models/Image';
import { GalleryService } from 'src/app/services/gallery.service';
import { ImageService } from 'src/app/services/image.service';
import { environment } from 'src/environments/environment';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css']
})
export class AlbumDetailsComponent implements OnInit {

  albumId!: number;
  album!: Album;
  albumImages: AlbumImage[] = [];
  filteredImages: AlbumImage[] = [];

  serverUrl: string = environment.apiDomain + '/';
  filterSize: number | null = null;
  filterName: string | null = null;
  filterType: string | null = null;


  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];
  constructor(private route: ActivatedRoute,
    private galleryService: GalleryService,
    private imageService: ImageService

  ) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.albumId = +params['id'];
    });
    console.log(this.albumId);
    this.galleryService.getAlbumsById(this.albumId).subscribe({
      next: (response: ResponseData) => {

        if (response.statusCode === 200) {

          console.log(response);

          this.album = <Album>response.result;
        }
      },
      error: (error: any) => {

        console.log(error);
      }
    })

    this.imageService.getImages(this.albumId).subscribe({
      next: (responseData: ResponseData) => {
        if (responseData.statusCode === 200) {

          this.albumImages = <AlbumImage[]>responseData.result
          this.filteredImages = <AlbumImage[]>responseData.result

        }

      },
      error: (error: any) => {

        console.log(error);
      }
    })


  }

  // Reset filter
  resetFilter() {
    this.imageService.getImages(this.albumId).subscribe({
      next: (responseData: ResponseData) => {
        if (responseData.statusCode === 200) {

          this.albumImages = <AlbumImage[]>responseData.result
          this.filteredImages = <AlbumImage[]>responseData.result

        }

      },
      error: (error: any) => {

        console.log(error);
      }
    })

   

  }
  applyFilter() {

    this.imageService.getFilterdImages(this.albumId, this.filterName, this.filterSize, this.filterType)
      .subscribe({
        next: (response: ResponseData) => {

          console.log(response)
          response = this.convertResponseToLowercase(response)

          if (response.statusCode === 200) {
debugger
            console.log(response);
            this.filteredImages = Object.values(response.result)
          //  this.albumImages = this.filteredImages;
            //this.albumImages.length = 0;
            console.log(this.filteredImages)
            //  this.albumImages=this.filteredImages;
            console.log(this.albumImages);

          }
        },
        error: (error: any) => {

          console.log(error);
        }
      })


  }

  convertObjectKeysToLower(obj: any): any {
    if (!obj || typeof obj !== 'object') {
      return obj;
    }

    const convertedObject: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const convertedKey = key.charAt(0).toLowerCase() + key.slice(1);
        convertedObject[convertedKey] = this.convertObjectKeysToLower(obj[key]);
      }
    }

    return convertedObject;
  }

  convertResponseToLowercase(response: any): any {
    if (Array.isArray(response)) {
      return response.map(item => this.convertObjectKeysToLower(item));
    } else if (typeof response === 'object') {
      return this.convertObjectKeysToLower(response);
    } else {
      return response;
    }
  }


}
