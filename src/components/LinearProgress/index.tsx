import './LinearProgress.css';

interface LinearProgressProps {
  style?: object;
}

export default function LinearProgress({style={}}: LinearProgressProps) {
  return (
    <div className='linear-progress' style={style}>
      <div className='indeterminate' />
    </div>
  );
}
