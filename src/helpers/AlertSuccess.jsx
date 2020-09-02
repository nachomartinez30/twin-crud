import Swal from 'sweetalert2'
const AlertSuccess = (msg, txt = null) => {
    Swal.fire({
        title: msg,
        icon: 'success',
        timer: 1000,
        text: txt,
        showConfirmButton: false
    })
}

export default AlertSuccess;