import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.state';
import { updatePost } from '../state/posts.actions';
import { getPostById } from '../state/posts.selector';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit, OnDestroy {
  post: Post;
  postForm: FormGroup;
  destroy$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.store
        .select(getPostById, { id })
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
          this.post = data;
          this.createForm();
        });
    });
  }

  createForm() {
    this.postForm = this.fb.group({
      title: [this.post.title, [Validators.required, Validators.minLength(6)]],
      description: [
        this.post.description,
        [Validators.required, Validators.minLength(10)],
      ],
    });
  }

  showErrors(controlName: string) {
    const controlField = this.postForm.get(controlName);
    if (controlField.touched && !controlField.valid) {
      let error = '';
      const modifedControlName =
        controlName.charAt(0).toUpperCase() + controlName.slice(1);
      controlField.errors.required
        ? (error = `${modifedControlName} is required`)
        : (error = `${modifedControlName} should be of minimum ${controlField.errors.minlength.requiredLength} characters length`);

      return error;
    }
  }

  onSubmit() {
    if (!this.postForm.valid) {
      return;
    }
    const { title, description } = this.postForm.value;

    const post: Post = {
      id: this.post.id,
      title,
      description,
    };
    //dipatch the action
    this.store.dispatch(updatePost({ post }));
    //navigate
    this.router.navigate(['posts']);
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
