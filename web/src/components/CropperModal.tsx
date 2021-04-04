import {
  Box,
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import Cropper from "react-easy-crop";
import { Area } from "react-easy-crop/types";

import { getCroppedImageUrl } from "../utils/image";

type Props = Omit<ModalProps, "children"> & {
  imageUrl: string;
  onSave: (url: string) => void;
};

export const CropperModal: FC<Props> = ({
  imageUrl,
  onClose,
  onSave,
  ...props
}: Props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();

  const handleCropComplete = (_croppedArea: Area, croppedAreaPixels: Area) =>
    setCroppedAreaPixels(croppedAreaPixels);

  const handleSaveCrop = async () => {
    if (!croppedAreaPixels) {
      return;
    }
    const url = await getCroppedImageUrl(imageUrl, croppedAreaPixels);
    onSave(url);
    onClose();
  };

  return (
    <Modal size="xl" onClose={onClose} {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Crop your photo</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Box position="relative" minH={350}>
            <Cropper
              aspect={1}
              image={imageUrl}
              crop={crop}
              onCropChange={setCrop}
              onCropComplete={handleCropComplete}
              zoom={zoom}
              onZoomChange={setZoom}
            />
          </Box>
        </ModalBody>

        <ModalFooter>
          <ButtonGroup>
            <Button onClick={onClose}>Cancel</Button>
            <Button colorScheme="blue" onClick={handleSaveCrop}>
              Save
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
