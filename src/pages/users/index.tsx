import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  IconButton,
  Link,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useState } from 'react'
import { RiAddLine, RiPencilLine } from 'react-icons/ri'
import { Header } from '../../components/Header'
import { Pagination } from '../../components/Pagination'
import { Sidebar } from '../../components/Sidebar'
import { api } from '../../services/api'
import { useUsers } from '../../services/hooks/useUsers'
import { queryClient } from '../../services/queryClient'

export interface dataUsersProps {
  name: string
  email: string
  id: string
  createdAt: string
}

export default function UserList() {
  const [page, setPage] = useState(1)
  const { data, isLoading, isFetching, error } = useUsers(page) // Isso é um hook que foi criado

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(
      ['users', userId],
      async () => {
        const response = await api.get(`users/${userId}`)
        return response.data
      },
      { staleTime: 1000 * 60 * 10 } // 10 minutes
    )
  }

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" />}
            </Heading>

            <NextLink href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo
              </Button>
            </NextLink>
          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner></Spinner>
            </Flex>
          ) : error ? (
            <Flex>
              <Text>Falha ao obter dados dos usuários</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={['4', '6']} color="gray.300" width="8 ">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuários</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                    <Th w="8"></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.users.map((user: dataUsersProps) => {
                    return (
                      <Tr key={user.id}>
                        <Td px={['4', '6']}>
                          <Checkbox colorScheme="pink" />
                        </Td>
                        <Td>
                          <Box>
                            <Link
                              color="purple.400"
                              onMouseEnter={() => handlePrefetchUser(user.id)}
                            >
                              <Text fontWeight="bold">{user.name}</Text>
                            </Link>
                            <Text fontSize="sm" color="gray.300">
                              {user.email}
                            </Text>
                          </Box>
                        </Td>
                        {isWideVersion && <Td>{user.createdAt}</Td>}
                        <Td>
                          {isWideVersion ? (
                            <Button
                              as="a"
                              size="sm"
                              fontSize="sm"
                              colorScheme="purple"
                              leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                            >
                              Editar
                            </Button>
                          ) : (
                            <IconButton
                              aria-label="Edit"
                              colorScheme="purple"
                              icon={<Icon as={RiPencilLine} fontSize="14" />}
                            />
                          )}
                        </Td>
                      </Tr>
                    )
                  })}
                </Tbody>
              </Table>

              <Pagination
                totalCountsOfRegister={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  )
}

// Adaptar tabela para responsivo é uma coisa muito dificil, porque no final o resultado não fica muito bom
// O que podemos fazer é colocar um scroll ou uma paginação para não ficar uma tabela muito grande.

//                                  Conceitos do React Query

// useQuery -> Ele é hook que vai guardar os dados em cache no Front-end.
// Agora quando voltarmos para a lista de usuários na segunda vez ela já não vai precisar carregar mais, isso porque os dados já estão em cache.

// Porém isso não evita uma nova chamada a API, porque o react query utiliza uma estrátegia de cache chamada Stale While Revalidate (Obsoleto enquanto revalida).
// Stale While Revalidate -> Ele manda para o usuário a versão mais atual dos dados em cache, mas ele faz uma chamada a API para revalidar esses dados, se ele percebe que a versão está obsoleta, ele atualiza esses dados em tela enquanto a aplicação já está sendo exibido para o usuário. Essa é uma funcionalida que já vem por padrão no React Query

// Outra funcionalidade padrão do React Query, que é chamada de Revalidate on Focus.
// Revalidate on Focus -> Exemplo: Uma pessoa nunca dá F5 na página então ela nunca atualiza, mas sempre revisita a página, para não correr o risco de ficar com os dados obsoletos o React Query faz uma chamada a API toda vez que o usuário dá um focus na aplicação, ou seja quando ele revisita ela.

// Sinalizando o refetch: {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" />}, nós fizemos isso para quando tiver o refetch dos dados ele mostrar um spinner do lado do header só pra mostrar que está tendo um recarregamento dos dados.

//                              Prefetch de dados

// Prefetch -> Nós conseguimos deixar os dados já armazenados em cache antes mesmo de precisarmos deles.
// A lógica que vamos usar para isso é quando nós passarmos o mouse emcima do usuário ele faz uma request a API, como se fosse buscar mais detalhes do usuário, mas na vdd é só para mostrar mesmo, nós não vamos usar esses dados
