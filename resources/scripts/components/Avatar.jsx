import { md5 } from "@/helpers";
import { Image } from "@/components/elements/Image";

function Avatar({email, size}) {
  return (
    <div className="flex flex-col items-center">
      <Image
        className="w-8 h-8 rounded-full cursor-pointer"
        src={`https://www.gravatar.com/avatar/${md5(email)}?s=${size}`}
        alt="Avatar"
      />
    </div>
  );
};

export { Avatar }
