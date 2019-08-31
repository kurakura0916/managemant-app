import HelloWorld from '@/components/templates/HelloWorld.vue'
import LoginView from '@/components/templates/LoginView.vue'
import ReservationView from '@/components/templates/ReservationView.vue'
import Card from '@/components/atoms/Card.vue'
import SignupView from '@/components/templates/SignupView.vue'
import CalendarView from '@/components/templates/CalendarView.vue'

export default [
        {
            path: '/',
            component: HelloWorld,
            meta: {requiresAuth: true}
        },
        {
            path: '/login',
            component: LoginView
        },
        {
            path: '/reservation',
            component: ReservationView,
            meta: {requiresAuth: true}
        },
        {
            path: '/card',
            component: Card
        },
        {
            path: '/signup',
            component: SignupView
        },
        {
            path: '/calendar/:id',
            name: 'CalendarView',
            component: CalendarView,
            meta: {requiresAuth: true}
        },
        {
            path: '*',
            redirect: '/'
        }
]
