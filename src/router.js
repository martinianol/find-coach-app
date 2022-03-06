import { createRouter, createWebHistory } from "vue-router";

import CoachDetails from './components/pages/coaches/CoachDetails.vue';   
import CoachList from './components/pages/coaches/CoachList.vue';   
import CoachRegistration from './components/pages/coaches/CoachRegistration.vue';
import ContactCoach from './components/pages/requests/ContactCoach.vue';
import RequestsReceived from './components/pages/requests/RequestsReceived.vue';
import NotFound from './components/pages/NotFound.vue';   

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/coaches' },
        { path: '/coaches', component: CoachList },
        { path: '/coaches/:id', component: CoachDetails, children: [
            { path: 'contact', component: ContactCoach }
        ] },
        { path: '/register', component: CoachRegistration },
        { path: '/requests', component: RequestsReceived },
        { path: '/:notFound(.*)', component: NotFound },
    ]    
});

export default router;