import Swal from "sweetalert2";

export function confirmDanger({ title, text, confirmText = "Eliminar" }) {
  return Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#c0392b",
    cancelButtonColor: "#555",
    confirmButtonText: confirmText,
    cancelButtonText: "Cancelar",
  });
}

export function successAlert(text) {
  return Swal.fire({
    icon: "success",
    title: text,
    timer: 1800,
    showConfirmButton: false,
  });
}

export function errorAlert(text) {
  return Swal.fire({
    icon: "error",
    title: "Error",
    text,
  });
}
