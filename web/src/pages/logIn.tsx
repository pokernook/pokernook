import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link as ChakraLink,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";
import { useForm } from "react-hook-form";

import { AuthLayout } from "../components/AuthLayout";
import { Card } from "../components/Card";
import { LogInMutationVariables, useLogInMutation } from "../graphql";

const LogIn: FC = () => {
  const { register, handleSubmit } = useForm<LogInMutationVariables>();
  const [logInResult, logIn] = useLogInMutation();

  const onSubmit = handleSubmit((data) => logIn(data));

  return (
    <AuthLayout>
      <Heading size="md" mb={3}>
        Enter the &apos;Nook
      </Heading>

      <Card minW={340} textAlign="center">
        <Box as="form" onSubmit={onSubmit}>
          <FormControl mb={2}>
            <FormLabel>Email</FormLabel>
            <Input type="email" {...register("email", { required: true })} />
          </FormControl>

          <FormControl mb={3}>
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
          <Link href="/signUp" passHref>
            <ChakraLink>Sign up</ChakraLink>
          </Link>
          .
        </Text>
      </Card>
    </AuthLayout>
  );
};

export default LogIn;
