import React from 'react';
import { notFound } from 'next/navigation';
import { MOCK_PRODUCTS, MOCK_USER } from '@/data/mock';
import ProductCard from '@/components/products/ProductCard';
import styles from './page.module.css';

interface Props {
  params: Promise<{ id: string }>;
}

const ProductDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const product = MOCK_PRODUCTS.find(p => p.id === id);
  
  if (!product) {
    notFound();
  }

  const userPrice = product.gradePrices[MOCK_USER.grade];
  const discountAmount = product.price - userPrice;
  const recommendedProducts = MOCK_PRODUCTS.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div className={`${styles.wrapper} container`}>
      <div className={styles.mainInfo}>
        <div className={styles.imageSection}>
          <div className={`${styles.imageContainer} glass`}>
            <img src={product.image} alt={product.name} />
          </div>
        </div>

        <div className={styles.detailSection}>
          <div className={styles.categoryBadge}>{product.category}</div>
          <h1 className={styles.title}>{product.name}</h1>
          <p className={styles.description}>{product.description}</p>

          <div className={styles.priceCard + " glass"}>
            <div className={styles.priceRow}>
              <span>정가</span>
              <span className={styles.originalPrice}>₩{product.price.toLocaleString()}</span>
            </div>
            <div className={styles.priceRow}>
              <span className={styles.gradeLabel}>{MOCK_USER.grade} 전용가</span>
              <span className={styles.userPrice}>₩{userPrice.toLocaleString()}</span>
            </div>
            <div className={styles.savings}>
              당신은 지금 <span className={styles.highlight}>₩{discountAmount.toLocaleString()}</span>을 절약하고 있습니다!
            </div>
          </div>

          <div className={styles.options}>
            <label>수량</label>
            <div className={styles.quantity}>
              <button>-</button>
              <input type="number" defaultValue={1} />
              <button>+</button>
            </div>
          </div>

          <div className={styles.actions}>
            <button className={styles.cartBtn}>장바구니 담기</button>
            <button className="btn-primary">바로 구매하기</button>
          </div>
          
          {product.isSubscription && (
            <div className={styles.subInfo}>
              💡 이 상품은 정기구독 시 추가 5% 할인이 적용됩니다.
            </div>
          )}
        </div>
      </div>

      <section className={styles.related}>
        <h2>이런 상품은 어떠세요?</h2>
        <div className={styles.relatedGrid}>
          {recommendedProducts.map(p => (
            <ProductCard key={p.id} product={p} userGrade={MOCK_USER.grade} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetailPage;
