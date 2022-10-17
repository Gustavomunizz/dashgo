import { Stack } from '@chakra-ui/react'
import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from 'react-icons/ri'
import { NavLink } from './NavLink'
import { NavSection } from './NavSection'

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GERAL">
        <Stack spacing="4" mt="8" align="stretch">
          <NavLink name="Dashboard" href="/dashboard" icon={RiDashboardLine} />

          <NavLink name="Usuários" href="/users" icon={RiContactsLine} />
        </Stack>
      </NavSection>

      <NavSection title="AUTOMAÇÃO">
        <Stack spacing="4" mt="8" align="stretch">
          <NavLink name="Formulários" href="/forms" icon={RiInputMethodLine} />

          <NavLink name="Automação" href="/automation" icon={RiGitMergeLine} />
        </Stack>
      </NavSection>
    </Stack>
  )
}
