import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition' // ts 需要引入

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right'

// CSSTransitionProps 第三方库中的type
type TransitionProps = CSSTransitionProps & {
  animation?: AnimationName,
  wrapper? : boolean,
}

const Transition: React.FC<TransitionProps> = (props) => {
  const {
    children,
    classNames,
    animation,
    wrapper,
    ...restProps
  } = props
  return (
    /*  
        in --显示组件；触发进入或退出状态
        unmountOnExit --动态添加/删除children元素，不需要display:none/block;
        appear --默认情况下，子组件在首次安装时不执行回车转换，而与的值无关in。如果您想要这种行为，请将appear和都设置in为true。
        <CSSTransition
          in={menuOpen}
          timeout={300}
          classNames="zoom-in-top"
          appear
          unmountOnExit
        >
          <ul className={subMenuClasses}>
            {childrenComponent}
          </ul>
        </CSSTransition>

        .zoom-in-top-enter {
          opacity: 0;
        }
        .zoom-in-top-enter-active {
          opacity: 1;
          transition: opacity 200ms;
        }
        .zoom-in-top-exit {
          opacity: 1;
        }
        .zoom-in-top-exit-active {
          opacity: 0;
          transition: opacity 200ms;
        }
    */
    <CSSTransition
      classNames = { classNames ? classNames : animation}
      {...restProps}
    >
      {/* wrapper 为了不让children里的transition与动画冲突，因为transition不会继承父节点 */}
      {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  )
}
Transition.defaultProps = {
  unmountOnExit: true,
  appear: true,
}

export default Transition