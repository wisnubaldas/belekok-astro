import '@libs/animate-css/animate.scss';

import React, { createContext, useContext, useState, useEffect } from 'react';
const ToastContext = createContext();
export const useToast = () => useContext(ToastContext);

export default function Toasts() {
  return (
    <div
      style={{ marginTop: '2px', marginRight: '8px' }}
      className="bs-toast toast fade show position-absolute top-0 end-0 animate__animated animate__flipInX"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="toast-header">
        <i class="icon-base ri ri-spam-fill text-danger me-2"></i>
        <div className="me-auto fw-medium">Bootstrap</div>
        <small className="text-body-secondary">11 mins ago</small>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
      <div className="toast-body">Hello, world! This is a toast message.</div>
    </div>
  );
}
