import React, { useState } from 'react';
import Header from './layout/header';
import Product from './pages/product';

const HeaderPage = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = async (term) => {
        setSearchTerm(term);
    };

    return (
        <div>
            <Header onSearch={handleSearch} />
            <Product searchTerm={searchTerm} />
        </div>
    );
}

export default HeaderPage;
