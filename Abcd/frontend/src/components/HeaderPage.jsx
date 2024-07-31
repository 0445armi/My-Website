import React, { useState } from 'react';
import Header from './Header';
import Product from './Product';

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
