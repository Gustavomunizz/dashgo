import { Icon, Link as ChakraLink, Text, LinkProps } from '@chakra-ui/react'
import { ElementType } from 'react'
import { ActiveLink } from '../ActiveLink'

interface NavLinkProps extends LinkProps {
  icon: ElementType
  name: string
  href: string
}

export function NavLink({ icon, name, href, ...rest }: NavLinkProps) {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink display="flex" {...rest}>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">
          {name}
        </Text>
      </ChakraLink>
    </ActiveLink>
  )
}

// Tipagem 'ElementType' é quando nós vamos passar só o nome do componente não a declaração.
// Exemplo: nome -> RiDashboardLine | declaração -> < RiDashboardLine />
// passHerf no Link -> Ele é usado quando não temos uma tag "a" dentro do Link. Quando passamos ele, ele meio que passa
// essa tag "forçadamente"
