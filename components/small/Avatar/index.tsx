import Image from 'next/image';
import { FC } from 'react';
import styles from './Avatar.module.scss';

interface AvatarProps {
  src: string;
  priority?: boolean;
  size: 'small' | 'medium' | 'big';
}

const Avatar: FC<AvatarProps> = ({ src, priority, size }) => {
  let sizeClass = styles[`avatar_${size}`];

  return (
    <div className={styles.avatar + ' ' + sizeClass}>
      <Image
        src={src}
        layout="fill"
        objectFit="cover"
        priority={priority ? priority : false}
      />
    </div>
  );
};

export default Avatar;
