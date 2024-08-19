import { TailSpin } from 'react-loader-spinner';

type CircleProps = {
  center: boolean;
};

const Circle: React.FC<CircleProps> = ({ center }) => {
  const circleStyle = {
    display: 'flex',
    justifyContent: 'center',
    margin: center ? '40vh auto' : '5% auto'
    
  };
  return (
    <div style={circleStyle}>
      <TailSpin
        visible={true}
        height="60"
        width="60"
        color="var(--sub-color)"
        ariaLabel="tail-spin-loading"
        radius="0"
      />
    </div>
  );
};

export default Circle;
