import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Grid,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  useDisclosure,
} from "@chakra-ui/react";
import { ChangeEvent, FC, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FiPlus } from "react-icons/fi";

import { useUpdateUsernameMutation } from "../graphql";
import { useAvatarSrc } from "../hooks/use-avatar-src";
import { useUser } from "../hooks/use-user";
import { Avatar } from "./Avatar";
import { CropperModal } from "./CropperModal";

type Props = Omit<ModalProps, "children">;

type FormData = {
  username: string;
};

export const ProfileModal: FC<Props> = ({ onClose, ...props }: Props) => {
  const { user } = useUser();
  const avatarSrc = useAvatarSrc(user);
  const [, updateUsername] = useUpdateUsernameMutation();
  const imageInput = useRef<HTMLInputElement>(null);
  const [rawImageUrl, setRawImageUrl] = useState<string>();
  const [croppedImageUrl, setCroppedImageUrl] = useState<string>();
  const {
    isOpen: isCropperOpen,
    onOpen: onCropperOpen,
    onClose: onCropperClose,
  } = useDisclosure();
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: { username: user?.username },
  });

  const openImageUpload = () => imageInput.current?.click();

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setRawImageUrl(URL.createObjectURL(file));
      onCropperOpen();
    }
    e.target.value = "";
  };

  const handleProfileUpdate = handleSubmit(async (data) => {
    const result = await updateUsername({ newUsername: data.username });
    if (!result.error) {
      onClose();
    }
  });

  return (
    <>
      <Modal size="2xl" onClose={onClose} {...props}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit your profile</ModalHeader>
          <ModalCloseButton />

          <ModalBody as="form" id="profile-form" onSubmit={handleProfileUpdate}>
            <Grid gap={3} templateColumns={[2, "2fr 1fr"]}>
              <Box>
                <FormControl>
                  <FormLabel>Username</FormLabel>
                  <Input spellCheck={false} {...register("username")} />
                </FormControl>
              </Box>

              <Box>
                <FormLabel>Profile photo</FormLabel>
                <Avatar
                  src={croppedImageUrl || avatarSrc}
                  boxSize={48}
                  mb={3}
                />
                <Button
                  isFullWidth
                  onClick={openImageUpload}
                  variant="ghost"
                  leftIcon={<Icon as={FiPlus} />}
                >
                  Upload an image
                </Button>
                <Input
                  type="file"
                  accept="image/*"
                  ref={imageInput}
                  display="none"
                  onChange={handleImageUpload}
                />
              </Box>
            </Grid>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup>
              <Button onClick={onClose}>Cancel</Button>
              <Button colorScheme="blue" type="submit" form="profile-form">
                Save changes
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {isCropperOpen && rawImageUrl && (
        <CropperModal
          imageUrl={rawImageUrl}
          isOpen={isCropperOpen}
          onClose={onCropperClose}
          onSave={setCroppedImageUrl}
        />
      )}
    </>
  );
};
