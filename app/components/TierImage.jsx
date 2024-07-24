import React from 'react';
import Image from 'next/image';

const tierImages = {
  CHALLENGER: '/assets/challenger.webp',
  GRANDMASTER: '/assets/grandmaster.webp',
  MASTER: '/assets/master.webp',
  DIAMOND: '/assets/diamond.webp',
  EMERALD: '/assets/emerald.webp',
  PLATINUM: '/assets/platinum.webp',
  GOLD: '/assets/gold.webp',
  SILVER: '/assets/silver.webp',
  BRONZE: '/assets/bronze.webp',
  IRON: '/assets/iron.webp',
  UNRANK: '/assets/unrank.webp',
};

const TierImage = ({ tier, name }) => (
  <a href={`https://tactics.tools/player/TW/${name}`} target="_blank" rel="noopener noreferrer">
    <Image
      src={tierImages[tier] || tierImages['UNRANK']}
      alt={tier ? tier.toLowerCase() : 'unrank'}
      width={65}
      height={65}
    />
  </a>
);

export default TierImage;