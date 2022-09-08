import React from 'react'
import axios from 'axios'
const CardUsers = ({ user, getAllUsers, setUpdateInfo, handleOpenForm }) => {
  //3cer paso crear el delete
  const deleteUsers = () => {
    const URL = `http://users-crud1.herokuapp.com/users/${user.id}/`
    axios.delete(URL)
      .then(res => {
        console.log(res.data)
        getAllUsers()
      })
      .catch(err => console.log(err))
  }

  const handleUpdateClick = () => {
    handleOpenForm()
    setUpdateInfo(user)
  }




  return (
    <article className='card'>
      <h2 className='card__name'>{`${user.first_name} ${user.last_name}`}</h2>
      <hr />
      <ul className='card__list'>
        <div className="list__container">
          <li className='card__item' title={user.email}>Email<span className='card__span'>{user.email}</span></li>
          <li className='card__item'>Birthday<span className='card__span'>{user.birthday}</span></li>
        </div>
      </ul>
      <hr />
      <div className="container__btn">
        <button className='btn btn__delete' onClick={deleteUsers}>
        <i className="fa-regular fa-trash-can icon"></i>
        </button>
        <button className='btn btn__update' onClick={handleUpdateClick}>
        <i class="fa-regular fa-pen-to-square icon"></i>
        </button>
      </div>
      
    </article>
  )
}

export default CardUsers