import styles from '../styles/ProductTracker.module.css';

export default function ProductTracker() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Hi there!</h1>
        
        <p className="text-2xl">Your Origino® finally has reached its final destination.</p>
        <p className="text-2xl">And it's been an adventurous journey...</p>
      </div>

      <div className={styles.section}>
        <h2>Picked</h2>
        <div className={styles.label}>HARVEST DATE</div>
        <div className={styles.value}>November 8th, 2023</div>
        
        <div className={styles.label}>GROVE LOCATION</div>
        <div className={styles.value}>Northwest of Iznik Lake, Bursa, Turkiye</div>
        
        <div className={styles.label}>HEAD CULTIVATOR</div>
        <div className={styles.value}>Turker Yalcinkaya (42)</div>
        
        <a href="#" className={styles.button}>See the picking stories →</a>
      </div>

      <div className={styles.section}>
        <h2>Pressed</h2>
      </div>

      <div className={styles.section}>
        <h2>Packed</h2>
      </div>
    </div>
  );
} 