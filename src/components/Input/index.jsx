import './style.css';
export const TextInput = ({ search, handleChange }) => {
    return (
        <input
            className='text-input'
            type='search'
            onChange={handleChange}
            value={search}
        />
    );
}