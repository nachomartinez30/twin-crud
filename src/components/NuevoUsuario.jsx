import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import "../assets/new_user_styles.css";
import AlertError from '../helpers/AlertError';
import AlertCargando from '../helpers/AlertCargando';
import AlertExito from '../helpers/AlertExito';
import clienteAxios from "../config/axios";


const NuevoUsuario = ({ history }) => {
    const [credentials, setCredentials] = useState({
        email: "eve.holt@reqres.in",
        password: "pistol",
        repit: "pistol"
    })

    const setInfo = (input) => {
        setCredentials({
            ...credentials,
            [input.target.name]: input.target.value
        })
    }

    const handleSubmit = async (e) => {
        const { password, repit, email } = credentials
        e.preventDefault()
        // REVISION DE CAMPOS REQUERIDOS
        // REVISION DE CONTRASEÑAS
        if (password !== repit) {
            AlertError('No coinciden las contraseñas')
            return
        } else {
            // ENVIO DE DATOS
            try {
                // REDIRECCION A MAIN
                AlertCargando('Registrando')
                const resp = await clienteAxios.post('/register', { email, password })
                if (resp.status === 200) {
                    AlertExito('Registrado con Exito')
                    history.push('/main')
                }
            } catch (error) {
                console.log(error);
                AlertError('Error al registrar usuario')
            }
        }

    }

    return (
        <div id="new_user">
            <div className="container">
                <div id="new_user-row" className="row justify-content-center align-items-center">
                    <div id="new_user-column" className="col-md-6 p">
                        <div id="new_user-box" className="col-md-12 p">
                            <form id="new_user-form" className="form" onSubmit={handleSubmit}>
                                <h3 className="text-center text-info">Registro</h3>
                                <div className="form-group">
                                    <label htmlFor="username" className="text-info">Correo:</label><br />
                                    <input className="form-control"
                                        type="email"
                                        name="email"
                                        id="email"
                                        required
                                        value={credentials.email}
                                        onChange={setInfo}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="text-info">Contraseña:</label><br />
                                    <input className="form-control"
                                        type="password"
                                        name="password"
                                        id="password"
                                        required
                                        value={credentials.password}
                                        onChange={setInfo}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="text-info">Repita su contraseña:</label><br />
                                    <input className="form-control"
                                        type="password"
                                        name="repit"
                                        id="password"
                                        required
                                        onChange={setInfo}
                                    />
                                </div>
                                <input
                                    className='btn btn-primary btn-block'
                                    type='submit'
                                    value='Registrar'
                                />
                            </form>
                            <div id="register-link" className="text-right ">
                                <Link to='/'>Ingresar</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NuevoUsuario;