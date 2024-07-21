import { render, screen } from '@testing-library/react'
import Login from '.'

describe('Login', () => {
    it('renders', () => {
        render(<Login />)
        expect(screen.getByText('Login here')).toBeInTheDocument()
    })
})