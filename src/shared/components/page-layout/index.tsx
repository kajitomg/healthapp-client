import {cn} from '@bem-react/classname';
import {forwardRef, memo, ReactNode} from "react";
import './styles.scss';

interface PageLayoutProps {
  
  header?:ReactNode,
  
  children?:ReactNode,
  
  footer?:ReactNode,
  
  className?:string
  
}

const cnPageLayout = cn('PageLayout')
const PageLayout = memo(forwardRef<HTMLDivElement,PageLayoutProps>((props,ref) => {
  return (
    <div className={cnPageLayout({},[props.className])} ref={ref}>
      <div className={cnPageLayout('header')}>{props.header}</div>
      <div className={cnPageLayout('content')}>
        {props.children}
        <div className={cnPageLayout('footer')}>{props.footer}</div>
      </div>
    </div>
  );
}));

export {PageLayout};