import Swal from 'sweetalert2';

function swal(type, text) {
  return Swal.fire({
    title: type,
    text: text,
    icon: type
  });
}

export default swal;
