import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { cloneElement, ReactElement } from 'react'

interface ActiveLinkProps extends LinkProps {
  children: ReactElement
  shouldMatchExactHref?: boolean
}

export function ActiveLink({ children, shouldMatchExactHref = false, ...rest }: ActiveLinkProps) {
  const { asPath } = useRouter()
  let isActive = false

  if (shouldMatchExactHref && (asPath === rest.href || asPath === rest.as)) {
    isActive = true
  }

  if (
    (!shouldMatchExactHref && asPath.startsWith(String(rest.href))) ||
    asPath.startsWith(String(rest.as))
  ) {
    isActive = true
  }
  return (
    <Link {...rest}>{cloneElement(children, { color: isActive ? 'pink.400' : 'gray.50' })}</Link>
  )
}

// Tipagem ReactElement -> Ela é parecida com a ReactNode, mas ela aceita somente componentes, diferente do
// ReactNode que aceita textos, números, componentes e etc
// cloneElement -> Ele é uma função do React, o que ele faz é clonar o primeiro elemento e também pode modificar ele.
// O que estamos fazendo é clonar o elemento e mudar a cor dele
