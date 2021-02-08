import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.state';
import { addPost } from '../state/posts.actions';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit {
  postForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.postForm = this.fb.group({
      title: [null, [Validators.required, Validators.minLength(6)]],
      description: [null, [Validators.required, Validators.minLength(10)]],
    });
  }

  showDescriptionErrors() {
    const descriptionForm = this.postForm.get('description');
    if (descriptionForm.touched && !descriptionForm.valid) {
      let error = '';
      descriptionForm.errors.required
        ? (error = 'Description is required')
        : (error = 'Description should be of minimum 10 characters length');

      return error;
    }
  }

  onAddPost() {
    if (!this.postForm.valid) {
      return;
    }

    const { title, description } = this.postForm.value;
    const post: Post = {
      title: title,
      description: description,
    };
    this.store.dispatch(addPost({ post }));
    this.route.navigate(['/posts']);
  }
}
