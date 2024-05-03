import { MenuIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

const header = () => {
  return (
    <div className="flex justify-between pt-6 px-5">
      <Image src="/logo.svg" alt="Fsw food" height={30} width={100}/>
      <Button
        size="icon"
        variant="outline"
        className="border-none bg-transparent"
      >
        <MenuIcon />
      </Button>
    </div>
  )
}

export default header;
