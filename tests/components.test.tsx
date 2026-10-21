import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor, cleanup } from "@testing-library/react";
import { ProjectCard } from "@/components/ProjectCard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ContactForm } from "@/components/ContactForm";
import { projects } from "@/content/projects";

afterEach(() => { cleanup(); vi.unstubAllGlobals(); document.documentElement.removeAttribute("data-theme"); localStorage.clear(); });
describe("interactive components", () => {
  it("links a project to its case study and source without a fake live action", () => {
    const project = projects.find(item => item.slug === "internagent");
    expect(project).toBeDefined();
    render(<ProjectCard project={project!} />);
    expect(screen.getByRole("link", { name: "Read InternAgent case study" }).getAttribute("href")).toBe("/projects/internagent");
    expect(screen.getByRole("link", { name: "InternAgent source code" })).toBeTruthy();
    expect(screen.queryByRole("link", { name: "InternAgent live demo" })).toBeNull();
  });
  it("persists the selected theme", () => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button", { name: "Switch to light theme" }));
    expect(document.documentElement.dataset.theme).toBe("light");
    expect(localStorage.getItem("theme")).toBe("light");
  });
  it("shows provider failure and only confirms a successful response", async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce({ ok: false, json: async () => ({ error: "Delivery failed" }) }).mockResolvedValueOnce({ ok: true, json: async () => ({ ok: true }) });
    vi.stubGlobal("fetch", fetchMock);
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText("Your name"), { target: { value: "A Person" } });
    fireEvent.change(screen.getByLabelText("Email address"), { target: { value: "person@example.com" } });
    fireEvent.change(screen.getByLabelText("Subject"), { target: { value: "Hello" } });
    fireEvent.change(screen.getByLabelText("Message"), { target: { value: "A sufficiently long message." } });
    fireEvent.click(screen.getByRole("button", { name: "Send message ↗" }));
    await waitFor(() => expect(screen.getByRole("alert").textContent).toContain("Delivery failed"));
    expect(screen.queryByRole("heading", { name: "Message sent." })).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Send message ↗" }));
    await waitFor(() => expect(screen.getByRole("heading", { name: "Message sent." })).toBeTruthy());
  });
});
