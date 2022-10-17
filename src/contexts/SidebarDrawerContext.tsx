import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { createContext, ReactNode, useContext, useEffect } from 'react'

interface SidebarDrawerProviderProps {
  children: ReactNode
}

type SidebarDrawerContextData = UseDisclosureReturn

const SidebarDrawerContext = createContext({} as SidebarDrawerContextData)

export function SidebarDrawerProvider({ children }: SidebarDrawerProviderProps) {
  const disclosure = useDisclosure()
  const router = useRouter()

  useEffect(() => {
    disclosure.onClose()
  }, [router.asPath])

  return (
    <SidebarDrawerContext.Provider value={disclosure}>{children}</SidebarDrawerContext.Provider>
  )
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext)

// Nossa lógica sem os recursos do chakra poderia usar o useState e funções para dizer se o Drawer está aberto ou
// fechado. Mas nós vamos usar o hook do chakra, useDisclosure
// Uma coisa interessante que fizemos foi usar o useRouter e useEffect para fechar o Drawer toda vez que mudassemos de
// rota, a lógica é nós usamos o router.asPath que basicamente mostra a rota, e colocamos ela no useEffect e usamos a função onClose para fechar ela toda vez que a rota mudar.
