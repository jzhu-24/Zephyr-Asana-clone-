export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const openModal = (modal, id) => {
  const modalObj = {
    value: modal,
    id,
  };

  return {
    type: OPEN_MODAL,
    modal: modalObj,
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL
  };
};