const { render, screen, cleanup, waitFor } = require("@testing-library/react");
const { default: userEvent } = require("@testing-library/user-event");
const { default: DialogBox } = require("..");

describe("DialogBox", () => {
  afterEach(cleanup);

  it("should render DialogBox component with prompt props passed", () => {
    const testPrompt = "test prompt";
    render(
      <DialogBox
        prompt={testPrompt}
        onPositive={() => {}}
        onNegative={() => {}}
      />
    );
    expect(screen.getByText(testPrompt)).toBeInTheDocument();
  });

  it("should call onPositive when yes button is clicked", async () => {
    const onPositive = jest.fn();
    render(
      <DialogBox prompt="" onPositive={onPositive} onNegative={() => {}} />
    );

    expect(onPositive).not.toHaveBeenCalled();

    userEvent.click(screen.getByText(/Yes/));

    await waitFor(() => expect(onPositive).toHaveBeenCalledTimes(1));
  });

  it("should call onNegative when no button is clicked", async () => {
    const onNegative = jest.fn();
    render(
      <DialogBox prompt="" onPositive={() => {}} onNegative={onNegative} />
    );

    expect(onNegative).not.toHaveBeenCalled();

    userEvent.click(screen.getByText(/No/));

    await waitFor(() => expect(onNegative).toHaveBeenCalledTimes(1));
  });
});
