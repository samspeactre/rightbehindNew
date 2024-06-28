import { Routes } from '@angular/router';
import { ChatComponent } from './chat.component';
export const Inquiries_Routes: Routes = [{
    path: '', component: ChatComponent
},
{
    path: 'chat/:id',
    loadChildren: () =>
        import('../../../SharedComponents/Dashboard/chat-inner/chatInnerRoute').then(
            (m) => m.Chat_Inner_Routes
        ),
},
];
