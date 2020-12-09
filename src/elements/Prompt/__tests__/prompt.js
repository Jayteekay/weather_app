import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Prompt from "..";

jest.mock("../../../utils/asset-vectors-loader");

describe("Prompt", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render Prompt with message props", () => {
    const message = "message";
    render(<div id="promptContainer"></div>);
    render(<Prompt message={message} />);
    const prompt = screen.queryByText(message);
    expect(prompt).toBeInTheDocument();
  });
  it("should call onClose prop when close button is clicked", async () => {
    const message = "test";
    const onClick = jest.fn();
    render(<div id="promptContainer"></div>);
    render(
      <>
        <div id="promptContainer"></div>
        <Prompt message={message} onClose={onClick} />
      </>
    );
    const close = screen.getByTestId("prompt-close");
    userEvent.click(close);
    await waitFor(() => expect(onClick).toHaveBeenCalledTimes(1));
  });
  it("should contain acceptMessage text in a button when acceptMessage and onAccept is set", async () => {
    const message = "test";
    const acceptMessage = "Accept";
    const onAccept= jest.fn();
    render(<div id="promptContainer"></div>);
    render(
      <>
        <div id="promptContainer"></div>
        <Prompt message={message} acceptMessage={acceptMessage} onAccept={onAccept} />
      </>
    );
    const acceptButton = screen.queryByText(acceptMessage);
    expect(acceptButton).toBeInTheDocument();
  });
  it("should call onAccept when acceptMessage and onAccept is set and accept button is clicked", async () => {
    const message = "test";
    const acceptMessage = "Accept";
    const onAccept= jest.fn();
    render(<div id="promptContainer"></div>);
    render(
      <>
        <div id="promptContainer"></div>
        <Prompt message={message} acceptMessage={acceptMessage} onAccept={onAccept} />
      </>
    );
    const acceptButton = screen.queryByText(acceptMessage);
    userEvent.click(acceptButton);
    await waitFor(() => expect(onAccept).toHaveBeenCalledTimes(1));
  });
  it("should call onClose after duration has passed given duration as props", async () => {
    const message = "test";
    const acceptMessage = "Accept";
    const onAccept= jest.fn();
    const onClose = jest.fn();
    const duration = 1000;

    jest.useFakeTimers();

    render(<div id="promptContainer"></div>);
    render(
      <>
        <div id="promptContainer"></div>
        <Prompt message={message} onClose={onClose} acceptMessage={acceptMessage} onAccept={onAccept} duration={duration}/>
      </>
    );

    expect(onClose).not.toHaveBeenCalled();
    await waitFor(() => jest.runAllTimers());
    await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1));
  });
});
