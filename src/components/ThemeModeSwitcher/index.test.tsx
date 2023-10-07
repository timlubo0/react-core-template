import ThemeModeSwitcher from ".";
import { render, screen, fireEvent } from "@testing-library/react";
import AppContext from "../../AppContext";

class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}

describe('Theme mode toggle', () => {
    window.ResizeObserver = ResizeObserver;
    test('Should render ThemeModeSwitcher component without crush', async () => {
        render(
          <AppContext>
            <ThemeModeSwitcher />
          </AppContext>
        );
        const themeSwitcherButton = screen.getByRole("button");
        expect(themeSwitcherButton.textContent).toBe('LightDark');
        fireEvent.click(themeSwitcherButton);
        expect(themeSwitcherButton.textContent).toBe('LightDark');
    });
})