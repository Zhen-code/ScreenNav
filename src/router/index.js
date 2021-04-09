import Vue from "vue";
import VueRouter from "vue-router";
const Hdetails =()=>import('../views/Hindoor/Hdetails.vue')
const Hactivity =()=>import('../views/Hindoor/Hactivity.vue')
const Hdaohang =()=>import('../views/Hindoor/Hdaohang.vue')

Vue.use(VueRouter);

const routes = [
  {
   path:'/',
   name:'Home',
   redirect: '/Hdetails'
  },
  {
    path:'/Hdetails',
    name:'Hdetails',
    component:Hdetails
  },
  {
    path:'/Hactivity',
    name:'Hactivity',
    component: Hactivity 
  },
  {
    path:'/Hdaohang',
    name:'Hdaohang',
    component: Hdaohang
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
