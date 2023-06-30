import { ChatInputPlaceholder } from '../../constants/text/text.en';
import './ChatInput.css';

interface ChatInputProps {
  onChatSubmit: (chatInputValue: string) => void;
}

export default function ChatInput({ onChatSubmit }: ChatInputProps) {

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const chatInputElement = e.currentTarget.children[0] as HTMLInputElement;
    const chatInputValue = chatInputElement.value?.trim();

    if (chatInputValue.length === 0) return;
    else {
      onChatSubmit(chatInputValue);
      chatInputElement.value = '';
    }
  }

  return (
    <form className='chat-input' onSubmit={handleSubmit}>
      <input type='text' name='chat-input' placeholder={ChatInputPlaceholder} />
      <button type='submit'>➤</button>
    </form>
  );
}
