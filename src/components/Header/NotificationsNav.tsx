import { HStack, Icon } from '@chakra-ui/react'
import { RiNotificationLine, RiUserAddLine } from 'react-icons/ri'

export function NotificationsNav() {
  return (
    <HStack
      spacing={['6', '8']}
      mx={['6', '8']}
      pr={['6', '8']}
      py="1"
      color="gray.300"
      borderRightWidth={1}
      borderColor="gray.700"
    >
      <Icon as={RiNotificationLine} fontSize="20" />
      <Icon as={RiUserAddLine} fontSize="20" />
    </HStack>
  )
}

// HStack - A tag Stack deixa os icones na vertical, esse vai deixar na horizontal.
// Icon - No Chakra UI, quando formos usar o React-icons nós colocamos o icone dentro dessa tag

//                        Deixando o Header Responsivo
// spacing={['6', '8']} -> Essa medida dentro do array mostra que quando acontecer um breakpoint ele vai reduzir
// Explicando melhor o 6 é para o mobile e o 8 e para os resto dos tamanhos.
