import gql from 'graphql-tag';

export const LATEST_MESSAGES = gql`
    query MessagesFetchLatest($channelId: ChannelId!) {
        MessagesFetchLatest(channelId: $channelId) {
            messageId
            text
            datetime
            userId
        }
    }
`;