import { Flex, Button, Stack } from '@chakra-ui/react'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from '../components/Form/Input'

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatoria')
})

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  })

  const { errors } = formState

  const handleSignIn: SubmitHandler<FieldValues> = async data => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log(data)
  }

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing={4}>
          <Input
            label="E-mail"
            type="email"
            autoComplete="on"
            error={errors.email}
            {...register('email')}
          />
          <Input
            label="Senha"
            type="password"
            autoComplete="on"
            error={errors.password}
            {...register('password')}
          />
        </Stack>
        <Button
          type="submit"
          mt="6"
          colorScheme="pink"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}

//                       Anotações sobre o Chacka UI

// Chakra UI é um css declarativo, ou seja, seu CSS é escrito no HTML.
// Eles tem algumas tags prontas, como o "Flex" ele é uma div com display flex.
// Isso ajuda a encurtar, para nossa HTML não ficar muito sujo com o CSS.
// Uma das formas de não deixarmos o HTML muito sujo é componentizar nossa aplicação
// Podemos ver que alguns atributos de estilos que colocamos tbm estão encurtados.
// No Chacka UI temos uns espaçamentos proprios como aquele que coloquei no padding que é o "p"
// Quando na unidade de medida o número está em string é a medida própria
// Esse 8 não é nem pixel e nem REM, para sabermos quanto ele vale em pixel ou REM, fazemos assim.
// Para pixel multiplicamos o 8 por 4, REM dividimos o 8 por 4
// O Input e o Button que colocamos tbm é do chakra ele tem algumas estilizações já prontas
// focusBorderColor não existe no CSS ele é uma "propriedade" do chakra ele dá uma cor na borda do input quando
// ele é focado.
// Variants são as variações que podemos ter nos inputs, como borda só embaixo, que é o flushed
// Os inputs estão muito colados um no outro, nós poderiamos usar margin, mas vamos fazer de outra forma
// Para mostrar uma coisa do chakra
// Stack -> ele é usado para dar espaçamentos.

//                     Anotações sobre Formulários

// Formas de pegar um valor de dentro de um input. Nós temos duas
// Conceito de Debounce: usando um State e a função onChange para pegar o valor, cada vez que o usuário digitar uma letra ele vai fazer uma pesquisa, então se a palavra tiver 10, serão 10 buscas. Então o Debounce evita isso, a lógica por trás dele so faz a pesquisa quando o usuário para de digitar. Isso é bom em formulários que não tenham botão

// Essa primeira forma de pegar o valor do input que falamos se chama Controlled Component, basicamente são componentes que controlamos atráves de estados.

// Segunda forma Uncontrolled Components, é uma forma de nós acessarmos o valor do input somente no momento que nós precisarmos dele. Ou seja nós não armazenamos o valor do input dentro e uma variavel no estado. Dentro do React nós fazemos isso usando refs. Nós usamos o hook useRef

// Para formulários mais simples é muito mais fácil usar controlled components. Mas dessa vez vamos usar da forma do uncontrolled components, mas nós não vamo susar ref, vamos usar uma lib chamada react-hook-form

//                      Biblioteca Yup
// Ela é uma biblioteca de validação de formulários, ele vai nos ajudar a fazer validações de forma mais simples e rápida.
