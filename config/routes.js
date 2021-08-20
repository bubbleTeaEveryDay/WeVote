export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
    ],
  },
  {
    path: '/welcome',
    name: 'Welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'Voting Management',
    icon: 'crown',
    component: './EApage',
    access: 'canAdmin',
    // routes: [
    //   {
    //     path: '/admin/management',
    //     name: 'Voting Management',
    //     icon: 'smile',
    //     component: './TableList',
    //   },
    // ],
  },
  // {
  //   name: 'Vote',
  //   icon: 'table',
  //   path: '/list',
  //   component: './VoteDetail',
  // },
  {
    name: 'Vote',
    icon: 'table',
    path: '/VoterPage',
    component: './VoterPage',
    access: 'canUser',
  },
  {
    name: 'Register',
    icon: 'table',
    path: '/Register',
    component: './Register',
    access: 'canUser',
  },
  {
    name: 'Gen',
    icon: 'table',
    path: '/Gen',
    component: './Gen',
    access: 'canUser',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
