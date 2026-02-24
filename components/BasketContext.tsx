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
  const removeFromBasket = (itemId: string) => {
    setBasket(prev => {
      const index = prev.indexOf(itemId);
      if (index > -1) {
        return [...prev.slice(0, index), ...prev.slice(index + 1)];
      }
      return prev;
    });
  };

  return (
    <BasketContext.Provider
      value={{basket, addToBasket, clearBasket, removeFromBasket}}>
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => useContext(BasketContext);
