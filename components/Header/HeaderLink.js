
import { useRouter } from 'next/router'
import styles from './HeaderLink.module.css'

function HeaderLink({ children, href }) {
  const router = useRouter()
  const style = {
    border: router.asPath === href ? '1px solid black' : 'none',
  }

  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <a className={styles.HeaderLink} href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  )
}

export default HeaderLink