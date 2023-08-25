'use client'
import axios from 'axios';
import { useAuth } from '../../Context/Auth'
import ProductList from '../../components/ProductList'
import { useEffect } from 'react';

function ProductCategory({ params }) {
    const category = params.category
    const { setProducts } = useAuth()

    // Use o useEffect para fazer a chamada para a API quando a página for carregada
    useEffect(() => {
        if (category) {
            const path = `product/category/${category}/`;
            axios.get(`http://127.0.0.1:8000/${path}`).then((response) => {
                setProducts(response.data)
            }).catch((error) => {
                console.error('Categoria não encontrada');
            });;
        }
    }, [category]);

    // Renderize os produtos como desejar
    return (
        <div className="px-32">
            <ProductList />
        </div>
    );
}

export default ProductCategory;