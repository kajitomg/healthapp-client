import {cn} from '@bem-react/classname';
import {memo, ReactNode} from "react";
import './styles.scss';

interface PageLayoutProps {
  
  header?:ReactNode,
  
  children?:ReactNode,
  
  footer?:ReactNode,
  
  className?:string
  
}

const cnPageLayout = cn('PageLayout')
const PageLayout = memo((props:PageLayoutProps) => {
  return (
    <div className={cnPageLayout({},[props.className])}>
      <div className={cnPageLayout('header')}>{props.header}</div>
      <div className={cnPageLayout('content')}>
        {props.children}
        <div className={cnPageLayout('footer')}>{props.footer}</div>
      </div>
    </div>
  );
});

export {PageLayout};