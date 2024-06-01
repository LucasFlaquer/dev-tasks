# TODO List

[Descrição do desafio](https://efficient-sloth-d85.notion.site/Desafio-01-2d48608f47644519a408b438b52d913f)

## CRUD de tarefas
- [ ] Criação de uma task
- [ ] Listagem de todas as tasks
- [ ] Atualização de uma task pelo `id`
- [ ] Remover uma task pelo `id`
- [ ] Marcar pelo `id` uma task como completa
- [ ] E o verdadeiro desafio: Importação de tasks em massa por um arquivo CSV

## Task
```ts
 interface Task {
  id: string
  title: string
  description: string
  completed_at: Date
  completed_at: Date
 }
```

### Propriedades de uma Task
- `id` - Identificador único de cada task
- `title` - Título da task
- `description` - Descrição detalhada da task
- `completed_at` - Data de quando a task foi concluída. O valor inicial deve ser `null`
- `created_at` - Data de quando a task foi criada.
- `updated_at` - Deve ser sempre alterado para a data de quando a task foi atualizada.

