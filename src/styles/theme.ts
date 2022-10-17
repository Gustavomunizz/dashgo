import { extendTheme } from '@chakra-ui/react'

// Reaproveitando o theme padrão do chakra e substituindo o que vou precisar
// substituir
export const theme = extendTheme({
  colors: {
    gray: {
      '900': '#181B23',
      '800': '#1F2029',
      '700': '#353646',
      '600': '#4B4D63',
      '500': '#616480',
      '400': '#797D9A',
      '300': '#9699B0',
      '200': '#B3B5C6',
      '100': '#D1D2DC',
      '50': '#EEEEF2'
    }
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto'
  },
  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'gray.50'
      }
    }
  }
})

//Anotações
// bg -> significa background, no chakra nós temos "siglas" para diminuir os estilos
// No chacka nós temos tons de cores padronizados e nós vamos substituir os tons de cinza, para um que combina mais
// com a nossa aplicação
