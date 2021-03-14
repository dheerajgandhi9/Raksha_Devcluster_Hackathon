import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/loginuser",
    name: "LoginUser",
    component: () => import("../views/Login(User).vue"),
  },
  {
    path: "/loginorg",
    name: "OrgUser",
    component: () => import("../views/Login(OrgUser).vue"),
  },

  {
    path: "/usertype",
    name: "Usertype",
    component: () => import("../views/Usertype.vue"),
  },
  {
    path: "/create",
    name: "CreateAccount",
    component: () => import("../views/createAccn.vue"),
  },
  // {
  //   path: "/profile/:email",
  //   name: "ViewProfile",
  //   component: () => import("../views/Profile.vue"),
  //   props: true,
  // },
  {
    path: "/report",
    name: "Report",
    component: () => import("../views/Report.vue"),
  },
  // {
  //   path: "/apply/:email",
  //   name: "CollegeForm",
  //   component: () => import("../views/CollegeForm.vue"),
  //   props:true
  // },
  // {
  //   path: "/search/:email",
  //   name: "search",
  //   component: () => import("../views/search.vue"),
  //   props: true,
  // },
  {
    path: "/helpline",
    name: "Helpline",
    component: () => import("../views/Helpline.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

