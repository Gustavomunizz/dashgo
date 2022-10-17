import { Avatar, Box, Flex, Text } from '@chakra-ui/react'

interface ProfileProps {
  showProfileData?: boolean
}

export function Profile({ showProfileData }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Gustavo Muniz</Text>
          <Text color="gray.300" fontSize="small">
            gustamunizmartins@gmail.com
          </Text>
        </Box>
      )}
      <Avatar size="md" name="Gustavo Muniz" src="https://github.com/Gustavomunizz.png" />
    </Flex>
  )
}

// Box - Essa tag é igual a tag "div"
// Lógica usada no showProfileData, nós usamos o operador lógico AND '&&', ele é retorna true, se os dos valores forem
// verdadeiros, se não ele retorna false, então quando showProfileData for true é quando a tela estiver no tamanho lg
// desse jeito ele vai mostrar o nome e o email.
