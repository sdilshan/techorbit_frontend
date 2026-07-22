import PropTypes from "prop-types";

const Tag = ({ text, onRemove, onEdit }) => {
  const handleBlur = (e) => {
    const value = e.target.textContent.replace(/\s+/g, " ").trim();

    // Empty → restore original
    if (!value) {
      e.target.textContent = text;
      return;
    }

    const validatedValue = onEdit(value);

    // Parent rejected the edit
    if (validatedValue === null) {
      e.target.textContent = text;
      return;
    }

    // Parent accepted (and may have normalized it)
    e.target.textContent = validatedValue;
  };
  return (
    <span className="inline-flex items-center gap-3 bg-white px-5 py-1 rounded-full text-sm">
      <span
        contentEditable
        suppressContentEditableWarning
        className="outline-none"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            e.target.blur();
          }
        }}
        onBlur={handleBlur}
      >
        {text}
      </span>

      <button type="button" onClick={onRemove} className="transition">
        <i className="fi fi-br-cross tag-cross"></i>
      </button>
    </span>
  );
};

Tag.propTypes = {
  text: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default Tag;
