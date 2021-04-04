import { ImageProps, Img } from "@chakra-ui/image";
import { FC } from "react";

export const Avatar: FC<ImageProps> = ({ ...props }) => (
  <Img borderRadius="lg" border="2px" bg="black" {...props} />
);
