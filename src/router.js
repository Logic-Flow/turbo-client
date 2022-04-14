import { createRouter, createWebHashHistory } from 'vue-router';
// import List from './components/List'

const routes = [
  { path: '/', component:  () => import('./components/List.vue'), },
  { path: '/flow/:flowModelId', component:  () => import('./components/FlowChart.vue'), },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});