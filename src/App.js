import useItemsApi from './hooks/useItems.js';
import { ItemContext } from './contexts/ItemContext.js';
import { UserContext } from './contexts/userContext.js';
import { useNavigate } from 'react-router-dom';
import { Home } from './components/Home/Home.js';
import { Header } from './components/Header/Header.js';
import { Footer } from './components/Footer/Footer.js';
import { Create } from './components/Create/Create.js';
import { SSRMasonry } from './components/Catalog/SSRMasonry.js';
import NotFound from './components/NotFound/NotFound.js'
import { Routes, Route } from 'react-router-dom';
import LogIn from './components/LoginRegister/LogIn.js';
import Register from './components/LoginRegister/Register.js';
import LogOut from './components/LoginRegister/LogOut.js';
import { useLocalStorage } from './hooks/useLocalStorage.js';
import { useEffect, useState } from 'react';
import { getAll } from './services/itemService.js';

function App() {
  const [user, setUser] = useLocalStorage('user', {});
  const [items, setItems, isLoading] = useState({});
  const { removeItem, createItem } = useItemsApi();
  const navigate = useNavigate();
  
  const userLoginHandler = (userData) => {
    setUser(userData);
    navigate('/');
  }

  const userLogoutHandler = () => {
    setUser({});
  }

  const addItem =  (itemData) => {  
    setItems(state => [...state,
      itemData
    ]);
    navigate('/catalog');
  }

  useEffect(() => {
    getAll()
    .then(result => {
      setItems(result);
    });
  },[]);

  const deleteItemHandler = async (itemId) => {
    await removeItem(itemId)
    setItems(state => state.filter(x => x._id !== itemId));
  }

  return (
    <UserContext.Provider value={{user, userLoginHandler, userLogoutHandler}}>
      <div>
        {isLoading
          ? <p>Loading...</p>
          : <Header />}

          <ItemContext.Provider value={{items, addItem}}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/catalog' element={<SSRMasonry items={items} deleteItemHandler={deleteItemHandler} />} />
          <Route path='/create' element={<Create />} />
          <Route path='/logout' element={<LogOut />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/register' element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

      </ItemContext.Provider>

        <Footer />
      </div>
    </UserContext.Provider>
  );
}

export default App;
