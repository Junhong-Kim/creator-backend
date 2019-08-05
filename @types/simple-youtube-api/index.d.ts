declare module "simple-youtube-api" {
  class YouTube {
    constructor(key: string);
    public searchChannels(query: string, limit?: number, options?: object): Promise<Channel[]>;
  }

  export class Channel {
    public type: string;
    public raw: {
      id: {
        kind: string,
        channelId: string
      },
      snippet: {
        publishedAt: string,
        channelId: string,
        title: string,
        description: string,
        thumbnails: {
          default: {
            url: string
          },
          medium: {
            url: string
          },
          high: {
            url: string
          }
        },
        channelTitle: string,
        liveBroadcastContent: string,
      }
    };
    public full: boolean;
    public kind: string;
    public id: string;
  }

  export default YouTube;
}
