import { IconSound } from "assets/icons";
import { useAudio } from "common/hooks";
import { Button } from "../button";

interface AudioButtonProps {
  url: string;
  className?: string;
}

export const AudioButton = ({ url, className }: AudioButtonProps) => {
  const { toggle, playing } = useAudio(url);

  return (
    <Button className={className} disabled={playing} onlyIcon={true} onClick={toggle}>
      <IconSound aria-hidden={true} />
    </Button>
  );
};
