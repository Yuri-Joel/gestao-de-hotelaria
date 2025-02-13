'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { Tooltip } from 'react-tooltip'
import { twMerge } from 'tailwind-merge'
import { Loading } from '../Loading/Loading'

type Tprops = React.ComponentProps<'button'> & {
  handleClick?: () => void
  handleActive: () => boolean
  isLoading?: boolean
  width?: string
  height?: string
  color?: string
  backgroundColor?: string
  border?: string
  toolTipTitle?: string
  label?: string
}

/**
 * handleClick (function?): Uma função de callback opcional que é invocada quando o botão é clicado.
 * handleActive (function): Uma função que retorna um booleano indicando se o botão deve estar ativo.
 * isLoading (boolean): Um indicador de se o botão está em estado de carregamento.
 * width (string?): A largura do botão (opcional).
 * height (string?): A altura do botão (opcional).
 * color (string?): A cor do texto do botão (opcional).
 * backgroundColor (string?): A cor de fundo do botão (opcional).
 * border (string?): O estilo da borda do botão (opcional).
 * obs: em caso de formularios, omita o handleClick, e use o onSubmit do formulario.
 */

export const Button: React.FC<Tprops> = ({
  children,
  handleClick,
  handleActive,
  isLoading,
  width,
  height,
  color,
  backgroundColor,
  border,
  toolTipTitle,
  label,
  ...props
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const { pending } = useFormStatus();
  const [toolTipId, setToolTipId] = useState<string>("");

  const memoizedHandleActive = useCallback(() => {
    return handleActive
  }, [handleActive]);

  useEffect(() => {
    setIsActive(memoizedHandleActive())
  }, [memoizedHandleActive]);

  useEffect(() => {
    setToolTipId(toolTipTitle ? formatToolTipTitle(toolTipTitle) : "");
  }, [toolTipTitle]);

  const classDefault = twMerge(
    `bg-gray-400 duration-500 text-white h-[52px] font-semibold ${isActive ? 'bg-primary' : 'bg-gray-400'} disabled:bg-gray-300 select-none`,
    props.className,
  )

  const formatToolTipTitle = (text: string) => {
    return text
      .toString() // Garante que é uma string
      .normalize('NFD') // Normaliza a string, separando acentos das letras
      .replace(/[\u0300-\u036f]/g, '') // Remove os acentos
      .toLowerCase() // Converte para minúsculas
      .trim() // Remove espaços no início e fim
      .replace(/[^a-z0-9 -]/g, '') // Remove caracteres especiais
      .replace(/\s+/g, '-') // Substitui espaços por traços
      .replace(/-+/g, '-'); // Remove traços repetidos
  }

  const handleBlurClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Remove o foco do botão
    e.currentTarget.blur();

    // Executa o handleClick
    if (handleClick) {
      handleClick();
    }
  };

  return (
    <>
      <button
        {...props}
        data-tooltip-id={toolTipId}
        data-tooltip-content={toolTipTitle}
        style={{ width, height, color, backgroundColor, border }}
        className={classDefault}
        disabled={pending || isLoading || !isActive}
        onClick={handleBlurClick}
      >
        {!label && !isLoading && !pending && children}

        {!children && !isLoading && !pending && label}

        {handleActive() && isLoading && (
          <Loading
            className={`${!isActive ? 'border-primary' : 'border-white'}`}
          />
        )}

        {handleActive() && pending && (
          <Loading
            className={`${!isActive ? 'border-primary' : 'border-white'}`}
          />
        )}
      </button>

      {toolTipTitle && <Tooltip id={toolTipId} />}
    </>
  )
}
