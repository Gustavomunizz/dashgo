import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from '@chakra-ui/react'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'
import { Input } from '../../components/Form/Input'
import Link from 'next/link'
import { useMutation } from 'react-query'
import { api } from '../../services/api'
import { queryClient } from '../../services/queryClient'
import { useRouter } from 'next/router'

type createUserFormData = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório!'),
  email: yup.string().required('E-mail obrigatório!').email('E-mail inválido!'),
  password: yup.string().required('Senha obrigatoria!').min(6, 'No minino 6 caracteres'),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais')
})

export default function CreateUser() {
  const router = useRouter()
  const createUser = useMutation(
    async (user: createUserFormData) => {
      const response = await api.post('users', {
        user: {
          ...user,
          created_at: new Date()
        }
      })
      return response.data.user
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users')
      }
    }
  )

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema)
  })

  const handleCreateUser: SubmitHandler<createUserFormData> = async data => {
    await createUser.mutateAsync(data)

    router.push('/users')
  }

  const { errors } = formState

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={['6', '8']}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">
            Criar usuário
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input
                type="text"
                label="Nome Completo"
                autoComplete="on"
                error={errors.name}
                {...register('name')}
              />
              <Input
                type="email"
                label="E-mail"
                autoComplete="on"
                error={errors.email}
                {...register('email')}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input
                type="password"
                label="Senha"
                autoComplete="on"
                error={errors.password}
                {...register('password')}
              />
              <Input
                type="password"
                label="Confirmação da senha"
                autoComplete="on"
                error={errors.password_confirmation}
                {...register('password_confirmation')}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button type="submit" colorScheme="pink" isLoading={formState.isSubmitting}>
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}

//Divider -> Ele é uma linha que divide dois conteúdos
// VStack -> Ele é a mesma coisa que o Stack, mas o V é de vertical
// SimpleGrid -> É um display grid com umas funcionalidades responsivas prontas.
// Quando a tela diminui demais os itens do grid ficam um debaixo do outro

//                              React Query Mutations

// Mutations -> Quando não estamos fazendo uma chamada de busca de dados na API, quando é busca se chama query, mutations é quando nós fazemos uma chamada para criar, alterar ou deletar dados dentro API.
// Para fazer as mutations com o react-query nós usamos o hook useMutation e nele nós passamos a função assincrona que vai cadastrar, alterar ou deletar o usuário
// useMutation X tradicional -> fazendo as chamadas a API pelo useMutation nós conseguimos manipular/controlar os estados da chamada, como se teve sucesso(isSucessed), em loading(isLoading), pausa(isPaused), com erro e etc
