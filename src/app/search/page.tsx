'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { MOCK_PRODUCTS, MOCK_USER } from '@/data/mock';
import ProductCard from '@/components/products/ProductCard';
import styles from './page.module.css';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const searchResults = MOCK_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) || 
    p.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={`${styles.container} container`}>
      <h1 className={styles.title}>
        &quot;{query}&quot; <span className={styles.muted}>검색 결과</span>
      </h1>
      
      <p className={styles.count}>총 {searchResults.length}개의 상품이 검색되었습니다.</p>

      <div className={styles.productGrid}>
        {searchResults.length > 0 ? (
          searchResults.map(product => (
            <ProductCard key={product.id} product={product} userGrade={MOCK_USER.grade} />
          ))
        ) : (
          <div className={styles.empty}>
            <p>검색 결과가 없습니다.</p>
            <p className={styles.subEmpty}>다른 검색어를 입력해 보세요.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
