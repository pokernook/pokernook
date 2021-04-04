import { Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FC } from "react";

export const Loading: FC = () => (
  <Flex alignItems="center" justifyContent="center" h="100vh" w="100vw">
    <motion.img
      src="/logo.svg"
      initial={{ scale: 0.5 }}
      animate={{ scale: [0.5, 0.52, 0.5] }}
      transition={{ duration: 1.1, repeat: Infinity }}
    />
  </Flex>
);
