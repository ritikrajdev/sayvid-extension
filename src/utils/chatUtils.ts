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
  const idCurrentPage = await getIdOfCurrentPage();
  return (await getFromStorage(`${idCurrentPage}_shouldChatOpen`))
    === 'true';
};

export const setShouldChatOpen = async (shouldChatOpen: boolean) => {
  const idCurrentPage = await getIdOfCurrentPage();
  await setInStorage(
    `${idCurrentPage}_shouldChatOpen`, String(shouldChatOpen));
};


export const getAllChats = async (): Promise<Chat[]> => {
  const idCurrentPage = await getIdOfCurrentPage();
  const allChatsString = await getFromStorage(`${idCurrentPage}_chats`);
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
  const idCurrentPage = await getIdOfCurrentPage();
  await setInStorage(`${idCurrentPage}_chats`, JSON.stringify(chats));
}
