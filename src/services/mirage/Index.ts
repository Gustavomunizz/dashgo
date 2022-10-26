import { ActiveModelSerializer, createServer, Factory, Model, Response } from 'miragejs'
import faker from 'faker'

type UserProps = {
  name: string
  email: string
  created_at: string
}

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer
    },

    models: {
      user: Model.extend<Partial<UserProps>>({})
    },

    factories: {
      user: Factory.extend({
        name(i: number) {
          return `User ${i + 1}`
        },

        email() {
          return faker.internet.email().toLocaleLowerCase()
        },

        createdAt() {
          return faker.date.recent(10)
        }
      })
    },

    seeds(server) {
      server.createList('user', 200)
    },

    routes() {
      this.namespace = 'api' // Essa vai ser a rota da nossa api

      this.timing = 750 // Issa vai fazer com que todas as requisições durem 750ms, isso serve para nós testarmos os loadings da nossa aplicação.

      this.get('/users', function (schema, request): any {
        const { page = 1, per_page = 10 } = request.queryParams
        const total = schema.all('user').length

        const pageStart = (Number(page) - 1) * Number(per_page)
        const pageEnd = pageStart + Number(per_page)

        const users = this.serialize(schema.all('user')).users.slice(pageStart, pageEnd)

        return new Response(200, { 'x-total-counts': String(total) }, { users })
      })

      this.get('/users/:id')
      this.post('/users')

      this.namespace = '' // O que estou fazendo aqui é resetar o nome da nossa rota, depois que o GET e POST forem feitos, isso porque no Next as API Routes tbm tem a o nome de rota como api, e isso pode atrapalhar.
      this.passthrough() // Isso faz com que todas as chamadas que forem enviadas para o endereço 'api' e não forem detectadas pelas rotas do miragejs passem adiante para suas rotas originais
    }
  })
  return server
}

// this.get -> Com isso ele está criado de forma automatizada uma rota, isso no mirage se chama shorthand nós nem precisamos passar a lista de usuários para ele.
// Essa função que estamos passando para ele está fazendo a paginação, ao invés de retornar 200 usuários, vai retornar de 10 em 10 dependendo da página.

// Factories e seeds -> Eles criam dados ficticios para quando a página for carrega já ter os dados.

// Serializers -> Ele mostra ao mirage como ele deve interpretar os dados que são enviados por ele.
// Exemplo: Nós temos o user, mas imagina que nós vamos ter address tbm, e ele ta relacionado com o users. Ai para fazer o cadastro nos fariamos nós pegariamos do user o nome, email e etc..., mas vai que no futuro nós queiramos colocar as informações do address junto com users, normalmente como é um relacionamento entre as tabelas, nós referenciariamos o id do address no users, mas isso faria com que ocorre-se 2 chamadas a API (A primeiro para cadastrar o endereço e a segundo o usuário).
// Para resolver isso, tem como dizer ao mirage que nós estamos usando um padrão de escrita de API, que nós conseguimos cadastrar essas chamadas ao mesmo tempo.
// O padrão que vamos usar é o Active Model, ele envia os dados, relacionamentos tudo numa requisição só, ele serve tanto para envios quanto para recebimentos. Ele é oo padrão mais comum para API's
