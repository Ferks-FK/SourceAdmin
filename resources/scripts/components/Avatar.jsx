import { md5 } from "@/helpers";

function Avatar({email}) {
  return (
    <div>
      <img
        className="ml-2 w-8 h-8 rounded-full cursor-pointer"
        src={`https://www.gravatar.com/avatar/${md5(email)}`}
        alt="Avatar"
      />
    </div>
  );
};

export { Avatar }
