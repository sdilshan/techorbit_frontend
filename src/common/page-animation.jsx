import PropTypes from "prop-types";
import { AnimatePresence, motion } from "framer-motion";

const AnimationWrapper = ({
  children,
  keyValue,
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  transition = { duration: 0.5},
  className,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        key={keyValue}
        initial={initial}
        animate={animate}
        transition={transition}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

AnimationWrapper.propTypes = {
  children: PropTypes.node,
  keyValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  initial: PropTypes.object,
  animate: PropTypes.object,
  transition: PropTypes.object,
  className: PropTypes.string,
};

export default AnimationWrapper;