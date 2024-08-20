import React from "react";
import { Skeleton } from "antd";
import styles from "./skeleton-invoid-detail.module.scss";

const StepperContentSkeleton = () => {
  return (
    <div className={styles.stepperContentSkeleton}>
      {[...Array(3)].map((_, index) => (
        <div key={index} className={styles.stepItem}>
          <div className={styles.stepIndicator}>
            <Skeleton.Avatar active size="small" shape="circle" />
          </div>
          <div className={styles.stepContent}>
            <Skeleton active paragraph={{ rows: 2 }} />
            <div />
            <div className={styles.actionArea}>
              <Skeleton.Input active className={styles.verticalLine} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StepperContentSkeleton;
