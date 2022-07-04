import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.lds_dual_ring_loader_wrapper}>
      <div className={styles.lds_dual_ring_loader}></div>
    </div>
  );
};

export default Loader;
