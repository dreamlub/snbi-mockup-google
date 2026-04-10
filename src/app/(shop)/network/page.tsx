'use client';

import React from 'react';
import { MOCK_NETWORK } from '@/data/mock';
import { NetworkNode } from '@/types';
import styles from './page.module.css';

const TreeNode: React.FC<{ node: NetworkNode }> = ({ node }) => {
  return (
    <div className={styles.nodeWrapper}>
      <div className={`${styles.node} glass`}>
        <div className={`${styles.grade} ${styles[node.grade.toLowerCase()]}`}>{node.grade}</div>
        <div className={styles.name}>{node.name}</div>
        <div className={styles.perf}>₩{node.performance.toLocaleString()}</div>
      </div>
      {node.children && node.children.length > 0 && (
        <div className={styles.children}>
          {node.children.map(child => (
            <TreeNode key={child.id} node={child} />
          ))}
        </div>
      )}
    </div>
  );
};

const NetworkPage = () => {
  return (
    <div className={`${styles.container} container`}>
      <div className={styles.header}>
        <h1 className={styles.title}>나의 네트워크 조직도</h1>
        <p className={styles.subtitle}>하위 추천인 구조와 실적 현황을 시각적으로 확인하세요.</p>
      </div>

      <div className={styles.summaryBar + " glass"}>
        <div className={styles.sumItem}>
          <span>총 네트워크 인원</span>
          <strong>4명</strong>
        </div>
        <div className={styles.sumItem}>
          <span>총 네트워크 매출</span>
          <strong>₩27,000,000</strong>
        </div>
        <div className={styles.sumItem}>
          <span>나의 현재 등급</span>
          <strong className={styles.goldText}>GOLD</strong>
        </div>
      </div>

      <div className={styles.treeViewport}>
        <div className={styles.treeRoot}>
          <TreeNode node={MOCK_NETWORK} />
        </div>
      </div>
      
      <div className={styles.legend}>
        <p>* 실적은 전월 마감 기준이며, 매일 자정 업데이트됩니다.</p>
      </div>
    </div>
  );
};

export default NetworkPage;
