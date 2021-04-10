import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
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
import { SignUpMutationVariables, useSignUpMutation } from "../graphql";

const SignUp: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpMutationVariables>();
  const [signUpResult, signUp] = useSignUpMutation();
  const toast = useToast();

  const onSubmit = handleSubmit(async (data) => {
    const result = await signUp(data);
    if (result.error) {
      toast({ status: "error", title: result.error.message });
    }
  });

  return (
    <AuthLayout>
      <Heading size="md" mb={3}>
        Create your account
      </Heading>

      <Card minW={340} textAlign="center">
        <Box as="form" onSubmit={onSubmit}>
          <FormControl mb={2} isInvalid={!!errors.username}>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              spellCheck={false}
              {...register("username", {
                required: true,
                minLength: {
                  message: "Username must be at least 3 characters",
                  value: 3,
                },
                maxLength: {
                  message: "Username must be at most 20 characters",
                  value: 20,
                },
              })}
            />
            <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
          </FormControl>

          <FormControl mb={2} isInvalid={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              {...register("email", {
                required: true,
                pattern: {
                  message: "Email format is invalid",
                  value: /\S+@\S+\.\S+/,
                },
              })}
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>

          <FormControl mb={3} isInvalid={!!errors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              {...register("password", {
                required: true,
                minLength: {
                  message: "Password must be at least 8 characters",
                  value: 8,
                },
              })}
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>

          <Button
            colorScheme="blue"
            type="submit"
            isLoading={signUpResult.fetching}
            isFullWidth
          >
            Sign up for PokerNook
          </Button>
        </Box>
      </Card>

      <Card mt={3} minW={340} textAlign="center">
        <Text>
          Been here before?{" "}
          <Link href="/logIn" passHref>
            <ChakraLink>Log in</ChakraLink>
          </Link>
          .
        </Text>
      </Card>
    </AuthLayout>
  );
};

export default SignUp;
