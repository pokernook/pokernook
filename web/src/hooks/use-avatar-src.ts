import { useMemo } from "react";

import { UserFieldsFragment } from "../graphql";
import { generateAvatarSvg } from "../utils/generate-avatar";

export const useAvatarSrc = (
  user?: UserFieldsFragment | null
): string | undefined =>
  useMemo(() => {
    return generateAvatarSvg(user?.id || "");
  }, [user?.id]);
