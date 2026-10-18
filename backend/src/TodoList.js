class TodoList
{
    constructor()
    {
        this.tasks = [];
        this.nextId = 1;
    }

    getAll()
    {
        return this.tasks;
    }

    add(text)
    {
        const newTask = {
            id:   this.nextId++,
            text: text
        };

        this.tasks.push(newTask);

        return newTask;
    }

    delete(id)
    {
        const initialLength = this.tasks.length;
        this.tasks = this.tasks.filter(task => task.id !== id);

        return this.tasks.length < initialLength;
    }

    update(id, text)
    {
        const taskIndex = this.tasks.findIndex(t => t.id === id);

        if (taskIndex === -1) {
            return null;
        }

        this.tasks[taskIndex].text = text;

        return this.tasks[taskIndex];
    }
}

module.exports = TodoList;
