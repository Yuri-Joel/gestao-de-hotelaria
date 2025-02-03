"use client"
import React, { useState } from 'react';

const Propriedade: React.FC = () => {
    const [selected , setSeletedTipo] =useState("pousada");
    const [name , setName] =useState("");
    const [first , setFirst] =useState(true);
    const [second , setSecond] =useState(false);
    const [validation , setValidation] =useState(false);

    

    
    
    return (
        <div className='flex items-center justify-center h-full  w-full bg-gray-50 '>
            {
                first &&(
            <div className=' mt-10  w-[600px] bg-white shadow-xl flex flex-col p-10'>
                <h1 className='font-bold text-xl'>Vamos cadastrar a sua propriedade?</h1>
                <span className='text-sm'>Informe o nome da sua propriedade e em seguida, o tipo.</span>
                <input 
                type="text"
                name="" 
                value={name}
                onChange={(e)=> setName(e.target.value)}
                placeholder="Insira o nome"
                className='mt-6 w-full h-10 p-2 outline-none border rounded-sm text-black '
                 />
                
                <select className=" cursor-pointer mt-2 w-full h-10 p-2 outline-none border rounded-sm">
                <option  onClick={()=>{ setSeletedTipo("hotel")}} className={` cursor-pointer mt-2 w-full h-10 p-2 outline-none border rounded-sm ${ selected == "hotel" ? "bg-gray-500" : ""  } `} >Hotel</option>
                <option  onClick={()=>{ setSeletedTipo("pousada")}} className={` cursor-pointer mt-2 w-full h-10 p-2 outline-none border rounded-sm ${ selected == "pousada" ? "bg-gray-500" : ""  } `} >Pousada</option>
                <option  onClick={()=>{ setSeletedTipo("hostel")}} className={` cursor-pointer mt-2 w-full h-10 p-2 outline-none border rounded-sm ${ selected == "hostel" ? "bg-gray-500" : ""  } `} >Hostel</option>
                </select>
                <button
                
                onClick={ ()=> {

                    alert("nome:" + name +" Tipo:" + selected );
                    setFirst(false);
                    setSecond(true)
                }

                }
                className='mt-6 w-full h-10 p-2 outline-none border rounded-md text-white bg-[#2408C0] '
                >
                    Cadastrar
                </button>

            </div> )
            }


            {/* aqui inicia o segundo item onde ele vê o nome e o tipo escolhido   */}
            {
                second && (
                    <div className=' mt-10  w-[600px] bg-white shadow-xl flex flex-col p-10'>
                    <h1 className='font-bold text-xl'>Vamos cadastrar a sua propriedade?</h1>
                    <span className='text-sm'>Informe o nome da sua propriedade e em seguida, o tipo.</span>
                    <input 
                    type="text"
                    name="" 
                    disabled
                    value={name}
                    placeholder="Insira o nome"
                    className='mt-6 w-full h-10 p-2 outline-none border rounded-sm text-black '
                     />
                    <input 
                    type="text"
                    name="" 
                    disabled
                    value={selected}
                    placeholder="Insira o tipo"
                    className='mt-6 w-full h-10 p-2 outline-none border rounded-sm text-black '
                     />
    
                   
                    <button
                    onClick={ ()=> {
                        setFirst(false);
                        setSecond(false);
                        setValidation(true);
                     }
    
                    }
                    className='mt-6 w-full h-10 p-2 outline-none border rounded-md text-white bg-[#2408C0] '
                    >
                        Cadastrar
                    </button>
    
                </div>
                )
            }

            {/* aqui indica se está errado ou certo   */}
            {
                validation && (
                    <div className=' mt-10  w-[600px] bg-white shadow-xl flex flex-col p-10'>
                    <h1 className='font-bold text-xl'>Vamos cadastrar a sua propriedade?</h1>
                    <span className='text-sm'>Informe o nome da sua propriedade e em seguida, o tipo.</span>
                    {
                        !name ? 
                            <h1 className='w-full text-center font-bold text-2xl text-red-500'>Não possível cadastrar a sua propriedade</h1>

                        
                    : <>
                      <h1 className='w-full text-center font-bold text-2xl text-green-500'>Cadastro Concluído</h1>
                    <input 
                    type="text"
                    name="" 
                    disabled
                    value={name}
                    placeholder="Insira o nome"
                    className='mt-6 w-full h-10 p-2 outline-none border rounded-sm text-black '
                     />
                    <input 
                    type="text"
                    name="" 
                    disabled
                    value={selected}
                    placeholder="Insira o tipo"
                    className='mt-6 w-full h-10 p-2 outline-none border rounded-sm text-black '
                     />
                    </>}
    
                   
                    <button
                    onClick={ function () {
                                if (!name) {
                                    setFirst(true);
                                    setValidation(false);
                                }else{
                                    setFirst(true)
                                    setValidation(false);
                                }

                            }}
                    className='mt-6 w-full h-10 p-2 outline-none border rounded-md text-white bg-[#2408C0] '
                    >
                        OK
                    </button>
    
                </div>
                )
            }


        
        </div>
    );
}

export default Propriedade;