import { PropsWithChildren, ReactElement, useState } from 'react';

import styles from './accordion.module.css';

interface Props {
  title: string;
}

function Accordion({ title, children }: PropsWithChildren<Props>): ReactElement {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={styles.container}>
      <button className={styles.title} onClick={() => setExpanded(!expanded)}>
        {title}
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
