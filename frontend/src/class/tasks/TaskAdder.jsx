export default function TaskAdder({ inputValue, setInputValue, onAddTask })
{
    return (
        <div className="task-adder-wrapper">
            <input type="text"
                   placeholder='Введите задачу...'
                   value={inputValue}
                   onChange={(e) => setInputValue(e.target.value)}
            />

            <button onClick={onAddTask}
                    className='button add-button'
            >
                Добавить
            </button>
        </div>
    );
}
