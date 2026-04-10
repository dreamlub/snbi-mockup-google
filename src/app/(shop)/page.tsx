import React from 'react';
import Link from 'next/link';
import { MOCK_PRODUCTS, MOCK_USER } from '@/data/mock';
import ProductCard from '@/components/products/ProductCard';
import styles from './page.module.css';

export default function Home() {
  const featuredProducts = MOCK_PRODUCTS.slice(0, 3);

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={`${styles.heroContent} container`}>
          <h1 className="fade-in">
            Premium Beauty & <br />
            <span className="text-gradient">Financial Freedom</span>
          </h1>
          <p className="fade-in" style={{ animationDelay: '0.2s' }}>
            SNBi와 함께 당신의 아름다움과 성공을 동시에 디자인하세요.<br />
            최고의 제품과 체계적인 리워드 시스템이 기다립니다.
          </p>
          <div className={styles.heroBtns + " fade-in"} style={{ animationDelay: '0.4s' }}>
            <Link href="/products" className="btn-primary">쇼핑 시작하기</Link>
            <Link href="/about" className={styles.secondaryBtn}>사업 소개</Link>
          </div>
        </div>
        <div className={styles.heroOverlay}></div>
      </section>

      {/* Recommended Products */}
      <section className={`${styles.section} container`}>
        <div className={styles.sectionHeader}>
          <h2>추천 상품</h2>
          <Link href="/products" className={styles.viewAll}>전체보기 &gt;</Link>
        </div>
        <div className={styles.productGrid}>
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} userGrade={MOCK_USER.grade} />
          ))}
        </div>
      </section>

      {/* Category Section */}
      <section className={styles.categorySection}>
        <div className="container">
          <div className={styles.categoryGrid}>
            <div className={`${styles.categoryCard} glass`}>
              <h3>Skin Care</h3>
              <p>본연의 빛을 찾는 솔루션</p>
              <Link href="/products?category=SKIN">이동하기</Link>
            </div>
            <div className={`${styles.categoryCard} glass`}>
              <h3>Body & Hair</h3>
              <p>전신을 아우르는 토탈 케어</p>
              <Link href="/products?category=HAIR">이동하기</Link>
            </div>
            <div className={`${styles.categoryCard} glass`}>
              <h3>Others</h3>
              <p>더 특별한 일상을 위해</p>
              <Link href="/products?category=OTHER">이동하기</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Banner */}
      <section className={`${styles.subBanner} container`}>
        <div className={`${styles.subContent} glass`}>
          <div className={styles.subText}>
            <span className={styles.tag}>정기구독</span>
            <h2>빠사쥬 & 수리모 & 아스릭손</h2>
            <p>매월 정해진 날짜에 가장 신선한 제품을 만나보세요.</p>
            <Link href="/checkout/subscription" className="btn-primary">구독 플랜 확인하기</Link>
          </div>
          <div className={styles.subImage}>
             {/* Mock Illustration or Image */}
             <div className={styles.placeholderBox}>PREMIUM PLAN</div>
          </div>
        </div>
      </section>

      {/* Surimo Coming Soon */}
      <section className={`${styles.surimoSection} container`}>
        <div className={styles.surimoContent}>
          <h2>SURIMO</h2>
          <p className={styles.status}>[ 준비 중 ]</p>
          <p>새로운 차원의 헤어 리페어링 솔루션, 수리모가 곧 출시됩니다.</p>
        </div>
      </section>
    </div>
  );
}
