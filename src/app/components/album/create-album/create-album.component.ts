import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { ResponseData } from 'src/app/interfaces/response.Interface';
import { Album } from 'src/app/models/Album';
import { GalleryService } from 'src/app/services/gallery.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-create-album',
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.css']
})
export class CreateAlbumComponent {
   
  albumForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private galleryService: GalleryService) {
    this.albumForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      mainImage: [null, Validators.required]
    })
    
  }

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const selectedFile: File = fileList[0];
      if (selectedFile.type.startsWith('image/')) {
        this.albumForm.get('mainImage')?.setValue(selectedFile);
      } else {
        this.albumForm.get('mainImage')?.setErrors({ invalidImageFormat: true });
      }
    }
  }
  onSubmit() {
    if (this.albumForm.valid) {
      const formData = new FormData();
      formData.append('title', this.albumForm.get('title')?.value);
      formData.append('description', this.albumForm.get('description')?.value);
      formData.append('mainImage', this.albumForm.get('mainImage')?.value);
      console.log(this.albumForm.value);

      this.galleryService.postAlbum(formData).subscribe(response => {
       
        if(response.statusCode === 200)
        {
          Swal.fire({
            title: "Success",
            text: "You Created New  Album!",
            icon: "success"
          });
         var newAlbum :Album=response.result;
                
          this.galleryService.refresh.next(newAlbum)
        }
        else
        {
          Swal.fire({
            title: "Error",
            text: response.message,
            icon: "error"
          });
        }
       
      }, errorResponse => {
        debugger
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errorResponse.error.errorMessage,
         
        });
      })
    }
    
 
  }
}
