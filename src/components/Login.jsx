import React, { useState } from 'react'
import "../assets/login_styles.css";
import { Link } from 'react-router-dom'
import AlertError from '../helpers/AlertError';
import AlertCargando from '../helpers/AlertCargando';
import AlertExito from '../helpers/AlertExito';
import clienteAxios from "../config/axios";


const Login = ({ history }) => {
    const [credentials, setCredentials] = useState({
        email: "eve.holt@reqres.in",
        password: "cityslicka"
    })

    const setInfo = (input) => {
        setCredentials({
            ...credentials,
            [input.target.name]: input.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // revision de campos correctos
        // consulta por axios
        try {
            AlertCargando('Auteniticando');
            const respuesta = await clienteAxios.post('/login', credentials)
            if (respuesta.status === 200) {
                // redireccion a interfaz principal
                AlertExito('¡Bienvenido!')
                history.push('/main')
            } else {
                AlertError("No se pudo auteniticar")
            }
        } catch (error) {
            console.log(error);
            // AlertError('ERROR:', error)
            AlertError("No se pudo auteniticar")
        }

    }

    return (
        <div id="login">
            <div className="container ">
                <div id="login-row" className="row justify-content-center align-items-center">
                    <div id="login-column" className="col-md-6 p">
                        <div id="login-box" className="col-md-12 p">
                            <form id="login-form" className="form" onSubmit={handleSubmit}>
                                <h3 className="text-center text-info">Bienvenido</h3>
                                <div className="form-group">
                                    <label htmlFor="username" className="text-info">Usuario:</label><br />
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
                                <input
                                    className='btn btn-primary btn-block'
                                    type='submit'
                                    value='Ingresar'
                                />
                            </form>
                            <div id="register-link" className="text-right ">
                                <Link to='/new_user'>Registrarse</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;