import gql from 'graphql-tag';

export const POST_MESSAGE = gql`
    mutation MessagePost(
        $channelId: ChannelId!
        $text: String!
        $userId: UserId!
    ) {
        MessagePost(
            channelId: $channelId
            text: $text
            userId: $userId
        ) {
            messageId
            text
            datetime
            userId
        }
    }
`;