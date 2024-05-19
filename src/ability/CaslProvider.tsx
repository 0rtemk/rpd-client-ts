import React, { FC } from 'react';
import CaslContext from './CaslContext';
import useStore from '../store/store';

type Props = {
  children: React.ReactNode;
};

export const CaslProvider: FC<Props> = ({ children }) => {
  const { ability } = useStore();

  return (
    <CaslContext.Provider value={ ability }>
      {children}
    </CaslContext.Provider>
  );
};