import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import styles from './sidebar.css'

const Sidebar = (props) => {
	return (
		<div id="sidebar_container" style={{display: !props.show ? 'block' : 'none'}}>
			<div id="sidebar" className={styles.className}>
				<nav>
					<ul>
						<li onClick={props.back}>
							<i className="material-icons">arrow_back</i>
						</li>
						<li>
							<Link to="/search" activeClassName={styles.activeClass}>
								<i className="material-icons">search</i>
							</Link>
						</li>
						<li>
							<Link to="/following" activeClassName={styles.activeClass}>
								<i className="material-icons">favorite</i>
							</Link>
						</li>
						<li>
							<Link to="/" activeClassName={styles.activeClass} onlyActiveOnIndex={true}>
								<i className="material-icons">videocam</i>
							</Link>
						</li>
						<li>
							<Link to="/games" activeClassName={styles.activeClass}>
								<i className="material-icons">videogame_asset</i>
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	)
}

Sidebar.propTypes = {
	show: PropTypes.bool,
	back: PropTypes.func
}

export default Sidebar
