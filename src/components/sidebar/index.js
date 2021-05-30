import {
  Box,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  VStack, css, Container,
} from '@chakra-ui/react'
import { useLocation } from 'react-router-dom';
import Link from "../Link";
import Logo from "./Logo";

const NavLink = ({to, active, children}) => (
  <Link to={to} w="100%" color={active ? 'rgba(204, 15, 224, 1)' : 'rgba(133, 133, 133, 1)'}
        position="relative"
        paddingLeft={'1rem'}
        _hover={{color: 'rgba(204, 15, 224, 1)'}}
        _before={active && { content: '""',
          position: 'absolute',
          width: '6px',
          height: '1.8rem',
          left: '-20px',
          top: '-2px',
          backgroundColor: 'rgba(204, 15, 224, 1)',
          borderRadius: '0px 5px 5px 0px'
        }}
  >{children}</Link>
)

const SidebarContent = ({activePath}) => (
  <VStack>
    <Container marginBottom={'2rem'}>
      <Logo />
    </Container>
    <NavLink to="/login" active={activePath === '/login'}>Login</NavLink>
    <NavLink to="/" active={activePath === '/'}>NFT Space</NavLink>
    <NavLink to="/fans" active={activePath === '/fans'}>Fans</NavLink>
    <NavLink to="/creator" active={activePath === '/creator'}>Creators</NavLink>
  </VStack>
)


const Sidebar = ({ isOpen, variant, onClose }) => {
  const location = useLocation()
  return variant === 'sidebar' ? (
    <Box
      position="fixed"
      left={0}
      p={5}
      w="16rem"
      top={0}
      h="100%"
      bg="#F8F7FA"
    >
      <SidebarContent onClick={onClose} activePath={location.pathname}/>
    </Box>
  ) : (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Chakra-UI</DrawerHeader>
          <DrawerBody>
            <SidebarContent onClick={onClose} />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}

export default Sidebar
