import { PropsWithChildren, ReactElement, useState } from 'react';

import styles from './accordion.module.css';

interface Props {
  title: string;
}

function Accordion({ title, children }: PropsWithChildren<Props>): ReactElement {
  const [expanded, setExpanded] = useState(false);

  const buttonClass = expanded ? [styles.title, styles.titleOpen].join(' ') : styles.title;
  return (
    <div className={styles.container}>
      <button className={buttonClass} onClick={() => setExpanded(!expanded)}>
        <h2>{title}</h2>
      </button>
      {expanded && (
        <div className={styles.content}>
          {children}
        </div>
      )}
    </div>
  );
}

export default Accordion;
