'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { MOCK_PRODUCTS, MOCK_USER } from '@/data/mock';
import ProductCard from '@/components/products/ProductCard';
import styles from './page.module.css';

const ProductListPage = () => {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'ALL';
  
  const [category, setCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('popular');

  const categories = [
    { id: 'ALL', name: '전체' },
    { id: 'SKIN', name: '스킨케어' },
    { id: 'BODY', name: '바디케어' },
    { id: 'HAIR', name: '헤어케어' },
    { id: 'OTHER', name: '기타' },
  ];

  const filteredProducts = MOCK_PRODUCTS.filter(p => 
    category === 'ALL' || p.category === category
  ).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0; // 'popular'
  });

  return (
    <div className={`${styles.container} container`}>
      <h1 className={styles.title}>Products</h1>
      
      <div className={styles.filters}>
        <div className={styles.categoryTabs}>
          {categories.map(cat => (
            <button 
              key={cat.id}
              className={`${styles.tab} ${category === cat.id ? styles.activeTab : ''}`}
              onClick={() => setCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>
        
        <div className={styles.sortOptions}>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={styles.select}>
            <option value="popular">인기순</option>
            <option value="price-low">낮은 가격순</option>
            <option value="price-high">높은 가격순</option>
          </select>
        </div>
      </div>

      <div className={styles.productGrid}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} userGrade={MOCK_USER.grade} />
          ))
        ) : (
          <div className={styles.empty}>
            <p>해당 카테고리에 상품이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
