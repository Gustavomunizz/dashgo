import { createServer, Factory, Model, Response } from 'miragejs'
import faker from 'faker'

type UserProps = {
  name: string
  email: string
  created_at: string
}

export function makeServer() {
  const server = createServer({
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
