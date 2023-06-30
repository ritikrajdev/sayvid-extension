import { useState, useEffect, useRef } from 'react';
import Chat from '../../components/Chat';
import ChatInput from '../../components/ChatInput';
import ToggleSwitch from '../../components/ToggleSwitch';
import { BrandName } from '../../constants/text/SayVid.en';
import './Main.css';
import {
  Chat as ChatType,
  getAllChats,
  getChatResponse,
  getShouldChatOpen,
  setAllChats,
  setShouldChatOpen as setChatOpen
} from '../../utils/chatUtils';

export default function Main() {
  const [shouldChatOpen, setShouldChatOpen] = useState(false);
  const [chats, setChats] = useState<ChatType[]>([]);
  const chatContainerRef = useRef(null);

  const toggleChatOpen = () => {
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
      if (shouldChatOpen && chats.length === 0)
        getAllChats().then(setChats);
    });
  }, []);

  useEffect(() => {
    (chatContainerRef.current as any)?.
      addEventListener(
        'DOMNodeInserted',
        (event: React.ChangeEvent<HTMLDivElement>) => {
          const { currentTarget: target } = event;
          target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
        }
      );
  }, [chatContainerRef]);

  return (
    <div className='main-app'>
      <div className='top-row'>
        <h1 className='brand-logo'>
          {BrandName}
        </h1>
        <ToggleSwitch
          id='toggle-chat' onChange={toggleChatOpen} checked={shouldChatOpen} />
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
            getChatResponse(ChatInputValue).then((response) => {
              addToChats(response, false, true);
            });
          }} />
        </>
      }
    </div>
  );
}
