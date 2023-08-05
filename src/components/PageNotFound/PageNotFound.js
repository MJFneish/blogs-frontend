import React from 'react'
import styles from './PageNotFound.module.css'
import { Link } from 'react-router-dom'

function PageNotFound(props) {
  const user = props.user;

  return (
    <div className={styles.container}>
        <div className={styles.notFound}>
          <div className={styles.title}>
            <h1>4<span>0</span>4</h1>
          </div>
          <h2>the page you requested could not found</h2>
          <div className={styles.link}><Link to="/">Home</Link></div>
        </div>
    </div>
  )
}

export default PageNotFound