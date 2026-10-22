export default function TaskFilters({ filter, setFilter })
{
    return (
        <div className="task-filters">
            <button
                className={`button filter-button ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
            >
                Все
            </button>
            <button
                className={`button filter-button ${filter === 'active' ? 'active' : ''}`}
                onClick={() => setFilter('active')}
            >
                Активные
            </button>
            <button
                className={`button filter-button ${filter === 'completed' ? 'active' : ''}`}
                onClick={() => setFilter('completed')}
            >
                Завершённые
            </button>
        </div>
    );
}
