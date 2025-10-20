import { Icon } from '@iconify-icon/react';

export default function BlockingComponent({ message = 'Loading...' }) {
  return (
    <div className="text-center text-primary m-2">
      <Icon icon="line-md:cloud-alt-upload-twotone-loop" width="40" height="40" />
      {/* <div className="spinner-border text-primary" role="status" aria-hidden="true"></div> */}
      <h5 className="text-primary">{message}</h5>
    </div>
  );
}
