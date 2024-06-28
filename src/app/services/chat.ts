export class ChatDB {

  // Chat User
  static chatUser = [
    {
      id: 0,
      name: 'Mark Jecno',
      status: 'Be the change',
      profile: 'https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png',
      seen: 'online',
      online: true,
      typing: false,
      authenticate: 0,
      call: {
        status: 'incoming',
        date_time: '5 May, 4:40 PM'
      }
    },
    {
      id: 6,
      name: 'Elana Jecno',
      status: 'In Meeting..',
      profile: 'https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png',
      seen: 'online',
      online: true,
      typing: false,
      authenticate: 1,
      call: {
        status: '',
        date_time: ''
      }
    },
    {
      id: 2,
      name: 'Aiden Chavez',
      status: 'Out is my favorite.',
      profile: 'https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png',
      seen: 'Last Seen 3:55 PM',
      online: false,
      typing: false,
      authenticate: 0,
      call: {
        status: 'incoming',
        date_time: '6 May, 1:50 PM'
      }
    },
    {
      id: 3,
      name: 'Prasanth Anand',
      status: 'Change for anyone.',
      profile: 'https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png',
      seen: 'online',
      online: true,
      typing: false,
      authenticate: 0,
      call: {
        status: 'outgoing',
        date_time: '7 May, 9:40 PM'
      }
    },
    {
      id: 4,
      name: 'Venkata Satyamu',
      status: 'First bun like a sun.',
      profile: 'https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png',
      seen: 'online',
      online: true,
      typing: false,
      authenticate: 0,
      call: {
        status: 'incoming',
        date_time: '7 May, 10:50 PM'
      }
    },
    {
      id: 5,
      name: 'Ginger Johnston',
      status: 'its my life. Mind it.',
      profile: 'https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png',
      seen: 'Last Seen 5:55 PM',
      online: false,
      typing: false,
      authenticate: 0,
      call: {
        status: 'outgoing',
        date_time: '7 May, 11:40 PM'
      }
    },
    {
      id: 1,
      name: 'Kori Thomas',
      status: 'status pending...',
      profile: 'https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png',
      seen: 'online',
      online: true,
      typing: false,
      authenticate: 0,
      call: {
        status: 'outgoing',
        date_time: '8 May, 9:15 AM'
      }
    },
    {
      id: 7,
      name: 'Marked Thomas',
      status: 'away from home',
      profile: 'https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png',
      seen: 'Last Seen 1:55 PM',
      online: false,
      typing: false,
      authenticate: 0,
      call: {
        status: 'incoming',
        date_time: '8 May, 10:50 Am'
      }
    },
    {
      id: 8,
      name: 'Jaclin Thomas',
      status: 'Single..',
      profile: 'https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png',
      seen: 'Last Seen 3:15 PM',
      online: false,
      typing: false,
      authenticate: 0,
      call: {
        status: 'incoming',
        date_time: '9 May, 11:50 PM'
      }
    },
  ]

  // Message
  static chat = [
    {
      id: 1,
      message: [
        {
          sender: 1,
          time: '10:12 am',
          text: 'Are we meeting today? Project has been already finished and I have results to show you.'
        },
        {
          sender: 0,
          time: '10:14 am',
          text: 'Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so?.'
        },
        {
          sender: 0,
          time: '10:14 am',
          text: 'Well I am not sure. The rest of the team.'
        },
        {
          sender: 1,
          time: '10:20 am',
          text: 'Actually everything was fine. I am very excited to show this to our team.'
        }
      ]
    },
    {
      id: 2,
      message: []
    },
    {
      id: 3,
      message: []
    },
    {
      id: 4,
      message: []
    },
    {
      id: 5,
      message: []
    },
    {
      id: 6,
      message: []
    },
    {
      id: 7,
      message: []
    },
    {
      id: 8,
      message: []
    }
  ]
  
}
