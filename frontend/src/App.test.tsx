import { act, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { App } from "./App";
import { MAX_ZIP_BYTES, validateSubmission } from "./lib/submission";

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}
afterEach(() => vi.useRealTimers());

describe("submission boundaries", () => {
  it.each([
    [null, "Choose a ZIP file to continue."],
    [{ name: "project.txt", size: 10 }, "Choose a file with a .zip extension."],
    [
      { name: "project.zip", size: 0 },
      "The ZIP file is empty. Choose a nonempty project archive.",
    ],
    [
      { name: "project.zip", size: MAX_ZIP_BYTES + 1 },
      "The ZIP file must be no larger than 50 MB.",
    ],
    [{ name: "project.ZIP", size: MAX_ZIP_BYTES }, null],
  ])("validates %j", (file, error) => {
    expect(validateSubmission(file)).toBe(error);
  });

  it("announces a missing file without starting the simulation", () => {
    renderAt("/submit/1");
    fireEvent.click(
      screen.getByRole("button", { name: "Simulate submission" }),
    );
    expect(screen.getByRole("status")).toHaveTextContent(
      "Choose a ZIP file to continue.",
    );
    expect(screen.getByLabelText("Choose your project ZIP")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("transitions queued → running → sample results and prevents duplicate submission", () => {
    vi.useFakeTimers();
    renderAt("/submit/1");
    fireEvent.change(screen.getByLabelText("Choose your project ZIP"), {
      target: { files: [new File(["demo"], "project.zip")] },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "Simulate submission" }),
    );
    expect(screen.getByRole("status")).toHaveTextContent("Queued");
    expect(
      screen.getByRole("button", { name: "Simulate submission" }),
    ).toBeDisabled();
    act(() => vi.advanceTimersByTime(800));
    expect(screen.getByRole("status")).toHaveTextContent("Running");
    act(() => vi.advanceTimersByTime(1100));
    expect(
      screen.getByRole("heading", { name: "Simulation report" }),
    ).toBeVisible();
    expect(
      screen.getByText(
        "Simulation complete · Showing the Java Fundamentals sample report",
      ),
    ).toBeVisible();
  });

  it("cancels pending simulation timers when the student leaves", () => {
    vi.useFakeTimers();
    renderAt("/submit/1");
    fireEvent.change(screen.getByLabelText("Choose your project ZIP"), {
      target: { files: [new File(["demo"], "project.zip")] },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "Simulate submission" }),
    );
    fireEvent.click(screen.getByRole("link", { name: "‹ All assignments" }));
    act(() => vi.advanceTimersByTime(3000));
    expect(
      screen.getByRole("heading", { name: "Assignments", level: 1 }),
    ).toBeVisible();
    expect(
      screen.queryByRole("heading", { name: "Simulation report" }),
    ).not.toBeInTheDocument();
  });
});

it("filters assignment rows without losing the review panel", async () => {
  renderAt("/assignments");
  await userEvent.click(
    screen.getByRole("button", { name: "Completed", exact: true }),
  );
  const list = screen.getByRole("region", { name: "Assignments" });
  expect(
    within(list).getByRole("heading", { name: "Java Fundamentals" }),
  ).toBeVisible();
  expect(
    within(list).queryByRole("heading", { name: "Selenium Login Test" }),
  ).not.toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: "Open full report" }),
  ).toBeInTheDocument();
});

it("supports arrow-key tabs and reveals sample guidance", async () => {
  renderAt("/results");
  screen.getByRole("tab", { name: "Tests", exact: true }).focus();
  await userEvent.keyboard("{ArrowRight}");
  expect(screen.getByRole("tab", { name: "Security (1)" })).toHaveFocus();
  expect(screen.getByRole("tabpanel", { name: "Security (1)" })).toBeVisible();
  await userEvent.keyboard("{End}");
  expect(screen.getByRole("tab", { name: "Hints" })).toHaveFocus();
  await userEvent.click(
    screen.getByRole("button", { name: "Show sample hint" }),
  );
  expect(
    screen.getByText("Written sample guidance. No AI service is connected."),
  ).toBeVisible();
});

it("handles unknown assignments and unknown routes", () => {
  const page = renderAt("/submit/999");
  expect(
    screen.getByRole("heading", { name: "Assignment not found" }),
  ).toBeVisible();
  page.unmount();
  renderAt("/missing");
  expect(screen.getByRole("heading", { name: "Page not found" })).toBeVisible();
});
