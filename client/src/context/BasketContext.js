import { createContext, useState } from "react";

export const BasketContext = createContext();

function BasketContextProvider({ children }) {
    const [basketItems, setBasketItems] = useState([]);
    return (
        <BasketContext.Provider value={{ basketItems, setBasketItems }}>
            {children}
        </BasketContext.Provider>
    )
};

export default BasketContextProvider;