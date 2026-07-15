import { Link } from 'react-router-dom';
import { classNames } from '../utils/helpers';

/**
 * Shared button. Renders a <button> by default, or an <a> when `href`
 * is supplied (useful for CTA links styled the same as buttons).
 */
function Button({
  children,
  variant = 'primary', // primary | maroon | outline | ghost
  size = 'md', // md | sm
  block = false,
  href,
  type = 'button',
  disabled = false,
  onClick,
  className = '',
  ...rest
}) {
  const classes = classNames(
    'btn',
    `btn-${variant}`,
    size === 'sm' && 'btn-sm',
    block && 'btn-block',
    className
  );

  if (href) {
    const isExternal = /^https?:\/\//.test(href);
    if (isExternal) {
      return (
        <a href={href} className={classes} target="_blank" rel="noreferrer" {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link to={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}

export default Button;
