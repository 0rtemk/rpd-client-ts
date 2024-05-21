import React, { FC } from 'react';
import CaslContext from '../context/CaslContext';
import useAuth from '../store/useAuth';

type Props = {
  children: React.ReactNode;
};

export const CaslProvider: FC<Props> = ({ children }) => {
  const { ability } = useAuth();

  return (
    <CaslContext.Provider value={ ability }>
      {children}
    </CaslContext.Provider>
  );
};