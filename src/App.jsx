import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import CardUsers from './components/CardUsers'
import FormUsers from './components/FormUsers'

function App() {

  const [users, setUsers] = useState()
  const [updateInfo, setUpdateInfo] = useState()

  const getAllUsers = () => {
    const URL = `http://users-crud1.herokuapp.com/users/`
    axios.get(URL)
      .then(res => setUsers(res.data))
      .catch(err => console.log(err))
  }
  
  useEffect(() => {
    getAllUsers()
  },[])

  console.log(users)
  //Modal

  const [isFormOpen, setIsFormOpen ] = useState(false)
  const handleOpenForm = () => setIsFormOpen(true)
  const handleCloseForm = () => setIsFormOpen(false)

  return (
    <div className="App">
      <header className='App__header'>
        <h1 className="App__title">Users Card</h1>
        <button className='App__open form__btn' onClick={handleOpenForm}>Open Form</button>
      </header>
      <div className={isFormOpen ? 'App__form' : 'form__none'}>
        <FormUsers 
          getAllUsers={getAllUsers}
          updateInfo={updateInfo}
          setUpdateInfo={setUpdateInfo}
          handleCloseForm={handleCloseForm}
        />
      </div>
      <div className="App__card container">
        {
          users?.map(user => (
            <CardUsers 
              key={user.id} 
              user={user} 
              getAllUsers={getAllUsers}
              setUpdateInfo={setUpdateInfo}
              handleOpenForm={handleOpenForm}
            />
          ))
        }
      </div>
    </div>
  )
}

export default App
