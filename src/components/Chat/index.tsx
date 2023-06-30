import './Chat.css';

interface ChatProps {
  text: string;
  isMe?: boolean;
}

export default function Chat({ text, isMe=false }: ChatProps) {
  return (
    <div style={{
      textAlign: isMe ? 'right' : 'left',
    }}>
      <span className={`chat ${isMe && 'my-chat'}`}>
        {text}
      </span>
    </div>
  );
}
