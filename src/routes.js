import Dashboard from "./components/Dashboard/Dashboard";

import Categories from "./components/NewsCategory/Categories";
import CreateCategory from "./components/NewsCategory/CreateCategory";
import UpdateCategory from "./components/NewsCategory/UpdateCategory";

import Ads from "./components/Ads/Ads";
import CreateAd from "./components/Ads/CreateAd";
import UpdateAd from "./components/Ads/UpdateAd";

import Contacts from "./components/Contact/Contacts.vue";
// import CreateContact from "./components/Contact/CreateContact";
// import UpdateContact from "./components/Contact/UpdateContact";

import News from "./components/News/News";
import CreateNews from "./components/News/CreateNews";
import UpdateNews from "./components/News/UpdateNews";


import Login from "./components/Auth/Login.vue";

export const routes = [
  {
    path: "/",
    component: Dashboard
  },
  //News Category
  {
    path: "/category",
    component: Categories
  },
  {
    path: "/category/new",
    component: CreateCategory
  },
  {
    path: "/category/:id/edit",
    component: UpdateCategory,
    props: true
  },

  // Ads
  {
    path: "/ads",
    component: Ads
  },
  {
    path: "/ads/new",
    component: CreateAd
  },
  {
    path: "/ads/:id/edit",
    component: UpdateAd,
    props: true
  },

  // Contact
  {
    path: "/contact",
    component: Contacts
  },
  // {
  //   path: "/contact/new",
  //   component: CreateContact
  // },
  // {
  //   path: "/contact/:id/edit",
  //   component: UpdateContact,
  //   props: true
  // },

  // News

  // Ads
  {
    path: "/news",
    component: News
  },
  {
    path: "/news/new",
    component: CreateNews
  },
  {
    path: "/news/:id/edit",
    component: UpdateNews,
    props: true
  },

  //LOGIN
  {
    path: "/login",
    component: Login,
    name: 'Login'
  },
  //DEFAULT
  {
    path: "*",
    redirect: "/"
  },
];
