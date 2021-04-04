type UserTagReturn = {
  username: string;
  discriminator: number;
};

export const parseUserTag = (tag: string, sep = "#"): UserTagReturn => {
  const usernameSlice = tag.slice(0, tag.lastIndexOf(sep));
  const discriminatorSlice = tag.slice(tag.lastIndexOf(sep) + 1) || undefined;
  const discriminator = Number(discriminatorSlice);
  return { username: usernameSlice, discriminator };
};
