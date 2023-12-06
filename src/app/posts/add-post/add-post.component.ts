import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../models/posts.model';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { addPost } from '../state/posts.actions';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css',
})
export class AddPostComponent implements OnInit {
  postForm: FormGroup;

  constructor(private store:Store<AppState>) {}
  ngOnInit(): void {


    let new_Date: Date = new Date();
    // Converting date to string
    let result: string = new_Date.toLocaleString();



    this.postForm = new FormGroup({
      title: new FormControl(`testing posts activity ${result}`, [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl('testing posts activity', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  onAddPost() {
    if (!this.postForm.valid) {
      return;
    }

    const post:Post = {
      title: this.postForm.value.title,
      description: this.postForm.value.description
    }

    this.store.dispatch(addPost({post}))
  }

  showDescriptionErrors() {
    const descriptionForm = this.postForm.get('description');
    if (descriptionForm.touched && !descriptionForm.valid) {
      if (descriptionForm.errors.required) {
        return 'Description is required';
      }

      if (descriptionForm.errors.minLength) {
        return 'Description should be minimum 10 characters length';
      }
    }

    return '';
  }
}
