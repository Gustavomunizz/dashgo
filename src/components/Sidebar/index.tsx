import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useBreakpointValue
} from '@chakra-ui/react'
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext'
import { SidebarNav } from './SidebarNav'

export function Sidebar() {
  const { isOpen, onClose } = useSidebarDrawer()

  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false
  })

  if (isDrawerSidebar) {
    return (
      <Drawer isOpen={isOpen} placement="left" onClose={() => {}}>
        <DrawerOverlay>
          <DrawerContent bg="gray.800" p="4">
            <DrawerCloseButton mt="6" onClick={onClose} />
            <DrawerHeader>Navegação</DrawerHeader>

            <DrawerBody>
              <SidebarNav />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    )
  }
  return (
    <Box as="aside" w="64" mr="8">
      <SidebarNav />
    </Box>
  )
}

// O que estamos fazendo aqui é uma Drawer Sidebar, é tipo um modal, so que ela vai vim do lado e fica por cima
// de parte do conteudo. A lógica é assim, quando é base o Drawer vai aparecer, quando é lg vai ser a sidebar.
// O legal do chakra é que ele tem varias tags para nos auxiliar a fazer o Drawer.
// Mas para abrir esse Drawer nós vamos ter um button hamburguer no Header, então nós vamos precisar de um contexto para
// abrir o nosso Drawer.
