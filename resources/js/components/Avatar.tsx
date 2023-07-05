import { md5 } from "@/helpers";
import { Image } from "@/components/elements/Image";
import classNames from "classnames";
import { BaseProps } from "@/types";

interface Props extends BaseProps {
  email: string,
  size: number
}

function Avatar({ email, size, className }: Props) {
  return (
    <div className="flex flex-col items-center">
      <Image
        className={classNames('w-8 h-8 rounded-full cursor-pointer', className)}
        src={`https://www.gravatar.com/avatar/${md5(email ?? '')}?s=${size}`}
        alt="Avatar"
      />
    </div>
  );
};

export { Avatar }
