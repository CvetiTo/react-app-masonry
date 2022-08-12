import { ItemContext } from './contexts/ItemContext.js';
import { UserProvider } from './contexts/UserContext.js';
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
import PrivateRoute from './components/common/PrivateRoute.js';
import { useEffect, useState } from 'react';
import { getAll } from './services/itemService.js';
import { Profile } from './components/Profile/Profile.js';

function App() {
  
  const [items, setItems, isLoading] = useState([]);
  
  const navigate = useNavigate();
  
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

const itemLikes = (itemId, likesData) => {
  setItems(state => state.map(x => x._id === itemId ? likesData + x : x))
}

  useEffect(() => {
    getAll()
    .then(result => {
      setItems(result);
    });
  },[]);


  

  return (
    <UserProvider >
      <div>
        {isLoading
          ? <p>Loading...</p>
          : <Header />}

          <ItemContext.Provider value={{items, addItem, itemEdit, itemRemove, itemLikes }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/catalog' element={<SSRMasonry items={items} />} />
          <Route path="/catalog/:itemId" element={<Details items={items} />} />
          <Route path="/items/:itemId/edit" element={<PrivateRoute><Edit /></PrivateRoute>} />
          <Route path='/create' element={<PrivateRoute><Create /></PrivateRoute>} />
          <Route path='/logout' element={<PrivateRoute><LogOut /></PrivateRoute>} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>

      </ItemContext.Provider>

        <Footer />
      </div>
    </UserProvider>
  );
}

export default App;
