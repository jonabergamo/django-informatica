'use client'
import React, { useEffect, useState } from 'react'
import DropDown from './DropDown'
import axios from 'axios'

export default function CategoryBar() {
    const [categorys, setCategorys] = useState()

    const getCategories = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/category/');
            return response.data; // Isto irá retornar apenas as categorias pais.
        } catch (error) {
            console.error('Erro ao buscar as categorias:', error);
            throw error;
        }
    };

    useEffect(() => {
        getCategories().then(category => setCategorys(category))
    }, [])

    return (
        <div className='py-5 px-2 flex w-screen justify-evenly'>
            {categorys && categorys.map((category) => (
                <DropDown category={category} key={category.path} />
            ))}
        </div>
    )
}
