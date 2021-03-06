import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Input,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from "@chakra-ui/react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { FiSend } from "react-icons/fi";

import { DashboardLayout } from "../components/DashboardLayout";
import {
  Friend,
  FriendRequestReceived,
  FriendRequestSent,
} from "../components/Friends";
import {
  useFriendRequestAcceptMutation,
  useFriendRequestCancelMutation,
  useFriendRequestRejectMutation,
  useFriendRequestSendMutation,
  useFriendRequestsReceivedQuery,
  useFriendRequestsSentQuery,
  useFriendshipDeleteMutation,
  useFriendshipsQuery,
} from "../graphql";
import { parseUserTag } from "../utils/parse-user-tag";

const Friends: FC = () => (
  <DashboardLayout>
    <Box w="4xl" pt={10}>
      <Heading mb={2}>Friends</Heading>

      <Tabs orientation="horizontal">
        <TabList>
          <Tab>All friends</Tab>
          <Tab>Pending requests</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Stack>
              <AllFriends />
            </Stack>
          </TabPanel>

          <TabPanel>
            <AddFriend />
            <Stack mt={3}>
              <SentRequests />
              <ReceivedRequests />
            </Stack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  </DashboardLayout>
);

const AllFriends = () => {
  const [friendshipsQuery] = useFriendshipsQuery();
  const [, friendshipDelete] = useFriendshipDeleteMutation();

  const { data } = friendshipsQuery;

  return (
    <>
      {data?.me?.friendships.map((friendship) =>
        friendship.users.map(
          (friend) =>
            data.me?.id !== friend.id && (
              <Friend
                key={friend.id}
                friend={friend}
                onRemove={() =>
                  friendshipDelete({ friendshipId: friendship.id })
                }
              />
            )
        )
      )}
    </>
  );
};

const AddFriend = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { dirtyFields, errors },
  } = useForm<{ tag: string }>({ defaultValues: { tag: "" } });
  const [, sendFriendRequest] = useFriendRequestSendMutation();
  const toast = useToast();

  const onSubmit = handleSubmit(async ({ tag }) => {
    const userTag = parseUserTag(tag);
    const result = await sendFriendRequest(userTag);
    if (result.error) {
      return toast({ status: "error", title: result.error.message });
    }
    reset();
  });

  return (
    <Box as="form" onSubmit={onSubmit}>
      <FormControl isInvalid={dirtyFields.tag && !!errors.tag}>
        <FormLabel>Add a friend with their PokerNook Tag</FormLabel>
        <HStack>
          <Input
            {...register("tag", {
              required: true,
              pattern: {
                message: "Tag is invalid; try Username#0000",
                value: /^.+#\d{1,4}$/,
              },
            })}
            spellCheck={false}
            placeholder="Enter a Username#0000"
          />

          <Button
            colorScheme="blue"
            w="xs"
            type="submit"
            variant="outline"
            rightIcon={<Icon as={FiSend} />}
          >
            Send request
          </Button>
        </HStack>
        <FormErrorMessage>{errors.tag?.message}</FormErrorMessage>
      </FormControl>
    </Box>
  );
};

const SentRequests = () => {
  const [friendRequestsSentQuery] = useFriendRequestsSentQuery();
  const [, cancelFriendRequest] = useFriendRequestCancelMutation();

  const { data: friendRequestsSent } = friendRequestsSentQuery;

  return (
    <>
      {friendRequestsSent?.me?.friendRequestsSent.map((friendRequest) => (
        <FriendRequestSent
          key={friendRequest.id}
          onCancel={() =>
            cancelFriendRequest({ friendRequestId: friendRequest.id })
          }
          friendRequest={friendRequest}
        />
      ))}
    </>
  );
};

const ReceivedRequests = () => {
  const [friendRequestsReceivedQuery] = useFriendRequestsReceivedQuery();
  const [, rejectFriendRequest] = useFriendRequestRejectMutation();
  const [, acceptFriendRequest] = useFriendRequestAcceptMutation();

  const { data: friendRequestsReceived } = friendRequestsReceivedQuery;

  return (
    <>
      {friendRequestsReceived?.me?.friendRequestsReceived.map(
        (friendRequest) => (
          <FriendRequestReceived
            key={friendRequest.id}
            onAccept={() =>
              acceptFriendRequest({ friendRequestId: friendRequest.id })
            }
            onReject={() =>
              rejectFriendRequest({ friendRequestId: friendRequest.id })
            }
            friendRequest={friendRequest}
          />
        )
      )}
    </>
  );
};

export default Friends;
