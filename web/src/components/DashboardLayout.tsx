import { Box, Center, Grid } from "@chakra-ui/react";
import Head from "next/head";
import { FC, ReactNode } from "react";

import { useUser } from "../hooks/use-user";
import { Loading } from "./Loading";
import { SideNav } from "./SideNav";
import { TopNav } from "./TopNav";

type DashboardLayoutProps = {
  children: ReactNode;
};

export const DashboardLayout: FC<DashboardLayoutProps> = ({
  children,
}: DashboardLayoutProps) => {
  const { fetching, user } = useUser({ hrefIfAbsent: "/logIn" });

  if (fetching || !user) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>PokerNook</title>
      </Head>

      <Grid
        templateColumns="auto"
        gap={0}
        templateRows="50px auto min-content"
        h="100vh"
        w="100vw"
      >
        <TopNav />
        <Grid
          templateColumns={[2, "280px 1fr"]}
          templateRows="auto"
          gap={0}
          position="relative"
          overflow="hidden"
        >
          <Box as="aside" bg="sideNav" borderRightWidth={1} py={3}>
            <SideNav />
          </Box>

          <Box as="main" minW={0} minH={0} overflow="auto">
            <Center>{children}</Center>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
