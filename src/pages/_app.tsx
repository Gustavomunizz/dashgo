import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext'
import { makeServer } from '../services/mirage/Index'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '../services/queryClient'
import { ReactQueryDevtools } from 'react-query/devtools'

if (process.env.NODE_ENV === 'development') {
  makeServer()
  //Isso está inicializando o miragejs, basicamente está dizendo que se estiver em desenvolvimento para criar um server no miragejs
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <SidebarDrawerProvider>
          <Component {...pageProps} />
        </SidebarDrawerProvider>
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default MyApp

// QueryClientProvider -> Ele é o provider do React-query, ele recebe um client que é a função QueryClient inicializada.

// ReactQueryDevtools -> Ele é literalmente um devtools, sua função é observar as query que foram feitas e por ele conseguimos fazer algumas manipulações para testar nossa aplicação na questão do cache, como por exemplo carregamentos.
// Actions
// -Refetch -> Ele refaz os dados, no caso da nossa lista ele recarregou ela, ele só não tirou os dados da tela porque os dados continuam em tela mesmo dando refetch
// -Reset -> Ele limpa os dados e começa a recarregar os dados na tela denovo, na nossa lista vai aparecer aquele spinning de carregamento.
// -Remove -> Ele vai tirar totalmente os dados que estão no cache, então se irmos em outra página e voltarmos na nossa lista, a tabela vai recarregar novamente.

// States do ReactQueryDevtools

// Obs: Esses estados não são os mesmo do React useState.

// -Stale -> Significa obsoleto, isso significa que da próxima vez que o usuário der foco nessa tela ou precisar carregar os dados novamente o React Query precisa ir na API buscar novamente os dados
// -Fetching -> Significa que está em processo de carregamento.
// -Fresh -> Significa que um dado está fresco, ele está recente, eu não preciso recarregar esses dados dentro de um certo periodo

// Obs: O React Query por padrão, assim que ele nós fazemos uma chamada a API, quando chega os dados o React Query automaticamente já assumi o estado de que os dados estão stale(obsoleto).
// Nós podemos configurar isso dentro do useQuery() passando staleTime nele nós colocamos o tempo em milissegundos, exemplo coloquei 5s então os dados vão estar no estado Fresh por 5s depois ele passa para Stale.
