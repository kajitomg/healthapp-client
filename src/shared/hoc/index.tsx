import React, { ComponentType } from 'react';

interface InjectedProps {
  username: string;
}

function withUsername<T extends InjectedProps>(
  WrappedComponent: ComponentType<T>
) {
  const username = 'JohnDoe'; // Здесь можно получить username из API или другого источника
  
  return (props: Omit<T, keyof InjectedProps>) => {
    return <WrappedComponent {...props as T} username={username} />;
  };
}

interface Props {
  age: number;
  username: string;
}

const InfoComponent: React.FC<Props> = ({ age, username }) => {
  return (
    <div>
      <p>Username: {username}</p>
      <p>Age: {age}</p>
    </div>
  );
};

const EnhancedInfoComponent = withUsername(InfoComponent);

const App: React.FC = () => {
  return <EnhancedInfoComponent age={25} />;
};

export default App;