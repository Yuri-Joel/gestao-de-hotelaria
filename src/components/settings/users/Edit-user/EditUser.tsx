'use client'
import React, { useState } from 'react'
import { Button } from '@/components/Button/Button'
import { Input } from '@/components/Input/Input'
import { XIcon } from '@/assets/Icons/XIcon'
import { twMerge } from 'tailwind-merge'
import Select from '@/components/Input/Select'
import AlertDialog from '@/components/AlertDialog/AlertDialog'
import { userStore } from "@/store/userStore"
import { parseCookie } from '@/helpers/cookies/authCookie'

const AddUser: React.FC = () => {
  const { account } = parseCookie();
  const { AddUserModal, setAddUserModal } = userStore()
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    properties: [] as string[],
    account: account
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePropertyChange = (selectedProperty: string) => {
    setFormData(prev => ({
      ...prev,
      properties: [...prev.properties, selectedProperty]
    }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)
    try {
      const newUser = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        properties: formData.properties,
        account: formData.account
      }
      console.log('Submitting user:', newUser)
      await new Promise(resolve => setTimeout(resolve, 1000))
      setAddUserModal(false)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleConfirmCancel = () => {
    setIsAlertDialogOpen(false)
    setAddUserModal(false)
  }

  const handleRemoveProperty = (propertyToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      properties: prev.properties.filter(p => p !== propertyToRemove)
    }))
  }

  return (
    <>
      {AddUserModal && (
        <div>
          <div
            className={`fixed left-0 top-0 right-0 bottom-0 overflow-hidden flex items-center justify-center bg-black/25 z-50 ${
              'h-full' 
            }`}
          >
            <div
              className={twMerge(
                'w-full md:max-w-[400px] 2xl:max-w-[50%] min-w-[400px] sm:min-w-[550px] max-h-[calc(100vh-100px)] bg-white rounded-lg p-6 md:p-10 flex flex-col gap-6 overflow-y-auto no-scrollbar'
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 font-medium text-2xl truncate">
                    Adicionar Novo Usuário
                  </p>
                  <p className="text-xs text-gray-600">
                    Preencha os dados abaixo para adicionar um novo usuário
                  </p>
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    if (formData.firstName || formData.properties.length > 0) {
                      setIsAlertDialogOpen(true)
                    } else {
                      setAddUserModal(false)
                    }
                  }}
                >
                  <XIcon fill="#5954FB" />
                </div>
              </div>

              <div className="w-full">
                <form className="flex flex-col flex-1 gap-4" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-1 mb-4">
                    <span className="font-medium text-sm text-black">
                      Primeiro Nome
                    </span>
                    <Input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      handleValue={handleInputChange}
                      className="bg-transparent px-3 py-3 appearance-none h-14 w-full text-black text-sm rounded-lg border focus:border-primary"
                      placeholder="Insira o primeiro nome"
                    />
                  </div>

                  <div className="flex flex-col gap-1 mb-4">
                    <span className="font-medium text-sm text-black">
                      Sobrenome
                    </span>
                    <Input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      handleValue={handleInputChange}
                      className="bg-transparent px-3 py-3 appearance-none h-14 w-full text-black text-sm rounded-lg border focus:border-primary"
                      placeholder="Insira o sobrenome"
                    />
                  </div>

                  <div className="flex flex-col gap-1 mb-4">
                    <span className="font-medium text-sm text-black">
                      Email
                    </span>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      handleValue={handleInputChange}
                      className="bg-transparent px-3 py-3 appearance-none h-14 w-full text-black text-sm rounded-lg border focus:border-primary"
                      placeholder="Insira o email"
                    />
                  </div>

                  <div className="flex flex-col gap-1 mb-4">
                    <span className="font-medium text-sm text-black">
                      Senha
                    </span>
                    <Input
                      type="password"
                      name="password"
                      value={formData.password}
                      handleValue={handleInputChange}
                      className="bg-transparent px-3 py-3 appearance-none h-14 w-full text-black text-sm rounded-lg border focus:border-primary"
                      placeholder="Insira a senha"
                    />
                  </div>

                  <div className="flex flex-col gap-1 mb-4">
                    <span className="font-medium text-sm text-black">
                      Propriedades
                    </span>
                    <Select
                      name="properties"
                      placeholder="Selecione as propriedades"
                      data={["Hotel A", "Hotel B", "Hotel C"]}
                      selectedItem={formData.properties[formData.properties.length - 1] || '' as string}
                      setSelected={handlePropertyChange}
                      dropdownPositionAbsolute
                    />
                    {formData.properties.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {formData.properties.map((prop, index) => (
                          <div key={index} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                            <span className="text-sm">{prop}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveProperty(prop)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    isLoading={isLoading}
                    handleActive={() => true}
                    width="100%"
                    height="45px"
                    className="mt-4"
                  >
                    Adicionar Usuário
                  </Button>
                </form>
              </div>
            </div>
          </div>

          <AlertDialog
            typeAlert="cancel"
            title="Tem certeza que deseja cancelar?"
            description="Ao confirmar, perderá todas as alterações feitas nos campos atuais."
            confirmTitleBtn="Sim, tenho certeza"
            cancelTitleBtn="Não, quero continuar editando"
            isOpenedModalManagement={isAlertDialogOpen}
            handleConfirm={handleConfirmCancel}
            handleCancel={() => setIsAlertDialogOpen(false)}
          />
        </div>
      )}
    </>
  )
}

export default AddUser