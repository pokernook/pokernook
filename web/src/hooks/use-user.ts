import { useRouter } from "next/router";
import { useEffect } from "react";

import { useMeQuery, UserFieldsFragment } from "../graphql";

type UseUserArgs = {
  hrefIfAbsent?: string;
  hrefIfFound?: string;
};

type UseUserReturn = {
  user: UserFieldsFragment | null | undefined;
  fetching: boolean;
};

export const useUser = ({
  hrefIfAbsent = "",
  hrefIfFound = "",
}: UseUserArgs = {}): UseUserReturn => {
  const router = useRouter();
  const [meQuery] = useMeQuery();
  const { data, fetching } = meQuery;

  useEffect(() => {
    if (fetching) {
      return;
    }

    if (!data?.me && hrefIfAbsent) {
      return void router.push(hrefIfAbsent);
    }
    if (data?.me && hrefIfFound) {
      return void router.push(hrefIfFound);
    }
  }, [hrefIfAbsent, hrefIfFound, data?.me, fetching, router]);

  return { user: data?.me, fetching };
};
