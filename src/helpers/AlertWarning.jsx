import Swal from 'sweetalert2'

const AlertWarning = (msg) => {
    Swal.fire({
        title: msg,
        type: 'warning',
        icon: 'warning'
    })
}

export default AlertWarning;