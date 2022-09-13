export default function Layout({children}) {
    return (
      <div className="max-w-lg mx-auto border-l border-r border-twitterBorder min-h-screen"
        style={{border:"1px solid #2f3336"}}
      >
        {children}
      </div>
    );
  }