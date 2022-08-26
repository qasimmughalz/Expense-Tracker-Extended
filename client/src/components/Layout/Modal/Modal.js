import classes from './Modal.module.css'
import  ReactDOM  from 'react-dom';

 export const TheModal = (props) => {
  return <div className={classes.backdrop} >

  <div className={`${classes.modal} ${classes.card}`}>
      <header className={classes.header}>
          <h2> {props.title} </h2>
      </header>
      <div className={classes.content}>
              <div className='rounded p-3 text-dark'>
                  <pre className="">
                      <code className="text-dark">{props.message} </code>
                  </pre>
              </div>
      </div>

      <footer className={`${classes.actions} `}>
          <button className='btn btn-primary' onClick={props.onConfirm}>Delete</button>
          <button className='btn btn-primary mx-3' onClick={props.cancel}>Cancel</button>
      </footer>
  </div>
</div>;
};


export const Modal = (props)=>{
  return <>
      {ReactDOM.createPortal(<TheModal title={props.title} message={props.message} onConfirm={props.confirm}
      cancel={props.cancel}></TheModal> , document.getElementById('modal'))}
    </>
}