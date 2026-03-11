'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function RouteTransition({ children }) {
  const pathname = usePathname();
  const [mountedPath, setMountedPath] = useState(pathname);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(false);

    const frame = window.requestAnimationFrame(() => {
      setMountedPath(pathname);
      setVisible(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return (
    <div
      key={mountedPath}
      className={`routeTransition ${visible ? 'is-visible' : ''}`}
    >
      {children}
    </div>
  );
}
