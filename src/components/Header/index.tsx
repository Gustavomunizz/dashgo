import { Flex, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react'
import { RiMenuLine } from 'react-icons/ri'
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext'
import { Logo } from './Logo'
import { NotificationsNav } from './NotificationsNav'
import { Profile } from './Profile'
import { SearchBox } from './SearchBox'

export function Header() {
  const { onOpen } = useSidebarDrawer()
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })
  return (
    <Flex as="header" w="100%" maxW={1400} h="20" mx="auto" mt="4" px="6" align="center">
      {!isWideVersion && (
        <IconButton
          aria-label="open navigation"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
        ></IconButton>
      )}
      <Logo />

      {isWideVersion && <SearchBox />}

      <Flex align="center" ml="auto">
        <NotificationsNav />

        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  )
}

// Hook useBreakpointValue -> Ele é um hook do chakra, ele trabalha a responsividade, ele vai variar o tamanho
// cor e etc, no nosso ele está colocando e tirando a barra de pesquisa de acordo com o tamanho, nos estamos passando
// ele para o profile pelas propriedades tbm.
