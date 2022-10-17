import { Flex, SimpleGrid, Box, Text, theme } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { ApexOptions } from 'apexcharts'
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false }) // dynamic é usado para carregar um componente de forma dinâmica. Ex: carregar um componente só quando clicar em um botão

const options: ApexOptions = {
  chart: {
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    },
    foreColor: theme.colors.gray[500]
  },
  grid: {
    show: false
  },
  dataLabels: {
    enabled: false
  },
  tooltip: {
    enabled: false
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[600]
    },
    axisTicks: {
      color: theme.colors.gray[600]
    },
    categories: [
      '2022-10-03T00:00:00.000Z',
      '2022-10-04T00:00:00.000Z',
      '2022-10-05T00:00:00.000Z',
      '2022-10-06T00:00:00.000Z',
      '2022-10-07T00:00:00.000Z',
      '2022-10-08T00:00:00.000Z',
      '2022-10-09T00:00:00.000Z'
    ] // São as datas
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3
    }
  }
}

const series = [{ name: 'series1', data: [31, 120, 10, 28, 51, 18, 109] }]

export default function Dashboard() {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <SimpleGrid flex="1" gap="4" minChildWidth="320px">
          <Box p={['6', '8']} bg="gray.800" borderRadius={8} pb="4">
            <Text fontSize="lg" mb="4">
              Inscrito da semana
            </Text>
            <Chart options={options} series={series} type="area" height={160} />
          </Box>

          <Box p={['6', '8']} bg="gray.800" borderRadius={8} pb="4">
            <Text fontSize="lg" mb="4">
              Taxa de abertura
            </Text>
            <Chart options={options} series={series} type="area" height={160} />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  )
}

// SimpleGrid - Ele é um Grid simples
// flex com valor 1 - Vai fazer ele ocupar o espaço que sobrar da sidebar.
// minChildWidth - Quando um elemento do grid estiver abaixo da medida estipulada ele é quebra o grid automaticamente.
// ou seja ele não fica na mesma linha, isso vai dar responsividade.