import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import useTimeout from '../hooks/useTimeout'
import { HiCheckCircle, HiInformationCircle, HiExclamation, HiXCircle } from 'react-icons/hi'
import { motion } from 'framer-motion'

const DEFAULT_TYPE = 'warning'

const TYPE_MAP = {
	success: {
		backgroundColor: 'bg-emerald-50 ',
		titleColor: 'text-emerald-700 ',
		textColor: 'text-emerald-500 ',
		iconColor: 'text-emerald-400 ',
		icon: <HiCheckCircle />
	},
	info: {
		backgroundColor: 'bg-blue-50 ',
		titleColor: 'text-blue-700 ',
		textColor: 'text-blue-500 ',
		iconColor: 'text-blue-400 ',
		icon: <HiInformationCircle />
	},
	warning: {
		backgroundColor: 'bg-yellow-50 ',
		titleColor: 'text-yellow-700 ',
		textColor: 'text-yellow-500 ',
		iconColor: 'text-yellow-400 ',
		icon: <HiExclamation />
	},
	danger: {
		backgroundColor: 'bg-red-50 ',
		titleColor: 'text-red-700 ',
		textColor: 'text-red-500 ',
		iconColor: 'text-red-400 ',
		icon: <HiXCircle />
	}
}

const TYPE_ARRAY = ['success', 'danger', 'info', 'warning']

const Alert = React.forwardRef((props, ref) => {

	const { 
		className,
		children,
		title,
		showIcon,
		customIcon,
		closable,
		customClose,
		onClose,
		duration,
		rounded,
		triggerByToast,
		...rest
	} = props

	const getType = () => {
		const { type } = props
		if (TYPE_ARRAY.includes(type)) {
			return type
		}
		return DEFAULT_TYPE
	}

	const type = getType()
	const typeMap = TYPE_MAP[type]

	const [display, setDisplay] = useState('show')

	const { clear } = useTimeout(onClose, duration, duration > 0)

	const handleClose = e => {
		setDisplay( 'hiding' )
		onClose?.(e)
		clear()
		if (!triggerByToast) {
			setTimeout(() => {
				setDisplay('hide')
			}, 400)
		}
	}

	const renderClose = () => {
		return (
			<div className="cursor-pointer" onClick={e => handleClose(e)}>
				{customClose || "X"}
			</div>
		)
	}

	const alertDefaultClass = 'p-4 relative flex'
	
	const alertClass = classNames(
		'alert',
		alertDefaultClass,
		typeMap.backgroundColor,
		typeMap.textColor,
		!title ? 'font-semibold' : '',
		closable ? 'justify-between': '',
		closable && !title ? 'items-center': '',
		'rounded-lg',
		className
	)

	if (display === 'hide') {
		return null
	}
	
	return (
		<motion.div 
			ref={ref} 
			className={alertClass}
			initial={{opacity : 1}}
			animate={display === 'hiding' ? 'exit' : 'animate'}
			transition={{ duration: 0.25, type: 'tween' }}
			variants= {{
				animate: {
					opacity: 1
				},
				exit: {
					opacity: 0,
				}
			}}
			{...rest}
		>
			<div className={`flex ${title ? '' : 'items-center'}`}>
				{/* {showIcon && (<StatusIcon iconColor={typeMap.iconColor} custom={customIcon} type={type} />)} */}
				<div className={showIcon ? 'ltr:ml-2 rtl:mr-2' : null}>
					{title ? <div className={`font-semibold mb-1 ${typeMap.titleColor}`}>{title}</div> : null}
					{children}
				</div>
			</div>
			{closable ? renderClose() : null }
		</motion.div>
	)
})

Alert.defaultProps = {
	type: DEFAULT_TYPE,
	showIcon: false,
	triggerByToast: false,
	closable: false,
	duration: 3000,
	title: null,
	rounded: true
}

Alert.propTypes = {
	type: PropTypes.oneOf(['info', 'success', 'warning', 'danger']),
	showIcon: PropTypes.bool,
	triggerByToast: PropTypes.bool,
	closable: PropTypes.bool,
	duration: PropTypes.number,
	customIcon: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node
	]),
	rounded: PropTypes.bool,
	title: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node
	]),
	onClose: PropTypes.func
}

export default Alert
