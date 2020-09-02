import Swal from "sweetalert2";

const AlertLoading = (msg) => {
    Swal.fire({
        title: msg,
        allowEscapeKey: false,
        allowOutsideClick: false,
        onOpen: () => {
            Swal.showLoading();
        }
    })
}

export default AlertLoading;