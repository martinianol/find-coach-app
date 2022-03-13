import { createRouter, createWebHistory } from "vue-router";

import CoachDetails from './pages/coaches/CoachDetails.vue';   
import CoachList from './pages/coaches/CoachList.vue';   
import CoachRegistration from './pages/coaches/CoachRegistration.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';
import NotFound from './pages/NotFound.vue'; 
import UserAuth from './pages/auth/UserAuth';  

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/coaches' },
        { path: '/coaches', component: CoachList },
        { 
          path: '/coaches/:id', 
          component: CoachDetails,
          props: true,
          children: [
            { path: 'contact', component: ContactCoach }
        ] },
        { path: '/register', component: CoachRegistration },
        { path: '/requests', component: RequestsReceived },
        { path: '/auth', component: UserAuth},
        { path: '/:notFound(.*)', component: NotFound },
    ]    
});

export default router;