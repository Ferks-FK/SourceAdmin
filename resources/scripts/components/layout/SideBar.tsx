import { useEffect, useState } from "react";

function SideBar() {
  const [isLogged, setIsLoggeg] = useState(false)

  const handleLogin = () => {
    setIsLoggeg(true)
    localStorage.setItem('user', '123456')
  }

  useEffect(() => {
    const isLogged = localStorage.getItem("user");

    if (isLogged) {
      setIsLoggeg(true)
    }
  }, [])

  return (
    <>
      <div className="w-full h-full z-10 md:w-1/4 md:left-0 md:static md:max-w-sm bg-dark fixed menu-mobile-hidden transition-all ease-in-out duration-300">
        <div className="flex flex-col p-3 h-full">
          { isLogged ? <h1>Seja bem bindo</h1> : <button onClick={handleLogin}>Logar</button> }
        </div>
      </div>
    </>
  );
};

export { SideBar };
