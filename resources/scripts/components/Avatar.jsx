import { md5 } from "@/helpers";
import { Image } from "@/components/elements/Image";

function Avatar({email}) {
  return (
    <div>
      <Image
        className="ml-2 w-8 h-8 rounded-full cursor-pointer"
        src={`https://www.gravatar.com/avatar/${md5(email)}`}
        alt="Avatar"
      />
    </div>
  );
};

export { Avatar }
