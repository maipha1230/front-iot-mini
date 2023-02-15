import Swal from 'sweetalert2'


export const successAlert = (msg) => {
    return Swal.fire({
        title: 'Success',
        text: msg,
        icon: 'success',
        showConfirmButton: false,
        timer: 2500
    })
}

export const logoutAlert = () => {
  return Swal.fire({
    title: "Sign out",
    text: "Do you want to sign out?",
    icon: "question",
    showConfirmButton: true,
    showCancelButton: true
  })
}

export const successToast = (msg) => {
    return Swal.fire({
        toast: true,
        icon: 'success',
        title: msg,
        animation: false,
        position: 'bottom-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
}