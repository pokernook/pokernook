import { Button, ButtonProps } from "@chakra-ui/button";
import Link from "next/link";
import { useRouter } from "next/router";
import { pathToRegexp } from "path-to-regexp";
import { FC } from "react";

type NavLinkProps = ButtonProps & {
  exact?: boolean;
  href: string;
};

export const NavLink: FC<NavLinkProps> = ({
  exact = true,
  href,
  ...props
}: NavLinkProps) => {
  const { asPath } = useRouter();
  const isActive = pathToRegexp(href, [], { sensitive: true, end: exact }).test(
    asPath
  );

  return (
    <Link href={href}>
      <Button
        colorScheme="blue"
        justifyContent="flex-start"
        variant={isActive ? "solid" : "ghost"}
        {...props}
      />
    </Link>
  );
};
