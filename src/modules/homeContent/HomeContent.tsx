import styles from './HomeContent.module.scss';
import { Button } from '@/common/components/Button/Button';

export const HomeContent = () => {
  return (
    <div className={styles.homeWrapper}>
      <h1 className={styles.title} data-glitch={'Contact-map'}>
        Contact-map
      </h1>
      <Button variant={'glass'} className={styles.button}>
        Sign in
      </Button>
    </div>
  );
};
