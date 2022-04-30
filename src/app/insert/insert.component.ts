import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css']
})
export class InsertComponent implements OnInit {

  form!: FormGroup;
  submitted = false;
  //tagsPattern = "^((([a-zA-Z0-9\s]){1,45},)+([a-zA-Z0-9\s]){1,45})$";
  tagsPattern = "^[0-9a-zA-Z]+(,[0-9a-zA-Z]+)*$";

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = new FormGroup({
        title: new FormControl('', [Validators.required]),
        body: new FormControl(
          '',
          [
            Validators.required,
            Validators.minLength(100),
            Validators.maxLength(400)
          ]
        ),
        imgUrl: new FormControl ('', [Validators.required]),
        userID: new FormControl(
          '',
          [
            Validators.required
          ]
        ),
        tags: new FormControl('', [Validators.required, Validators.pattern(this.tagsPattern)]),
        reactions: new FormControl ('', [Validators.required])
      }); //Fine descrizione form
  }// Fine Oninit

  get tagss() {
    return this.form.get('tags');
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      console.log(this.form.errors)
    }
    console.log(JSON.stringify(this.form.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }


}