import gql from 'graphql-tag';

export const FETCH_MORE_MESSAGES = gql`
    query MessagesFetchMore(
        $channelId: ChannelId!
        $messageId: String!
        $old: Boolean!
    ) {
        MessagesFetchMore(
            channelId: $channelId
            messageId: $messageId
            old: $old
        ) {
            messageId
            text
            datetime
            userId
        }
    }
`;
