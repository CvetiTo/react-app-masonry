import { ItemContext } from './contexts/ItemContext.js';
import { UserContext } from './contexts/userContext.js';
import { useNavigate } from 'react-router-dom';
import { Home } from './components/Home/Home.js';
import { Header } from './components/Header/Header.js';
import { Footer } from './components/Footer/Footer.js';
import { Create } from './components/Create/Create.js';
import { Details } from './components/Details/Details.js';
import { Edit } from './components/Edit/Edit.js';
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
  const [items, setItems, isLoading] = useState([]);
  
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

  const itemEdit = (itemId, itemData) => {
    setItems(state => state.map(x => x._id === itemId ? itemData : x));
}

const itemRemove = (itemId) => {
  setItems(state => state.filter(x => x._id !== itemId ))
}

  useEffect(() => {
    getAll()
    .then(result => {
      setItems(result);
    });
  },[]);


  

  return (
    <UserContext.Provider value={{user, userLoginHandler, userLogoutHandler}}>
      <div>
        {isLoading
          ? <p>Loading...</p>
          : <Header />}

          <ItemContext.Provider value={{items, addItem, itemEdit, itemRemove }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/catalog' element={<SSRMasonry items={items} />} />
          <Route path="/catalog/:itemId" element={<Details items={items} />} />
          <Route path="/items/:itemId/edit" element={<Edit />} />
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
