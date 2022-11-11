import { render, fireEvent, screen } from "test-utils";
import { AudioButton } from "./audio-button";
import * as AudioHook from "../../hooks/audio.hook";

describe("<AudioButton />", () => {
  it("should play a mp3", () => {
    const mockToggle = jest.fn();
    jest.spyOn(AudioHook, "useAudio").mockImplementation(() => ({
      playing: false,
      toggle: mockToggle,
    }));

    render(<AudioButton url="irrelevant-url.mp3" />);
    fireEvent.click(screen.getByRole("button"));

    expect(mockToggle).toHaveBeenCalled();
  });
});
