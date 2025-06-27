import { ref, reactive } from 'vue'

const currentRoute = ref(window.location.pathname || '/')
const routerHistory = ref([])

const routes = {
  '/': () => import('@/pages/initial/index.vue'),
  '/person-data': () => import('@/pages/person-data/index.vue'),
  '/access-key': () => import('@/pages/access-key/index.vue'),
  '/info-review': () => import('@/pages/info-review/index.vue')
}

const loadedComponents = reactive({})

export function useRouter() {
  const push = (path) => {
    if (path === currentRoute.value) return
    
    routerHistory.value.push(currentRoute.value)
    currentRoute.value = path
    
    window.history.pushState({}, '', path)
  }
  
  const back = () => {
    if (routerHistory.value.length > 0) {
      const previousRoute = routerHistory.value.pop()
      currentRoute.value = previousRoute
      window.history.pushState({}, '', previousRoute)
    }
  }
  
  const replace = (path) => {
    currentRoute.value = path
    window.history.replaceState({}, '', path)
  }
  
  const loadComponent = async (path) => {
    if (loadedComponents[path]) {
      return loadedComponents[path]
    }
    
    const routeLoader = routes[path]
    if (!routeLoader) {
      console.warn(`Rota não encontrada: ${path}`)
      return null
    }
    
    try {
      const module = await routeLoader()
      loadedComponents[path] = module.default
      return module.default
    } catch (error) {
      console.error(`Erro ao carregar componente da rota ${path}:`, error)
      return null
    }
  }
  
  const getCurrentComponent = () => {
    return loadComponent(currentRoute.value)
  }
  
  return {
    currentRoute,
    routerHistory,
    push,
    back,
    replace,
    loadComponent,
    getCurrentComponent
  }
}

window.addEventListener('popstate', () => {
  const router = useRouter()
  router.replace(window.location.pathname)
})
