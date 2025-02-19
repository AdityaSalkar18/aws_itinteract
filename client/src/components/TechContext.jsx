import React,{createContext, useState} from 'react';

export const TechContext = createContext();

export const TechProvider = ({children}) => {
    const [tech, setTech] = useState('');

    return(
        <TechContext.Provider value={{ tech, setTech}}>
         {children}
       </TechContext.Provider>
        
    )
}