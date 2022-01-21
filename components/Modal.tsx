import { useState } from "react";
import { Modal } from "react-responsive-modal";
import { v4 as uuidv4 } from 'uuid';

export function ModalComponent({
  onFinish, 
  closeModal,
  isOpen,
}) {
  const [state, setState] = useState({title: '', body: ''})

  const inputChange = (e) => {
    e.persist()
    setState(prev => ({...prev, title: e.target.value}))
  }

  const contentChange = (e) => {
    e.persist()
    setState(prev => ({...prev, body: e.target.value}))
  }

  const finish = () => {
    const id = uuidv4()
    onFinish({...state, id})
  }

  return (
    <>
      <Modal open={isOpen} onClose={closeModal} styles={{modal:{width: '70%'}}}>
          <h2>Add new post</h2>
          <div>
            <span>Title: </span> <input data-cy='modal-title' value={state.title} onChange={inputChange} />
          </div>
          <div>
            <span>Content: </span> <textarea data-cy='modal-body' value={state.body} onChange={contentChange}/>
          </div> 
          <button data-cy='modal-add' onClick={finish}>Add post</button>
        </Modal>
      <style jsx>{`
        div {
          display: flex;
          width: 100%;
          margin-bottom: 30px;
        }

        input {
          width: 300px;
        }

        textarea {
          width: 100%;
          height: 100px;
        }
        
        span {
          width: 100px;
          display: flex;
          justify-content: flex-end;
          flex-shrink: 0;
          margin-right: 10px;
        }
        button {
          padding: 5px 10px;
          background: #0000ff;
          color: #fff;
          font-size: 20px;
          outline:none;
          border: none;
        }
        button:hover {
          cursor: pointer;
          background: #5858ff;
        }
      `}</style>
    </>
  )
}