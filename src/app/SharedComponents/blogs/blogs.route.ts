import { Routes } from '@angular/router';
import { BlogsComponent } from './blogs.component';

export const Blog_Routes: Routes = [
  { path: '', component: BlogsComponent },
  {
    path: 'blog-inner',
    data: { footer: true, header: true },
    loadChildren: () =>
      import('../../view/blog-inner/blog-inner.route').then(
        (m) => m.Blog_Inner_Routes
      ),
  },
];
