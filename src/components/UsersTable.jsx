import React, { Fragment, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom';
import clienteAxios from '../config/axios';
import AlertaNext from '../helpers/AlertaNext';
import AlertError from '../helpers/AlertError';
import AlertSuccess from '../helpers/AlertSuccess';
import AlertLoading from '../helpers/AlertLoading';


const UsersTable = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [refresh, setRefresh] = useState(false)

    const columns = [
        {
            name: 'Nombre',
            selector: 'first_name',
            sortable: true,
        },
        {
            name: 'Apellido',
            selector: 'last_name',
            sortable: true,
        },
        {
            name: 'Correo',
            selector: 'email',
            sortable: true,
        },
        {

            name: 'Acciones',
            wrap: true,
            button: true,
            minWidth: '180px',
            cell: (row) => <Fragment><Link to={`/edit/${row.id}`} className='btn btn-info'>Ver</Link><button className='btn btn-danger' onClick={() => handleDeleteRecord(row.id)}>Eliminar</button></Fragment>,
        },
    ];

    const handleDeleteRecord = (id) => {
        AlertaNext('Eliminará el usuario', async () => {
            try {
                AlertLoading('Eliminando...');
                const resp = await clienteAxios.delete(`/users/${id}`)
                if (resp.status === 204) {
                    AlertSuccess('Usuario eliminado')
                    setRefresh(true)
                }
            } catch (error) {
                AlertError('Error al eliminar usuario')
                console.log(error);
            }
        })
    }
    const fetchUsers = async page => {
        setLoading(true);
        AlertLoading('Consultando...')
        const response = await clienteAxios.get(`/users?page=${page}&per_page=${perPage}`);
        setData(response.data.data);
        setTotalRows(response.data.total);
        AlertSuccess('¡Cargados con exito!')
        setLoading(false);
    };

    const handlePageChange = page => {
        fetchUsers(page);
    };

    const handlePerRowsChange = async (newPerPage, page) => {
        setLoading(true);

        const response = await clienteAxios.get(`/users?page=${page}&per_page=${newPerPage}`);

        setData(response.data.data);
        setPerPage(newPerPage);
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers(1);
        setRefresh(false)
    }, [refresh]);

    return (
        <div className='container pt-3'>
            <DataTable
                title="Usuarios"
                columns={columns}
                data={data}
                progressPending={loading}
                pagination
                paginationServer
                paginationTotalRows={totalRows}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
            />
        </div>
    );
};

export default UsersTable;