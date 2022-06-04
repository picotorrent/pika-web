import { IconButton, useColorMode } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

export default function StyleColorMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  let themeIcon = colorMode === "dark" ? <SunIcon /> : <MoonIcon />;

  return (
    <IconButton
      aria-label="Theme"
      size='sm'
      variant='outline'
      icon={themeIcon}
      onClick={toggleColorMode}
    />
  )
}