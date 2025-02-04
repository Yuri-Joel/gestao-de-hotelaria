/* eslint-disable @typescript-eslint/no-explicit-any */
import { IInput } from '@/types/Input/InputType'
import React, { ChangeEvent } from 'react'
import { twMerge } from 'tailwind-merge'
import { Loading } from '../Loading/Loading'
import { formatCEP } from '@/helpers/formatCEP'
import { formatCardCredit } from '@/helpers/formatCardCredit'

/**
 * label (string): O rótulo para o campo de entrada.
 * placeholder (string): O texto placeholder para o campo de entrada.
 * type (string): O tipo do campo de entrada (por exemplo, "text", "password").
 * IconLeft (React.ComponentType): Um componente React a ser exibido como ícone no lado esquerdo do campo de entrada.
 * isSelected (boolean): Um indicador que mostra se o campo de entrada está selecionado.
 * isDisabled (boolean): Um indicador que mostra se o campo de entrada está desabilitado. O padrão é false.
 * arrayType (string): O tipo de itens na matriz, usado para determinar como exibir sugestões. (adicione novos tipos caso necessite)
 * array (Array<GuestEntity>): Uma matriz de itens a serem exibidos como sugestões.
 * callback (function): Uma função de callback a ser invocada quando um item da matriz é selecionado.
 * handleSelected (function): Uma função para manipular o evento de seleção do campo de entrada.
 * handleBlur (function): Uma função para manipular o evento de perder o foco do campo de entrada.
 * handleValue (function): Uma função para manipular a alteração do valor do campo de entrada.
 * togglePasswordVisibility (function): Uma função para alternar a visibilidade do campo de entrada de senha.
 * value (string): O valor atual do campo de entrada.
 * IconRight (React.ComponentType): Um componente React a ser exibido como ícone no lado direito do campo de entrada, geralmente usado para alternar a visibilidade da senha.
 */

