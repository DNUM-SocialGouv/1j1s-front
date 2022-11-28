import dynamic from 'next/dynamic';
import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import { Header } from '~/client/components/layouts/Header/Header';
import Bouée from '~/client/components/ui/Bouée/Bouée';

const Footer = dynamic(() => import(/* webpackChunkName: 'footer' */ '~/client/components/layouts/Footer/Footer'), { ssr: false });
const SkipLink = dynamic(() => import(/* webpackChunkName: 'header' */ '~/client/components/ui/SkipLink/SkipLink'), { ssr: false });

export function Layout({ children }: React.PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(false);
  const surface = useRef<HTMLElement>(null);


  useEffect(() => {
    setIsLoading(true);
  }, []);

  return (
    <div ref={ surface }>
      <SkipLink/>
      {isLoading && <Header/>}
      {children}
      <Footer/>
      <Bouée surface={ surface } />
    </div>
  );
}
