"use client"
import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';
import Select from '@/components/Input/Select';
import { usePropertyStore } from '@/store/propetyAcordionStorage';
import React from 'react';

const Propriedade: React.FC = () => {
  const categoryItems = [
    "Hotel",
    "Pousada",
    "Hostel",
    "Outro",
  ];

  const {
    name,
    category,
    step,
    setName,
    setCategory,
    nextStep,
    resetStore
  } = usePropertyStore();

  return (
    <div className='flex items-center justify-center'>
      {step === 'first' && (
        <div className='mt-10 w-[600px] bg-white shadow-xl flex flex-col p-10'>
          <h1 className='font-bold text-xl'>Vamos cadastrar a sua propriedade?</h1>
          <span className='text-sm'>Informe o nome da sua propriedade e em seguida, o tipo.</span>
          
          <Input
            type="text"
            placeholder='Insira o nome'
            value={name}
            handleValue={(e) => setName(e.target.value)}
            className='mt-6 w-full h-10 p-2 outline-none border rounded-sm text-black'
          />
          
          <Select
            name="category"
            className='cursor-pointer mt-2 w-full h-10 p-2 outline-none border rounded-sm'
            placeholder="Selecione uma categoria"
            data={categoryItems}
            selectedItem={category}
            setSelected={(e) => setCategory(e)}
          />
          
          <Button
            handleActive={() => true}
            handleClick={() => nextStep()}
            disabled={!name || !category}
            className='mt-6 w-full h-10 p-2 outline-none border rounded-md text-white bg-[#2408C0] disabled:opacity-50'
          >
            Cadastrar
          </Button>
        </div>
      )}

      {step === 'second' && (
        <div className='mt-10 w-[600px] bg-white shadow-xl flex flex-col p-10'>
          <h1 className='font-bold text-xl'>Confirme os dados da sua propriedade</h1>
          <span className='text-sm'>Verifique as informações antes de continuar.</span>
          
          <span className='mt-6 w-full bg-gray-50 h-10 p-2 outline-none border rounded-sm text-black'>
            {name}
          </span>
          
          <span className='mt-6 w-full bg-gray-50 h-10 p-2 outline-none border rounded-sm text-black'>
            {category}
          </span>
          
          <Button
            handleActive={() => true}
            handleClick={() => nextStep()}
            className='mt-6 w-full h-10 p-2 outline-none border rounded-md text-white bg-[#2408C0]'
          >
            Confirmar
          </Button>
        </div>
      )}

      {step === 'validation' && (
        <div className='mt-10 w-[600px] bg-white shadow-xl flex flex-col p-10'>
          <h1 className='font-bold text-xl'>Resultado do Cadastro</h1>
          
          {!name ? (
            <h1 className='w-full text-center font-bold text-2xl text-red-500'>
              Não foi possível cadastrar a propriedade
            </h1>
          ) : (
            <>
              <h1 className='w-full text-center font-bold text-2xl text-green-500'>
                Cadastro Concluído
              </h1>
              <span className='mt-6 w-full h-10 p-2 outline-none border rounded-sm text-black'>
                Nome: {name}
              </span>
              <span className='mt-6 w-full h-10 p-2 outline-none border rounded-sm text-black'>
                Categoria: {category}
              </span>
            </>
          )}

          <Button
            handleActive={() => true}
            handleClick={() => resetStore()}
            className='mt-6 w-full h-10 p-2 outline-none border rounded-md text-white bg-[#2408C0]'
          >
            OK
          </Button>
        </div>
      )}
    </div>
  );
}

export default Propriedade;