export const Input: React.FC<IInput> = ({
  label,
  type,
  IconLeft,
  isSelected,
  isDate = false,
  isCellPhone = false,
  isDocument = false,
  isCardCredit = false,
  isNumber = false,
  isCEP = false,
  isTime = false,
  arrayType,
  array,
  callback,
  handleSelected,
  handleBlur,
  handleValue,
  togglePasswordVisibility,
  value,
  IconRight,
  iconLeftTopPosition,
  inputCheckedFocusDisable,
  arrayLoading,
  ...props
}) => {
  function handleSelecItemArray(
    item: any,
  ) {
    if (callback) {
      // console.log(item);
      callback(item);
    }
  }

  const formatDateString = (dateString: string) => {
    // Remove todos os caracteres não numéricos
    const cleaned = dateString.replace(/\D+/g, '');
    const match = cleaned.match(/(\d{0,2})(\d{0,2})(\d{0,4})/);

    if (match) {
      let day = match[1];
      let month = match[2];
      let year = match[3];

      // Validação do dia (1 a 31)
      if (day) {
        const dayNum = parseInt(day, 10);
        if (day.length === 2) {
          if (dayNum < 1) {
            day = '01'; // Invalida o dia fora do intervalo
          }
          if (dayNum > 31) {
            day = '31'; // Limita a 31
          }
        }
      }

      // Validação do mês (1 a 12)
      if (month) {
        const monthNum = parseInt(month, 10);
        if (month.length === 2) {
          if (monthNum < 1) {
            month = "01"
          } if (monthNum > 12) {
            month = '12';
          }
        }
      }

      // Validação do ano (1910 a 2100)
      if (year) {
        const yearNum = parseInt(year, 10);
        if (year.length === 4) {
          if (yearNum < 1910 || yearNum > 2100) {
            year = ''; // Invalida o ano fora do intervalo
          }
        }
      }

      // Formata a data no formato "DD-MM-YYYY" e remove partes vazias
      return [day, month, year].filter(Boolean).join('/');
    }

    return dateString;
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedDate = formatDateString(e.target.value);
    handleValue?.({
      ...e,
      target: {
        ...e.target,
        name: e.target.name,
        value: formattedDate,
      },
    })
  }

  const formatPhoneNumber = (phoneString: string) => {
    let cleaned = phoneString.replace(/\D+/g, '')

    // Limita o número de dígitos a 11 (2 para DDD, 5 para o número, e 4 para os últimos dígitos)
    cleaned = cleaned.slice(0, 11)

    // Captura o DDD (0 a 2 dígitos), o primeiro bloco de números (0 a 5 dígitos) e o segundo bloco (4 dígitos)
    const match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/)
    if (match) {
      let formatted = ''
      if (match[1]) {
        formatted += `(${match[1]}`
      }
      if (match[2]) {
        formatted += `) ${match[2]}`
      }
      if (match[3]) {
        formatted += `-${match[3]}`
      }
      return formatted
    }
    return phoneString
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneNumber(e.target.value)
    handleValue?.({
      ...e,
      target: {
        ...e.target,
        name: e.target.name,
        value: formattedPhone,
      },
    })
  }

  const formatCpfOrCnpj = (inputString: string) => {
    const cleaned = inputString.replace(/\D/g, '') // Remove todos os caracteres não numéricos

    if (cleaned.length <= 11) {
      return cleaned
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else {
      // Formata como CNPJ
      const match = cleaned.match(
        /^(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})$/,
      )
      if (match) {
        let formatted = ''
        if (match[1]) formatted += match[1]
        if (match[2]) formatted += '.' + match[2]
        if (match[3]) formatted += '.' + match[3]
        if (match[4]) formatted += '/' + match[4]
        if (match[5]) formatted += '-' + match[5]
        return formatted.replace(/\.*$/, '').replace(/-*$/, '')
      }
    }

    return cleaned // Retorna apenas os números limpos se nenhuma correspondência for encontrada
  }

  const handleCpfOrCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCpfOrCnpj(e.target.value)

    if (e.target.value.length > 18) {
      return
    }

    handleValue?.({
      ...e,
      target: {
        ...e.target,
        name: e.target.name,
        value: formattedValue,
      },
    })
  }

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCEP(e.target.value)

    if (e.target.value.length > 9) {
      return
    }

    handleValue?.({
      ...e,
      target: {
        ...e.target,
        name: e.target.name,
        value: formattedValue,
      },
    })
  }

  const handleCardCreditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardCredit(e.target.value)

    if (e.target.value.length > 19) {
      return
    }

    handleValue?.({
      ...e,
      target: {
        ...e.target,
        name: e.target.name,
        value: formattedValue,
      },
    })
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/\D/g, '');

    handleValue?.({
      ...e,
      target: {
        ...e.target,
        name: e.target.name,
        value: cleaned,
      },
    })
  }

  const formatTime = (inputString: string) => {
    // Remove todos os caracteres não numéricos
    const cleaned = inputString.replace(/\D+/g, '');

    // Limita o comprimento a no máximo 4 caracteres
    const limited = cleaned.slice(0, 4);

    // Se o comprimento for menor que 2, retorne apenas os números digitados
    if (limited.length <= 2) {
      return limited;
    }

    // Formata a hora como hh:mm para 3 ou 4 caracteres
    const match = limited.match(/^(\d{2})(\d{0,2})$/);

    if (match) {
      let hours = match[1];
      let minutes = match[2] || '';

      // Valida que horas estão entre 00 e 23
      if (parseInt(hours, 10) > 23) {
        hours = '23';
      }

      // Valida que minutos estão entre 00 e 59
      if (parseInt(minutes, 10) > 59) {
        minutes = '59';
      }

      return `${hours}:${minutes}`;
    }

    return inputString;
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = formatTime(e.target.value)

    handleValue?.({
      ...e,
      target: {
        ...e.target,
        name: e.target.name,
        value: cleaned,
      },
    })
  }
  function handleOnChange(ev: ChangeEvent<HTMLInputElement>) {
    if (isDate) {
      return handleDateChange(ev)
    } else if (isCellPhone) {
      return handlePhoneChange(ev)
    } else if (isDocument) {
      return handleCpfOrCnpjChange(ev)
    } else if (isCardCredit) {
      return handleCardCreditChange(ev)
    } else if (isNumber) {
      return handleNumberChange(ev)
    } else if (isCEP) {
      return handleCepChange(ev)
    } else if (isTime) {
      return handleTimeChange(ev)
    }

    return handleValue(ev)
  }

  return (
    <>
      <div className="relative bg-white w-full flex">
        <label
          className={`absolute duration-75  px-2 text-sm ${isSelected
            ? '-top-3 left-4 bg-white z-50 text-primary'
            : 'top-[18.5px] left-10 bg-transparent text-gray-500'
            }`}
        >
          {label}
        </label>
        <div
          className={`absolute z-40 ${iconLeftTopPosition ? iconLeftTopPosition : 'top-[15px]'} left-2`}
        >
          {IconLeft && <IconLeft />}
        </div>
        <input
          {...props}
          onSelect={handleSelected}
          onChange={handleOnChange}
          onBlur={handleBlur}
          type={type}
          className={twMerge(
            `bg-gray-50 px-2 appearance-none outline-none h-14 w-full text-black rounded-lg border focus:border-primary ${(!props.disabled && value) && !inputCheckedFocusDisable ? 'border-primary' : ''} `,
            IconLeft && "pl-[38px]",
            props.className,
            props.disabled && ' bg-gray-100 pointer-events-none',
          )}
          value={value || ''}
        />
        <div
          className="absolute z-40 top-5 right-3 cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {type === 'password' && IconRight && <IconRight />}
        </div>
      </div>

      {arrayType === 'guest' &&
        typeof value === 'string' &&
        value.length > 0 &&
        Array.isArray(array) && (
          <div className={`border mt-1 bg-white rounded-md max-h-[200px] overflow-hidden ${array.length > 4 ? 'overflow-y-scroll' : ''}`}>
            {arrayLoading ?
              <div className="py-2.5">
                <Loading className="border-primary" />
              </div> : array.length === 0 ?
                <div className="p-2">
                  <span className="text-black">Nenhum resultado encontrado</span>
                </div>
                :
                array &&
                array.map((item, itemkey) => (
                  <div
                    key={itemkey}
                    className="hover:bg-primary-300 p-2 cursor-pointer flex gap-1"
                    onClick={() => handleSelecItemArray(item)}
                  >
                    <p className="font-bold text-sm text-gray-600">
                      {item.guestInformation.name}
                    </p>{' '}
                    {(item.guestInformation.name) && (
                      '|'
                    )}
                    <p className="font-medium text-sm text-gray-600">
                      {item.guestInformation.cpf}
                    </p>
                  </div>
                ))}
          </div>
        )}
    </>
  )
}
