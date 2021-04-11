import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link as ChakraLink,
  Text,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";
import { useForm } from "react-hook-form";

import { AuthLayout } from "../components/AuthLayout";
import { Card } from "../components/Card";
import { LogInMutationVariables, useLogInMutation } from "../graphql";

const LogIn: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInMutationVariables>();
  const [logInResult, logIn] = useLogInMutation();
  const toast = useToast();

  const onSubmit = handleSubmit(async (data) => {
    const result = await logIn(data);
    if (result.error) {
      toast({ status: "error", title: result.error.message });
    }
  });

  return (
    <AuthLayout>
      <Heading size="md" mb={3}>
        Enter the &apos;Nook
      </Heading>

      <Card minW={340} textAlign="center">
        <Box as="form" onSubmit={onSubmit}>
          <FormControl mb={2} isInvalid={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Input type="email" {...register("email", { required: true })} />
          </FormControl>

          <FormControl mb={3} isInvalid={!!errors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              {...register("password", { required: true })}
            />
          </FormControl>

          <Button
            colorScheme="blue"
            type="submit"
            isLoading={logInResult.fetching}
            isFullWidth
          >
            Log in to PokerNook
          </Button>
        </Box>
      </Card>

      <Card mt={3} minW={340} textAlign="center">
        <Text>
          New &apos;round these parts?{" "}
          <Link href="/" passHref>
            <ChakraLink>Sign up</ChakraLink>
          </Link>
          .
        </Text>
      </Card>
    </AuthLayout>
  );
};

export default LogIn;
