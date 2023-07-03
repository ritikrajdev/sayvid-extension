import { useState, useEffect, useRef, useContext } from 'react';
import Chat from '../../components/Chat';
import ChatInput from '../../components/ChatInput';
import ToggleSwitch from '../../components/ToggleSwitch';
import { BrandName } from '../../constants/text/text.en';
import './Main.css';
import {
  Chat as ChatType,
  getAllChats,
  getChatResponse,
  getShouldChatOpen,
  setAllChats,
  setShouldChatOpen as setChatOpen
} from '../../utils/chatUtils';
import { ErrorContext } from '../../contexts/errorContext';
import { getUrlOfCurrentPage } from '../../utils/general';

export default function Main() {
  const [shouldChatOpen, setShouldChatOpen] = useState(false);
  const [chats, setChats] = useState<ChatType[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>({} as HTMLDivElement);
  const { setError } = useContext(ErrorContext);
  const [url, setUrl] = useState('');

  useEffect(() => {
    getUrlOfCurrentPage().then(setUrl).catch(console.error);
  }, []);

  const isChattingDisabled = ! /youtube\.com\/watch\?v=.{11}/.test(url);

  const toggleChatOpen = () => {
    if(isChattingDisabled) {
      return;
    }

    setShouldChatOpen(!shouldChatOpen);
    setChatOpen(!shouldChatOpen);
  };

  const addToChats = (text: string, isMe = true, save = false) => {
    setChats(chats => {
      const allChats = [...chats, { text, isMe }];

      if (save) {
        setAllChats(allChats);
      }
      return allChats;
    });
  };

  useEffect(() => {
    getShouldChatOpen().then(shouldChatOpen => {
      setShouldChatOpen(shouldChatOpen);
    });
  }, []);

  useEffect(() => {
    chatContainerRef.current.scrollTop =
      chatContainerRef.current.scrollHeight;
  }, [chats]);

  useEffect(() => {
    if (shouldChatOpen) {
      getAllChats().then(setChats);
    }
  }, [shouldChatOpen]);

  return (
    <div className='main-app'>
      {url}
      <div className='top-row'>
        <h1 className='brand-logo'>
          {BrandName}
        </h1>
        <ToggleSwitch
          id='toggle-chat'
          onChange={toggleChatOpen}
          checked={shouldChatOpen}
          disabled={isChattingDisabled}
        />
      </div>
      {
        shouldChatOpen &&
        <>
          <hr className='divider' />
          <div className='chats-container' ref={chatContainerRef}>
            {
              chats.map((chat, index) => (
                <Chat key={index} text={chat.text} isMe={chat.isMe} />
              ))
            }
          </div>
          <ChatInput onChatSubmit={(ChatInputValue) => {
            addToChats(ChatInputValue);
            getChatResponse(ChatInputValue, setError).then((response) => {
              if (![undefined, null].includes(response)) {
                addToChats(response, false, true);
              }
            });
          }} />
        </>
      }
    </div>
  );
}
