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
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Link,
  useDisclosure,
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
    formState,
    reset,
  } = useForm<MutationUserUpdateEmailArgs>({
    defaultValues: { newEmail: user?.email },
  });
  const [, updateEmail] = useUpdateEmailMutation();

  const { isDirty } = formState;

  const onSubmit = handleSubmit(async (data) => {
    const result = await updateEmail(data);
    if (!result.error) {
      reset({ newEmail: result.data?.userUpdateEmail?.email });
    }
  });

  return (
    <Box as="form" onSubmit={onSubmit}>
      <Heading size="md" mb={3}>
        Email
      </Heading>

      <FormControl mb={2}>
        <FormLabel>Email address</FormLabel>
        <Input type="email" {...register("newEmail", { required: true })} />
        <FormHelperText>
          {!user?.emailVerified && (
            <>
              Not verified; check your inbox, or{" "}
              <Link>resend the verification email</Link>.
            </>
          )}
        </FormHelperText>
      </FormControl>

      <Fade in={isDirty} unmountOnExit>
        <FormControl mb={3}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            {...register("password", { required: true })}
          />
        </FormControl>

        <Button type="submit">Save email</Button>
      </Fade>
    </Box>
  );
};

const UpdatePassword = () => {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<MutationUserUpdatePasswordArgs>();
  const [, updatePassword] = useUpdatePasswordMutation();

  const onSubmit = handleSubmit(async (data) => {
    const result = await updatePassword(data);
    if (!result.error) {
      reset();
    }
  });

  return (
    <Box as="form" onSubmit={onSubmit}>
      <Heading size="md" mb={3}>
        Update password
      </Heading>

      <FormControl mb={2}>
        <FormLabel>Current password</FormLabel>
        <Input
          type="password"
          {...register("currentPassword", { required: true })}
        />
      </FormControl>

      <FormControl mb={3}>
        <FormLabel>New password</FormLabel>
        <Input
          type="password"
          {...register("newPassword", { required: true })}
        />
      </FormControl>

      <Button type="submit">Update password</Button>
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

      <Button colorScheme="red" onClick={onAlertOpen}>
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
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>

              <Button colorScheme="red" onClick={onConfirm}>
                Delete account
              </Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
