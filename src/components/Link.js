import { Link as UILink} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Link = ({to, children, ...props}) => {
  return (
    <UILink as={RouterLink} to={to} fontWeight="bold" {...props}>
      {children}
    </UILink>
  );
}

export default Link;
