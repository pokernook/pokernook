import {
  Box,
  Button,
  FormControl,
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

  const { data } = friendshipsQuery;

  return (
    <>
      {data?.me?.friendships.map((friendship) =>
        friendship.users.map(
          (friend) =>
            data.me?.id !== friend.id && (
              <Friend key={friend.id} friend={friend} />
            )
        )
      )}
    </>
  );
};

const AddFriend = () => {
  const { register, reset, handleSubmit } = useForm<{ tag: string }>();
  const [, sendFriendRequest] = useFriendRequestSendMutation();

  const onSubmit = handleSubmit(async ({ tag }) => {
    const userTag = parseUserTag(tag);
    const result = await sendFriendRequest(userTag);
    if (!result.error) {
      reset();
    }
  });

  return (
    <Box as="form" onSubmit={onSubmit}>
      <FormControl>
        <FormLabel>Add a friend with their PokerNook Tag</FormLabel>
        <HStack>
          <Input
            {...register("tag", { required: true, pattern: /^.+#\d{1,4}$/ })}
            spellCheck={false}
            placeholder="Enter a Username#0000"
          />

          <Button
            colorScheme="blue"
            w="xs"
            type="submit"
            rightIcon={<Icon as={FiSend} />}
          >
            Send request
          </Button>
        </HStack>
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
