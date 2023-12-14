import { forwardRef } from 'react';
// UI Components
import { ButtonProps } from '@mui/material';
import SMButtonRoot from './SMButtonRoot';

// Data and Types
import { CustomButtonProps } from '../../../types/theme.types';

// ---------------

/**
 * Removing the variant key type from MUIButton and add our variant type +
 * adding iconOnly key
 */
interface SMButtonProps extends Omit<ButtonProps, 'variant'> {
  variant: CustomButtonProps['variant'];
  iconOnly?: boolean;
}

/**
 * Forward the reference of button and giving it type of new Props
 */
const SMButton = forwardRef<HTMLButtonElement, SMButtonProps>(
  ({ variant, color, size, iconOnly, children, ...rest }, ref) => (
    <SMButtonRoot
      {...rest}
      ref={ref}
      variant={variant === 'light' ? 'contained' : variant}
      color={color || 'primary'}
      size={size}
      ownerState={{ variant, size, color, iconOnly }}>
      {children}
    </SMButtonRoot>
  )
);

export default SMButton;
