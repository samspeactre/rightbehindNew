import { Routes } from '@angular/router';
import { CommunityViewComponent } from './community-view.component';
import { CommunityInsideComponent } from './community-inside/community-inside.component';
import { LayoutComponent } from './layout/layout.component';

export const Community_Routes: Routes = [
    { path: '', component: LayoutComponent,
        children: [
            {path:'', component:CommunityViewComponent,data: { footer: true, header: true, communityHeader:true },},
            {path:':id', component:CommunityInsideComponent, data: { footer: true, header: true, communityHeader:true },}
        ]
     },
];
