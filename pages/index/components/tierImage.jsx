import React from 'react';
import challenger from '../assets/challenger.webp';
import grandmaster from '../assets/grandmaster.webp';
import master from '../assets/master.webp';
import diamond from '../assets/diamond.webp';
import emerald from '../assets/emerald.webp';
import platinum from '../assets/platinum.webp';
import gold from '../assets/gold.webp';
import silver from '../assets/silver.webp';
import bronze from '../assets/bronze.webp';
import iron from '../assets/iron.webp';
import unrank from '../assets/unrank.webp';




const tierImages = {
  CHALLENGER: challenger,
  GRANDMASTER: grandmaster,
  MASTER: master,
  DIAMOND: diamond,
  EMERALD: emerald,
  PLATINUM: platinum,
  GOLD: gold,
  SILVER: silver,
  BRONZE: bronze,
  IRON: iron,
  UNRANK: unrank,
};

const TierImage = ({ tier, name }) => (
  <a href={`https://tactics.tools/player/TW/${name}`} target="_blank" rel="noopener noreferrer">
    <img
      src={tierImages[tier] || tierImages['UNRANK']}
      alt={tier ? tier.toLowerCase() : 'unrank'}
    />
  </a>
);

export default TierImage;
