import { useUserStore } from "@/stores/user";

function SideBar() {
  const [ userData ] = useUserStore((state) => [state.data]);
  const isLogged = userData !== undefined;

  return (
    <>
      <div className="w-full h-full z-10 md:w-1/4 md:left-0 md:static md:max-w-sm bg-dark fixed menu-mobile-hidden transition-all ease-in-out duration-300">
        <div className="flex flex-col p-3 h-full">
          { isLogged ? <h1>Seja bem bindo</h1> : <button onClick={() => {console.log("logou")}}>Logar</button> }
        </div>
      </div>
    </>
  );
};

export { SideBar };
