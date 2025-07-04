
import React from 'react';

const SparklesIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m12 3-1.9 4.8-4.8 1.9 4.8 1.9 1.9 4.8 1.9-4.8 4.8-1.9-4.8-1.9L12 3z" />
    <path d="M5 22v-5l-1.9-4.8-4.8-1.9 4.8-1.9L5 5" />
    <path d="m22 5-1.9 4.8-4.8 1.9 4.8 1.9 1.9 4.8" />
  </svg>
);

export default SparklesIcon;
