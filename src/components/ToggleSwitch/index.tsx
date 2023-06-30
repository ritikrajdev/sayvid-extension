import React from 'react';
import './ToggleSwitch.css';

interface ToggleSwitchProps {
  id?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ToggleSwitch(props: ToggleSwitchProps) {
  return (
    <>
      <label htmlFor={props.id} className='toggle-switch'>
        <input type='checkbox' {...props} hidden  />
        <span className='toggle-switch-circle' />
      </label>
    </>
  );
}
