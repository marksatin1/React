import './Window.css';

const Window = ({ className, title, children }) => {
  return (
    <div className={className}>
      <h5 className='title'>{title}</h5>
      <div>{children}</div>
    </div>
  );
};

export default Window;
