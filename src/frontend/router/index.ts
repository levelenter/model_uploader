import { Session } from "../../framework/client/Session";
import VueRouter, { createRouter, createWebHistory, RouteRecordRaw, RouteLocationNormalized } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import TablePage from "../components/TablePage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requireAuth: false }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requireAuth: false }
  },
  {
    path: "/table_page",
    name: "TablePage",
    component: TablePage,
    meta: { requireAuth: false }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

/**
 * ユーザータイプによって、ログインページが異なる。
 * 認証なしで入ろうとした時にログインページへ飛ばす。
 * @param type
 * @param to
 */
const getLoginPagePath = (type: string, to: RouteLocationNormalized) => {
  const path = "/home";
  return path;
};

router.beforeEach((to: RouteLocationNormalized, from, next) => {
  // console.log('routing', to.fullPath, to.meta, to.matched);

  // メタデータがなければnextに飛ばす（管理対象外のページ）
  to.meta ?? next();

  // 認証されていなければログイン画面出す
  if (to.meta.requireAuth && !Session.isAuthorized) {
    // どのログイン画面に返すかを判定
    const path = getLoginPagePath(to.meta.type as string, to);

    next({ path: path, query: { redirect: to.fullPath } });
  }
  next();
});
export default router;
