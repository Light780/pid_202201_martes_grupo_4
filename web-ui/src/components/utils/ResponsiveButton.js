import { Button, useMediaQuery } from "@mui/material";

const ResponsiveButton = ({style, onClick}) => {
  const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down("sm"));

  const buttonProps = {
    variant: 'contained',
    size: isSmallScreen ? "small" : "large",
    style : style,
    onClick : onClick,
    type:'button'
  };
  return (
    <Button {...buttonProps} color="primary">
      {isSmallScreen ? '+' : 'Registrar'}
    </Button>
  );
}

export default ResponsiveButton;