'use client';
import React from 'react';
import styles from '../styles/loading.module.scss'

function Loading() {
  const numberOfItems = 11;

  return (
    <div className={styles.loadContainer}>
      <div className={styles.loadingText}>Loading</div>
      <ul className={styles.loadingUl}>
        {Array.from({ length: numberOfItems }).map((_, i) => (
          <li key={i} style={{ '--delay': `${i * 0.1}s` }} className={styles.loadingLi}></li>
        ))}
      </ul>
    </div>
  );
}

export default Loading;