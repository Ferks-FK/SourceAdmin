import { md5 } from "@/helpers";
import { Image } from "@/components/elements/Image";

function Avatar({email, size}) {
  console.log(`${md5("fernandokaiquecnp2014@gmail.com")}`)
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
