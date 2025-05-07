import style from './Divider.module.scss'

export default function Divider() {
  return (
    <div className='container'>
      <hr className={style.divider} />
    </div>
  )
}
