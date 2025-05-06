import React, {createContext, useState, useContext} from 'react';

const BasketContext = createContext<any>(null);

export const BasketProvider = ({children}: any) => {
  const [basket, setBasket] = useState<string[]>([]);

  const addToBasket = (item: string) => {
    setBasket(prev => [...prev, item]);
  };

  const clearBasket = () => {
    setBasket([]);
  };
  const removeFromBasket = (itemId: any) => {
    setBasket(prev => prev.filter(item => item !== itemId));
  };

  return (
    <BasketContext.Provider
      value={{basket, addToBasket, clearBasket, removeFromBasket}}>
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => useContext(BasketContext);
