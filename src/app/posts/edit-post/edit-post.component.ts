import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../models/posts.model';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { getPostById } from '../state/posts.selectors';
import { Subscription } from 'rxjs';
import { updatePost } from '../state/posts.actions';


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css',
})
export class EditPostComponent implements OnInit, OnDestroy {
  editForm: FormGroup;
  post: Post;
  postSubscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router:Router
  ) {}
  ngOnDestroy(): void {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.postSubscription = this.store
        .select(getPostById, { id })
        .subscribe((data) => {
          this.post = data;
          this.createForm();
        });
    });
  }
  createForm() {
    this.editForm = this.fb.group({
      title: [this.post.title, [Validators.required, Validators.minLength(6)]],
      description: [
        this.post.description,
        [Validators.required, Validators.minLength(10)],
      ],
    });
  }

  onUpdatePost() {
    if (!this.editForm.valid) {
      return;
    }

    const post: Post = {
      id: this.post.id,
      title: this.editForm.value.title,
      description: this.editForm.value.description,
    };

    this.store.dispatch(updatePost({ post }));
    this.router.navigate(['posts'])
  }

  showDescriptionErrors() {
    const descriptionForm = this.editForm.get('description');
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
