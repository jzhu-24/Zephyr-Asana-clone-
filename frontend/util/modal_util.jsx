// export const toggleModal = () => {
//   const openCreate = document.getElementsByClassName("create-workspace-modal")[0];
//   const openEdit = document.getElementsByClassName("edit-workspace-modal")[0];
//   const cross = document.getElementsByClassName("workspace-form-cross");
//   const createModal = document.getElementsByClassName("create-workspace-form-modal")[0];
//   const editModal = document.getElementsByClassName("edit-workspace-form-modal")[0];
//   const workspaceButton = document.getElementsByClassName("workspace-form-button");

//   openCreate.onclick = () => createModal.style.display = "block";
//   openEdit.onclick = () => editModal.style.display = "block";
//   for (let i = 0; i < cross.length; i++) {
//     cross[i].onclick = () => {
//       createModal.style.display = "none";
//       editModal.style.display = "none";
//     }
//   }

//   // why can't it be event.target == (createModal || editModal)
//   if (event.target == createModal || event.target == editModal || event.target == workspaceButton[0] || event.target == workspaceButton[1]) {
//     editModal.style.display = "none";
//     createModal.style.display = "none";
//   }

//   $(document).keydown(function (e) {
//     if (e.keyCode == 27) {
//       editModal.style.display = "none";
//       createModal.style.display = "none";
//       userDropdown.classList.remove("show");
//     }
//   });
// }