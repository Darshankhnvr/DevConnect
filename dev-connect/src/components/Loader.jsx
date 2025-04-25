const Loader = ({ size = 'md' }) => {
    const sizes = {
      sm: 'h-4 w-4',
      md: 'h-8 w-8',
      lg: 'h-12 w-12'
    };
  
    return (
      <div className="flex space-x-2 justify-center items-center py-8">
        <div className={`${sizes[size]} bg-blue-500 rounded-full animate-pulse`}></div>
        <div 
          className={`${sizes[size]} bg-blue-500 rounded-full animate-pulse`}
          style={{ animationDelay: '0.2s' }}
        ></div>
        <div 
          className={`${sizes[size]} bg-blue-500 rounded-full animate-pulse`}
          style={{ animationDelay: '0.4s' }}
        ></div>
      </div>
    );
  };
  
  export default Loader;