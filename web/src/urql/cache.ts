import { ResolverConfig, UpdatesConfig } from "@urql/exchange-graphcache";

import * as graphql from "../graphql";

export const resolvers: ResolverConfig = {
  User: {
    discriminator: (parent) =>
      `#${parent.discriminator?.toString().padStart(4, "0") || ""}`,
  },
};

export const updates: Partial<UpdatesConfig> = {
  Mutation: {
    userLogIn: (result, _args, cache) => {
      cache.updateQuery(
        { query: graphql.MeDocument },
        (data: graphql.MeQuery | null) => {
          const castResult = result as graphql.LogInMutation;
          if (data) {
            data.me = castResult.userLogIn?.user || null;
          }
          return data;
        }
      );
    },

    userSignUp: (result, _args, cache) => {
      cache.updateQuery(
        { query: graphql.MeDocument },
        (data: graphql.MeQuery | null) => {
          const castResult = result as graphql.SignUpMutation;
          if (data) {
            data.me = castResult.userSignUp?.user || null;
          }
          return data;
        }
      );
    },

    userLogOut: () => location.reload(),

    userDeleteAccount: () => location.reload(),

    userStatusClear: (_result, _args, cache) => {
      cache.updateQuery(
        { query: graphql.MeDocument },
        (data: graphql.MeQuery | null) => {
          if (data?.me) {
            data.me.status = null;
          }
          return data;
        }
      );
    },

    friendRequestSend: (result, _args, cache) => {
      cache.updateQuery(
        { query: graphql.FriendRequestsSentDocument },
        (data: graphql.FriendRequestsSentQuery | null) => {
          const castResult = result as graphql.FriendRequestSendMutation;
          if (!castResult.friendRequestSend) {
            return data;
          }
          data?.me?.friendRequestsSent.push(castResult.friendRequestSend);
          return data;
        }
      );
    },

    friendRequestCancel: (result, _args, cache) => {
      cache.updateQuery(
        { query: graphql.FriendRequestsSentDocument },
        (data: graphql.FriendRequestsSentQuery | null) => {
          const castResult = result as graphql.FriendRequestCancelMutation;
          if (data?.me) {
            const cancelledIndex = data.me.friendRequestsSent.findIndex(
              (f) => f.id === castResult.friendRequestCancel?.id
            );
            data.me.friendRequestsSent.splice(cancelledIndex, 1);
          }
          return data;
        }
      );
    },

    friendRequestReject: (result, _args, cache) => {
      cache.updateQuery(
        { query: graphql.FriendRequestsReceivedDocument },
        (data: graphql.FriendRequestsReceivedQuery | null) => {
          const castResult = result as graphql.FriendRequestRejectMutation;
          if (data?.me) {
            const rejectedIndex = data.me.friendRequestsReceived.findIndex(
              (f) => f.id === castResult.friendRequestReject?.id
            );
            data.me.friendRequestsReceived.splice(rejectedIndex, 1);
          }
          return data;
        }
      );
    },

    friendRequestAccept: (result, _args, cache) => {
      cache.updateQuery(
        { query: graphql.FriendRequestsReceivedDocument },
        (data: graphql.FriendRequestsReceivedQuery | null) => {
          const castResult = result as graphql.FriendRequestAcceptMutation;
          if (data?.me) {
            const acceptedIndex = data.me.friendRequestsReceived.findIndex(
              (f) => f.id === castResult.friendRequestAccept?.id
            );
            data.me.friendRequestsReceived.splice(acceptedIndex, 1);
          }
          return data;
        }
      );
      cache.invalidate("Query", "friendships");
    },
  },
};
