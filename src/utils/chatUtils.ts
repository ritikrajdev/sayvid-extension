import { getIdOfCurrentPage } from './general';
import { InitialChatText } from '../constants/text/text.en';
import { getFromStorage, setInStorage } from './storageUtils';
import { makeRequest } from './makeRequest';
import { POST_CHAT } from '../constants/apiEndpoints';

export interface Chat {
  text: string;
  isMe: boolean;
}

export const getChatResponse = async (
  message: string, errorHandler: (errorMessage: string) => any) => {
  const chatResponseData =
    await makeRequest(POST_CHAT({ message }), errorHandler);
  return chatResponseData?.message;
};


export const getShouldChatOpen = async () => {
  return (await getFromStorage(`${getIdOfCurrentPage()}_shouldChatOpen`))
    === 'true';
};

export const setShouldChatOpen = async (shouldChatOpen: boolean) => {
  setInStorage(
    `${getIdOfCurrentPage()}_shouldChatOpen`, String(shouldChatOpen));
};


export const getAllChats = async (): Promise<Chat[]> => {
  const allChatsString = await getFromStorage(`${getIdOfCurrentPage()}_chats`);
  const allChats = allChatsString ?
    (JSON.parse(allChatsString) as Chat[]) : null;

  return allChats ?? [
    {
      text: InitialChatText,
      isMe: false
    }
  ];
};

export async function setAllChats(chats: Chat[]) {
  setInStorage(`${getIdOfCurrentPage()}_chats`, JSON.stringify(chats));
}
