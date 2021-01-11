import InputComponent from '../components/Input'
import ButtonComponent from '../components/Button'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

export const ToDoList = (props) => {
  const { history } = props
  const [list, setList] = useState([])
  const [input, setInput] = useState('')

  const addOnClick = () => {
    const newItem = {
      text: input,
      complete: false,
      id: uuidv4(),
    }
    setInput('')

    setList((oldList) => {
      const newList = [...oldList, newItem]
      localStorage.setItem('tasks', JSON.stringify(newList))
      return newList
    })
  }

  const getDoneTheTask = (id) => {
    let initTask = JSON.parse(localStorage.getItem('tasks')) || []
    const index = initTask.findIndex((n) => n.id === id)
    initTask[index].complete = true
    setList(initTask)
    localStorage.setItem('tasks', JSON.stringify(initTask))
  }

  const comeback = () => {
    return history.push('/')
  }

  const deleteOnClick = (id) => {
    let initTask = JSON.parse(localStorage.getItem('tasks')) || []
    const index = initTask.findIndex((n) => n.id === id)
    initTask.splice(index, 1)
    setList(initTask)
    localStorage.setItem('tasks', JSON.stringify(initTask))
  }

  useEffect(() => {
    const initTask = JSON.parse(localStorage.getItem('tasks'))
    setList(initTask || [])
  }, [])

  return (
    <div className="actions">
      <h1>TO-DO LIST</h1>
      <div className="search">
        <InputComponent
          value={input}
          setValue={setInput}
          placeholder={'Add the task to the to-do list'}
          list={null}
        />
        <ButtonComponent
          onClick={addOnClick}
          name={'add '}
          color={'black'}
          size={'massive'}
        />
      </div>
      <div className="task-block">
        <ul className="list">
          {list.map((item) => {
            return (
              <li key={item.id}>
                <span className="task-list">
                  <span className={item.complete ? 'done-bg' : ''}>
                    {item.text}
                  </span>
                  <span className="task-buttons">
                    <ButtonComponent
                      onClick={() => getDoneTheTask(item.id)}
                      name={'checkmark '}
                      color={'green'}
                      size={'small'}
                    />
                    <ButtonComponent
                      onClick={() => deleteOnClick(item.id)}
                      name={'trash alternate outline '}
                      color={'red'}
                      size={'small'}
                    />
                  </span>
                </span>
              </li>
            )
          })}
        </ul>
      </div>
      <ButtonComponent
        onClick={comeback}
        alt={'BACK'}
        name={'undo'}
        color={'blue'}
      />
    </div>
  )
}
