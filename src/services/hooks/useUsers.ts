import { useQuery } from 'react-query'
import { api } from '../api'
import { dataUsersProps } from '../../pages/users/index'

type UserProps = {
  id: string
  name: string
  email: string
  createdAt: string
}

type GetUserResponse = {
  users: UserProps[]
  totalCount: number
}

export async function getUsers(page: number): Promise<GetUserResponse> {
  const { data, headers } = await api.get('users', {
    params: {
      page
    }
  })

  const totalCount = Number(headers['x-total-counts'])

  const users = data.users.map((user: dataUsersProps) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
  })
  return { users, totalCount }
} // Nós separamos a função que faz requisição dos dados(getUsers), da que faz conexão com o React Query(useUsers)

export function useUsers(page: number) {
  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10 // 10 minutes
  })
}

// O que nós fizemos aqui foi criar um hook para não deixar a página users com muito código.

// Paginação

// O "() => getUsers(page)" faz as mudanças dos dados da lista na hora que nós clicamos no butão da páginação, mas com o react query só isso não basta, não está mudando a página. Isso porque o React Query verifica a chave 'users' que para cada página está sendo a mesma chave, então ele só usa essa chave e pega os dados que estão no cache desta chave.
// O que precisamos fazer é tbm passar um parâmetro para essa chave.
