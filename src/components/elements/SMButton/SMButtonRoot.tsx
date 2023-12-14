import Button from '@mui/material/Button';
import { styled, Theme } from '@mui/material';

// Data and Types
import { CustomButtonProps } from '../../../types/theme.types';

// ----------------

type SMButtonRootProps = {
  theme?: Theme;
  ownerState: {
    variant: CustomButtonProps['variant'];
    color?: CustomButtonProps['color'];
    size: CustomButtonProps['size'];
    iconOnly?: boolean;
  };
};

/**
 * Coustomiz MUI Button and add new styles to it
 */
const SMButtonRoot = styled(Button)<SMButtonRootProps>(
  ({ theme, ownerState }) => {
    const { palette } = theme;
    const { variant, color, iconOnly } = ownerState;

    // Light Buttons Styles (bgc: #fff, color: GIVEN)
    const lightButton = () => {
      let backgroundColor = palette.background.paper;
      let hoverBgc =
        palette.mode === 'light' ? palette.grey[300] : palette.grey[900];

      let colortype =
        color !== 'inherit' && color !== undefined ? color : 'primary';
      let textColor = color ? palette[colortype]?.main : palette.grey[500];

      const normalStyles = {
        backgroundColor,
        color: textColor,
        boxShadow: 'none',
      };
      const hoverStyles = {
        backgroundColor: hoverBgc,
        boxShadow: 'none',
      };
      const focusStyles = {
        boxShadow: `0px 0px 2px 1px ${textColor}`,
      };

      return {
        ...normalStyles,
        '&:hover': hoverStyles,
        '&:focus:not(:hover)': focusStyles,
      };
    };

    // Light Icons Buttons Styles (bgc: #fff, color: GIVEN)
    const lightIconButton = () => {
      const prevStyles = lightButton();
      return {
        ...prevStyles,
        padding: theme.spacing(2),
        minWidth: 'unset',
      };
    };

    // Text Icon Button Stlyes (bgc: transparent, opacity: CHANGES ON HOVER)
    const textIconButton = () => {
      let iconColor = palette.common.white;
      return {
        color: iconColor,
        opacity: 0.5,
        padding: theme.spacing(1),
        borderRadius: '50%',
        minWidth: 'unset',
        '&:hover': {
          opacity: 1,
        },
      };
    };

    // New styles + default styles of MUI Button
    return {
      ...(variant === 'light' && lightButton()),
      ...(variant === 'light' && iconOnly && lightIconButton()),
      ...(variant === 'text' && iconOnly && textIconButton()),
    };
  }
);

export default SMButtonRoot;
