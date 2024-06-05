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
      const tasks = db.select('tasks')
      return res.end(JSON.stringify(tasks))
    }
  }
]