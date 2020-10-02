import React from 'react'


const Preloader = (props) => {
	return (
		<div className='preloader'>
			<div className="preloader-bg"></div>
			<div className="preloader-content">
				<div><span className="logo-main logo-preloader"></span><div className="preloader-animation"></div></div>
			</div>
		</div>
	)
}

export default Preloader;

