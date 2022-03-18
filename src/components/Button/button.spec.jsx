import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from './index'
describe('<Button />', () => {

    it('should render the button with the text', () => {
        render(<Button title="load more" />);
        const button = screen.getByRole('button', {name: /load more/i});
        expect(button).toBeInTheDocument();
    });
    
    it('should call function on button click', () => {
        const fn = jest.fn();
        render(<Button title="load more" onClick={fn} />);
        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should be disabled is true', () => {
        render(<Button title="load more" disabled={true} />);
        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
    });


});