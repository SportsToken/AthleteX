/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import JoinLeagues from 'views/JoinLeagues.js';
import ViewLeagues from 'views/ViewLeagues.js';
import TableList from "views/TableList.js";
import Icons from "views/Icons.js";
import UserProfile from "views/UserProfile.js";
import Landing from "views/Landing.js";

var routes = [
  {
    path: "/Landing",
    name: "Homepage",
    icon: "tim-icons icon-world",
    component: Landing,
    layout: "/admin"
  },
  {
    path: "/wallet",
    name: "Your Account",
    icon: "tim-icons icon-atom",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/join-leagues",
    name: "Join a League",
    components: JoinLeagues,
    icon: "tim-icons"
  },
  {
    path: "/leagues",
    name: "Active Leagues",
    component: ViewLeagues,
    icon: "tim-icons"
  }
];
export default routes;
