import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Fade,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Link,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FC, useRef } from "react";
import { useForm } from "react-hook-form";

import {
  MutationUserUpdateEmailArgs,
  MutationUserUpdatePasswordArgs,
  useDeleteAccountMutation,
  useUpdateEmailMutation,
  useUpdatePasswordMutation,
} from "../graphql";
import { useUser } from "../hooks/use-user";

export const AccountSettings: FC = () => (
  <>
    <UpdateEmail />
    <Divider my={3} />
    <UpdatePassword />
    <Divider my={3} />
    <DeleteAccount />
  </>
);

const UpdateEmail = () => {
  const { user } = useUser();
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
    reset,
  } = useForm<MutationUserUpdateEmailArgs>({
    defaultValues: { newEmail: user?.email },
  });
  const [, updateEmail] = useUpdateEmailMutation();
  const toast = useToast();

  const onSubmit = handleSubmit(async (data) => {
    const result = await updateEmail(data);
    if (result.error) {
      return toast({ status: "error", title: result.error.message });
    }
    reset({ newEmail: result.data?.userUpdateEmail?.email });
    toast({ status: "success", title: "Email updated" });
  });

  return (
    <Box as="form" onSubmit={onSubmit}>
      <Heading size="md" mb={3}>
        Email
      </Heading>

      <FormControl mb={2} isInvalid={!!errors.newEmail}>
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          {...register("newEmail", {
            required: true,
            pattern: {
              message: "Email format is invalid",
              value: /\S+@\S+\.\S+/,
            },
          })}
        />
        <FormHelperText>
          {!user?.emailVerified && (
            <>
              Not verified; check your inbox, or{" "}
              <Link>resend the verification email</Link>.
            </>
          )}
        </FormHelperText>
        <FormErrorMessage>{errors.newEmail?.message}</FormErrorMessage>
      </FormControl>

      <Fade in={isDirty} unmountOnExit>
        <FormControl mb={3} isInvalid={!!errors.password}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            {...register("password", { required: true })}
          />
        </FormControl>

        <Button type="submit" variant="outline">
          Save email
        </Button>
      </Fade>
    </Box>
  );
};

const UpdatePassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MutationUserUpdatePasswordArgs>();
  const [, updatePassword] = useUpdatePasswordMutation();
  const toast = useToast();

  const onSubmit = handleSubmit(async (data) => {
    const result = await updatePassword(data);
    if (result.error) {
      return toast({ status: "error", title: result.error.message });
    }
    reset();
    toast({ status: "success", title: "Password updated" });
  });

  return (
    <Box as="form" onSubmit={onSubmit}>
      <Heading size="md" mb={3}>
        Update password
      </Heading>

      <FormControl mb={2} isInvalid={!!errors.currentPassword}>
        <FormLabel>Current password</FormLabel>
        <Input
          type="password"
          {...register("currentPassword", { required: true })}
        />
      </FormControl>

      <FormControl mb={3} isInvalid={!!errors.newPassword}>
        <FormLabel>New password</FormLabel>
        <Input
          type="password"
          {...register("newPassword", {
            required: true,
            minLength: {
              message: "Password must be at least 8 characters",
              value: 8,
            },
          })}
        />
        <FormErrorMessage>{errors.newPassword?.message}</FormErrorMessage>
      </FormControl>

      <Button type="submit" variant="outline">
        Update password
      </Button>
    </Box>
  );
};

const DeleteAccount = () => {
  const [, deleteAccount] = useDeleteAccountMutation();
  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose,
  } = useDisclosure();

  const handleDeleteAccount = () => deleteAccount();

  return (
    <>
      <Heading size="md" mb={3}>
        Delete account
      </Heading>
      <FormLabel mb={2}>Careful, there&apos;s no coming back.</FormLabel>

      <Button colorScheme="red" onClick={onAlertOpen} variant="outline">
        Delete account
      </Button>

      <AccountDeleteAlert
        isOpen={isAlertOpen}
        onClose={onAlertClose}
        onConfirm={handleDeleteAccount}
      />
    </>
  );
};

type AccountDeleteAlertProps = {
  onClose: () => void;
  isOpen: boolean;
  onConfirm: () => void;
};

const AccountDeleteAlert: FC<AccountDeleteAlertProps> = ({
  onClose,
  isOpen,
  onConfirm,
}: AccountDeleteAlertProps) => {
  const cancelRef = useRef(null);

  return (
    <AlertDialog
      returnFocusOnClose={false}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>Delete account</AlertDialogHeader>
          <AlertDialogCloseButton />

          <AlertDialogBody>
            Your account will be permanently removed and cannot be recovered.
          </AlertDialogBody>

          <AlertDialogFooter>
            <ButtonGroup>
              <Button ref={cancelRef} onClick={onClose} variant="outline">
                Cancel
              </Button>

              <Button colorScheme="red" onClick={onConfirm} variant="outline">
                Delete account
              </Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
