import React, { useState } from 'react';
import Header from './header';
import Product from './product';

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
