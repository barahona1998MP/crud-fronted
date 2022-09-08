import React, { useEffect } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
const defaulValue = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    birthday: ''
}
const FormUsers = ({getAllUsers, updateInfo, setUpdateInfo, handleCloseForm}) => {
    const {register, reset, handleSubmit} = useForm()

    //2do paso Create la data
    const createUsers = data => {
        const URL = `http://users-crud1.herokuapp.com/users/`
        axios.post(URL, data)
            .then(res => {
                console.log(res.data)
                getAllUsers()
            })
            .catch(err => console.log(err))
    }


    //4to update data
    const updateUsers = data => {
        const URL = `http://users-crud1.herokuapp.com/users/${updateInfo.id}/`
        axios.patch(URL, data)
            .then(res => {
                console.log(res.data)
                getAllUsers()
            })
            .catch(err => console.log(err))
    }

    const submit = data => {
        if(updateInfo) {
            //updata
            updateUsers(data)
            setUpdateInfo(null)
            
        } else {
            //create 
            createUsers(data)
        }
        reset(defaulValue)
        handleCloseForm()    
    }

    useEffect(() => {
        if(updateInfo) {
            reset(updateInfo)
        }
    }, [updateInfo])

    return (
        <form  className='form' action="" onSubmit={handleSubmit(submit)}>
                <div onClick={handleCloseForm} className='form__close'>x</div>
            <h2 className='form__title'>{updateInfo ? 'Update user Information' : 'Create New Users'}</h2>
            <div className='container'>
                <label htmlFor="first_name">Name:</label>
                <input className='field' {...register('first_name')} type="text" id='first_name' />
            </div>
            <div className='container'>
                <label htmlFor="last_name">LastName:</label>
                <input className='field' {...register('last_name')} type="text" id='last_name' />
            </div>
            <div className='container'>
                <label htmlFor="email">Email:</label>
                <input className='field' {...register('email')} type="text" id='email' />
            </div>
            <div className='container'>
                <label htmlFor="password">Password:</label>
                <input className='field' {...register('password')} type="password" id='password' />
            </div>
            <div className='container'>
                <label htmlFor="birthday">Birthday:</label>
                <input className='field' {...register('birthday')} type="date" id="birthday" />
            </div>
            <div className="center-content">
                <button className='form__btn'>{updateInfo ? 'Update' : 'Create'}</button>
            </div>
        </form>
    )
}

export default FormUsers