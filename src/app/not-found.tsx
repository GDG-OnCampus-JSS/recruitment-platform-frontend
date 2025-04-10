import Link from 'next/link';
import React from 'react';
const NotFound = () => {
  return (
    <div>
      <h1>The Page you are looking for does not exist</h1>
      <Link href="/">Go to Home</Link>
    </div>
  );
};

export default NotFound;
