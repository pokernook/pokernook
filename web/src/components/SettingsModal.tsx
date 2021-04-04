import {
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { FC } from "react";

import { AccountSettings } from "./AccountSettings";
import { ThemeSettings } from "./ThemeSettings";

type Props = Omit<ModalProps, "children">;

export const SettingsModal: FC<Props> = ({ ...props }: Props) => {
  return (
    <Modal size="2xl" scrollBehavior="inside" {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Settings</ModalHeader>
        <ModalCloseButton />
        <Divider />

        <ModalBody h={450} roundedBottom="md">
          <Tabs isLazy orientation="vertical">
            <TabList position="fixed">
              <Tab>Account</Tab>
              <Tab>Theme</Tab>
            </TabList>

            <TabPanels ml="32">
              <TabPanel>
                <AccountSettings />
              </TabPanel>

              <TabPanel>
                <ThemeSettings />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
