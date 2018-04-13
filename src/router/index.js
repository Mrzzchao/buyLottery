import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Jczq = () => import('~pages/jczq.vue')
const JczqHome = () => import('~pages/jczq/home.vue')
const JczqHomeHt = () => import('~pages/jczq/home/ht.vue')
const JczqHomeSpf = () => import('~pages/jczq/home/spf.vue')
const JczqHomeNspf = () => import('~pages/jczq/home/nspf.vue')
const JczqHomeBf = () => import('~pages/jczq/home/bf.vue')
const JczqHomeJqs = () => import('~pages/jczq/home/jqs.vue')
const JczqHomeBqc = () => import('~pages/jczq/home/bqc.vue')
const JczqHomeDg = () => import('~pages/jczq/home/dg.vue')
const JczqOrder = () => import('~pages/jczq/order.vue')
const JczqOrderDg = () => import('~pages/jczq/orderDg.vue')
const JczqOrderHt = () => import('~pages/jczq/order/ht.vue')
const JczqOrderSpf = () => import('~pages/jczq/order/spf.vue')
const JczqOrderNspf = () => import('~pages/jczq/order/nspf.vue')
const JczqOrderBf = () => import('~pages/jczq/order/bf.vue')
const JczqOrderJqs = () => import('~pages/jczq/order/jqs.vue')
const JczqOrderBqc = () => import('~pages/jczq/order/bqc.vue')

export function createRouter() {
    return new VueRouter({
        mode: 'hash',
        routes: [
          {
            path: '/jczq',   // 竞彩足球
            name: 'jczq',
            component: Jczq,
            redirect: '/jczq/home/nspf',
            children: [
              {
                path: 'home',
                component: JczqHome,
                name: 'jczq-home',
                meta: {
                  type: 'nspf',
                  name: '胜平负'
                },
                children: [
                  {   // 混合过关
                    path: 'ht',
                    component: JczqHomeHt,
                    name: 'jczq-home-ht',
                    meta: {
                      type: 'ht',
                      name: '混合过关'
                    }
                  },
                  {   // 胜平负
                    path: 'nspf',
                    component: JczqHomeNspf,
                    name: 'jczq-home-nspf',
                    meta: {
                      type: 'nspf',
                      name: '胜平负'
                    }
                  },
                  {   // 让球胜平负
                    path: 'spf',
                    component: JczqHomeSpf,
                    name: 'jczq-home-spf',
                    meta: {
                      type: 'spf',
                      name: '让球胜平负'
                    }
                  },
                  {   // 比分
                    path: 'bf',
                    component: JczqHomeBf,
                    name: 'jczq-home-bf',
                    meta: {
                      type: 'bf',
                      name: '比分'
                    }
                  },
                  {   // 进球数
                    path: 'jqs',
                    component: JczqHomeJqs,
                    name: 'jczq-home-jqs',
                    meta: {
                      type: 'jqs',
                      name: '进球数'
                    }
                  },
                  {   // 半全场
                    path: 'bqc',
                    component: JczqHomeBqc,
                    name: 'jczq-home-bqc',
                    meta: {
                      type: 'bqc',
                      name: '半全场'
                    }
                  },
                  {   // 单关
                    path: 'dg',
                    component: JczqHomeDg,
                    name: 'jczq-home-dg',
                    meta: {
                      type: 'dg',
                      name: '单关'
                    }
                  },
                  {
                    path: '*',
                    redirect: 'nspf'
                  }
                ]
              },
              {   // 单关 独立开一个路由 因为他的订单处理比较特殊
                path: 'order/dg',
                component: JczqOrderDg,
                name: 'jczq-order-dg',
                meta: {
                  type: 'dg',
                  name: '单关'
                }
              },
              {
                path: 'order',
                component: JczqOrder,
                name: 'jczq-order',
                children: [
                  {   // 混合过关
                    path: 'ht',
                    component: JczqOrderHt,
                    name: 'jczq-order-ht',
                    meta: {
                      type: 'ht',
                      name: '混合过关'
                    }
                  },
                  {   // 胜平负
                    path: 'nspf',
                    component: JczqOrderNspf,
                    name: 'jczq-order-nspf',
                    meta: {
                      type: 'nspf',
                      name: '胜平负'
                    }
                  },
                  {   // 让球胜平负
                    path: 'spf',
                    component: JczqOrderSpf,
                    name: 'jczq-order-spf',
                    meta: {
                      type: 'spf',
                      name: '让球胜平负'
                    }
                  },
                  {   // 比分
                    path: 'bf',
                    component: JczqOrderBf,
                    name: 'jczq-order-bf',
                    meta: {
                      type: 'bf',
                      name: '比分'
                    }
                  },
                  {   // 进球数
                    path: 'jqs',
                    component: JczqOrderJqs,
                    name: 'jczq-order-jqs',
                    meta: {
                      type: 'jqs',
                      name: '进球数'
                    }
                  },
                  {   // 半全场
                    path: 'bqc',
                    component: JczqOrderBqc,
                    name: 'jczq-order-bqc',
                    meta: {
                      type: 'bqc',
                      name: '半全场'
                    }
                  },
                  {
                    path: '*',
                    redirect: 'nspf'
                  }
                ]
              },
              {
                path: '*',
                redirect: 'home'
              }
            ]
          },
        ]
    })
}
