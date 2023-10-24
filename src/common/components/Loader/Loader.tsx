import classNames from 'classnames';

import styles from './Loader.module.scss';

export const Loader = ({ className }: { className?: string }) => (
  <div className={classNames(styles.container, className)}>
    <div className={styles.dotPulse} />
  </div>
);
