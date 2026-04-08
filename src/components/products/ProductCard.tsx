import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product, UserGrade } from '@/types';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  userGrade?: UserGrade;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, userGrade = 'NORMAL' }) => {
  const displayPrice = product.gradePrices[userGrade] || product.price;
  const discount = Math.round(((product.price - displayPrice) / product.price) * 100);

  return (
    <div className={`${styles.card} glass-card`}>
      <Link href={`/products/${product.id}`} className={styles.imageWrapper}>
        <img src={product.image} alt={product.name} className={styles.image} />
        {discount > 0 && <span className={styles.badge}>{discount}% OFF</span>}
      </Link>
      
      <div className={styles.content}>
        <Link href={`/products/${product.id}`}>
          <h3 className={styles.name}>{product.name}</h3>
        </Link>
        <p className={styles.description}>{product.description}</p>
        
        <div className={styles.priceInfo}>
          <div className={styles.prices}>
            {discount > 0 && <span className={styles.originalPrice}>₩{product.price.toLocaleString()}</span>}
            <span className={styles.memberPrice}>₩{displayPrice.toLocaleString()}</span>
          </div>
          <button className={styles.cartBtn}>🛒</button>
        </div>
        
        <div className={styles.gradeTag}>
          <span className={`${styles.grade} ${styles[userGrade.toLowerCase()]}`}>
            {userGrade} 전용가
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
