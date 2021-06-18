import  {  useEffect, useState } from 'react';

export const useUser = (obj) => {
  const [user, setUser] = useState({
    house: true,
    lumberyard: false,
    windmill: false,
    mine: false,
    watermill: false,
    sawmill: false,
    farm: false,
    blacksmith: false,
    tavern: false,
    castle: false,
  });
    
  useEffect(() => {
    setUser(obj);
  }, []);

  return { user, setUser };
}; 
