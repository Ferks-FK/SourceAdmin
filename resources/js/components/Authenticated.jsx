import { useUserStore } from '@/stores/user';

function Authenticated ({ children }) {
  const isAuthenticated = useUserStore(state => state.isLogged)
  console.log(isAuthenticated)

  if (isAuthenticated) {
    return <>{children}</>
  }

  return null;
}

export { Authenticated }
