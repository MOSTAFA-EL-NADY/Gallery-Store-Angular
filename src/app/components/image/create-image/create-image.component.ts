import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumImage } from 'src/app/models/Image';
import { ImageService } from 'src/app/services/image.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-create-image',
  templateUrl: './create-image.component.html',
  styleUrls: ['./create-image.component.css']
})
export class CreateImageComponent implements OnInit  {
  imageFrom!: FormGroup;
  albumId:number;
  constructor(private formBuilder: FormBuilder,private imageService:ImageService,private route:ActivatedRoute,private router:Router) {
    this.imageFrom = this.formBuilder.group({

      description: ['', Validators.required],
      image: [null, Validators.required]
      
    })
    
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.albumId = +params['id'];
    });
  }
  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const selectedFile: File = fileList[0];
      if (selectedFile.type.startsWith('image/')) {
        this.imageFrom.get('image')?.setValue(selectedFile);
      } else {
        this.imageFrom.get('image')?.setErrors({ invalidImageFormat: true });
      }
    }
  }
  onSubmit()
  {
    if (this.imageFrom.valid) {
      const formData = new FormData();
    
      formData.append('description', this.imageFrom.get('description')?.value);
      formData.append('image', this.imageFrom.get('image')?.value);
      formData.append('albumId',this.albumId.toString());
     
      this.imageService.postImage(formData).subscribe(response => {
       
        if(response.statusCode === 200)
        {
          Swal.fire({
            title: "Success",
            text: "You Added New  Image!",
            icon: "success"
          });
        this.router.navigate(['/album/' + this.albumId]);
                
        
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
