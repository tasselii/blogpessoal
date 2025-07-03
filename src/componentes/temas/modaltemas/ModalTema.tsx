import React from 'react'
import Popup from 'reactjs-popup';
import FormTema from '../formtema/FormTema';

function ModalTema() {
  return (
    <>
            <Popup
                trigger={
                    <button 
                        className='border rounded px-4 py-2 hover:bg-blue-100 hover:text-indigo-800'>
                        Novo Tema
                    </button>
                }
                modal
            >
                <FormTema />
            </Popup>
        </>
    );
}

export default ModalTema