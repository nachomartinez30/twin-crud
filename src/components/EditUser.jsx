import React, { useEffect, useState } from 'react'
import '../assets/user_edit_styles.css'
import { Link, useParams } from 'react-router-dom';
import clienteAxios from '../config/axios'
import AlertError from '../helpers/AlertError';
import { Form } from 'react-bootstrap';
import AlertSuccess from '../helpers/AlertSuccess';
import AlertLoading from '../helpers/AlertLoading';


const EditUser = () => {
    const { id } = useParams();

    const [infoData, setInfoData] = useState({})
    const [infoAd, setInfoAd] = useState({})

    useEffect(async () => {
        // GET USER INFO BY ID
        try {
            const resp = await clienteAxios.get(`/users/${id}`)
            if (resp.status === 200) {

                setInfoData(resp.data.data)
                setInfoAd(resp.data.ad)
            }
            // SET TO STATE

        } catch (error) {
            AlertError('Error al cargar usuario')
            console.log(error);
        }
    }, [''])

    const handleInfoData = (input) => {
        setInfoData({
            ...infoData,
            [input.target.name]: input.target.value
        })
    }
    const handleInfoAd = (input) => {
        setInfoAd({
            ...infoAd,
            [input.target.name]: input.target.value

        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // GET INFO OF STATES
        const name = infoData.first_name
        // SEND API REQUEST BY AXIOS
        try {
            AlertLoading('Actualizando usuario')
            const resp = await clienteAxios.put(`/users/${id}`, { name, job: 'zion resident' })
            if (resp.status === 200) {
                AlertSuccess('Usuario Actualizado')
            }
        } catch (error) {
            console.log(error);
            AlertError('No se pudo actualizar el usuario')
        }
    }


    return (
        <div className="container">
            <a href='/main' className='btn btn-danger'>Volver</a>
            <div className='col-12 col-md-12 imagen pb-2' align='center'>
                <img className='profile-userpic' src={infoData.avatar} alt="avatar" width={200} height={200} />
            </div>
            <form className="form" onSubmit={handleSubmit}>
                {/* EMAIL */}
                <div className='col-12'>
                    <label className="control-label pt-2">Correo</label>
                    <input
                        className={`form-control`}
                        defaultValue={infoData.email}
                        name='email'
                        onChange={handleInfoData}
                        placeholder=''
                        required
                    />
                </div>
                {/* FIRST NAME */}
                <div className='col-12'>
                    <label className="control-label pt-2">Nombre</label>
                    <input
                        className={`form-control`}
                        defaultValue={infoData.first_name}
                        name='first_name'
                        onChange={handleInfoData}
                        placeholder=''
                        required
                    />
                </div>
                {/* LAS TNAME */}
                <div className='col-12'>
                    <label className="control-label pt-2">Apellidos</label>
                    <input
                        className={`form-control`}
                        defaultValue={infoData.last_name}
                        name='last_name'
                        onChange={handleInfoData}
                        placeholder=''
                        required
                    />
                </div>

                <hr />
                {/* COMPANY */}
                <div className='col-12'>
                    <label className="control-label pt-2">Compañia</label>
                    <input
                        className={`form-control`}
                        defaultValue={infoAd.company}
                        name='company'
                        onChange={handleInfoAd}
                        placeholder=''
                        required
                    />
                </div>
                {/* URL*/}
                <div className='col-12'>
                    <label className="control-label pt-2">Nombre</label>
                    <input
                        className={`form-control`}
                        defaultValue={infoAd.url}
                        name='url'
                        onChange={handleInfoAd}
                        placeholder=''
                        required
                    />
                </div>
                {/* TEXT */}
                <div className='col-12'>
                    <label className="control-label pt-2">Apellidos</label>
                    <input
                        className={`form-control`}
                        defaultValue={infoAd.text}
                        name='text'
                        onChange={handleInfoAd}
                        placeholder=''
                        required
                    />
                </div>
                <div className='col-12 pt-4 '>
                    <input type='submit' className='btn btn-info btn-block' defaultValue='Editar' />
                </div>
            </form>
        </div>
    );
}

export default EditUser;