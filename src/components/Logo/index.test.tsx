import Logo from ".";
import { render } from "@testing-library/react";

describe('Logo', () => {
    test('Should render without crush', async () => {
        render(<Logo size={50} />)
    })
})