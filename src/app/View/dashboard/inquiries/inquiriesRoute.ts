import { Routes } from '@angular/router';
import { InquiriesComponent } from './inquiries.component';
export const Inquiries_Routes: Routes = [{
    path: '', component: InquiriesComponent
},
{
    path: 'chat/:id',
    loadChildren: () =>
        import('../../../SharedComponents/Dashboard/chat-inner/chatInnerRoute').then(
            (m) => m.Chat_Inner_Routes
        ),
},
];
