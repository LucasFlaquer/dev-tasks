import { randomUUID } from 'node:crypto'
import { buildRoutePath } from "./utils/buildRoutePath.js";
import { Database } from './database.js';

const db = new Database()

export const routes = [
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body
      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date()
      }
      db.insert('tasks', task)
      return res.writeHead(201).end()
    }
  },
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query
      const tasks = db.select('tasks', search ? {
        title: search,
        description: search
      }: null)
      
      return res.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const { title, description } = req.body
      if (!title && !description) {
        return res.end(JSON.stringify({message: `required fields for update`}))
      }
      const [task] = db.select('tasks', { id })
      if(!task) return res.writeHead(404).end(JSON.stringify({message: 'not found'}))
      db.update('tasks', id, {
        updated_at: new Date(),
        title: title ?? task.title,
        description: description ?? task.description

      })
      res.end(JSON.stringify({message: 'ok'}))
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      db.delete('tasks', id)
      return res.writeHead(204).end()
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params
      const [task] = db.select('tasks', { id })
      if (!task) return res.writeHead(404).end(JSON.stringify({ message: 'not found' }))
      db.update('tasks', id, {
        updated_at: new Date(),
        completed_at: task.completed_at ? null : new Date()
      })
    }
  }
]