import { LobbyClient } from "boardgame.io/client";
import { createContext, FC, ReactNode, useContext } from "react";

const LobbyContext = createContext<LobbyClient | undefined>(undefined);

type LobbyProviderProps = {
  children: ReactNode;
  server: string;
};

export const LobbyProvider: FC<LobbyProviderProps> = ({
  children,
  server,
}: LobbyProviderProps) => {
  const lobbyClient = new LobbyClient({ server });

  return (
    <LobbyContext.Provider value={lobbyClient}>
      {children}
    </LobbyContext.Provider>
  );
};

export const useLobby = (): LobbyClient => {
  const context = useContext(LobbyContext);
  if (!context) {
    throw new Error("useLobby must be used within a LobbyProvider");
  }
  return context;
};
